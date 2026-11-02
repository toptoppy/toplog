package com.app.service

import com.app.api.dto.VerifyDomainResponse
import com.app.config.AppConfig
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.inList
import org.jetbrains.exposed.sql.and
import org.jetbrains.exposed.sql.selectAll
import org.jetbrains.exposed.sql.update
import org.slf4j.LoggerFactory
import java.net.InetAddress
import java.net.UnknownHostException
import java.time.Instant

class DomainService(
    private val blogService: BlogService,
    private val config: AppConfig
) {
    private val logger = LoggerFactory.getLogger(DomainService::class.java)

    suspend fun verifyDomain(blogId: Long, actorUserId: Long): VerifyDomainResponse {
        val role = blogService.getUserRoleInBlog(blogId, actorUserId)
        if (role != BlogRole.ADMIN) {
            throw IllegalAccessException("Only blog administrators can verify domains")
        }
        return verifyDomainInternal(blogId)
    }

    suspend fun verifyDomainInternal(blogId: Long): VerifyDomainResponse {
        val blog = blogService.getBlogById(blogId) ?: throw NoSuchElementException("Blog not found")

        val domain = blog.customDomain?.trim()?.lowercase()
        if (domain.isNullOrBlank()) {
            throw IllegalArgumentException("No custom domain is set for this blog")
        }

        val expectedTarget = config.baseDomain

        try {
            val addresses = InetAddress.getAllByName(domain)
            val detectedIps = addresses.map { it.hostAddress }

            val isLocalDev = config.baseDomain.equals("localhost", ignoreCase = true) || domain.endsWith(".localhost")
            val isVerified = if (isLocalDev) {
                // In local development: loopback addresses or .localhost suffix count as valid target
                detectedIps.any { it == "127.0.0.1" || it == "::1" || it == "0:0:0:0:0:0:0:1" } || domain.endsWith(".localhost")
            } else {
                val expectedAddresses = runCatching {
                    InetAddress.getAllByName(expectedTarget).map { it.hostAddress }
                }.getOrDefault(emptyList())

                detectedIps.any { it in expectedAddresses }
            }

            val now = Instant.now()
            if (isVerified) {
                dbQuery {
                    Blogs.update({ Blogs.id eq blogId }) {
                        it[domainDnsStatus] = DnsStatus.VERIFIED.name
                        it[domainVerifiedAt] = now
                    }
                }
                logger.info("Successfully verified custom domain '$domain' for blog '${blog.title}' -> IPs: $detectedIps")

                return VerifyDomainResponse(
                    domain = domain,
                    dnsStatus = DnsStatus.VERIFIED,
                    verified = true,
                    detectedIps = detectedIps,
                    expectedCnameOrIp = expectedTarget,
                    sslReady = true,
                    sslStatus = "ACTIVE",
                    message = "DNS records successfully verified! Pointed to $expectedTarget. Auto-SSL certificate is ready."
                )
            } else {
                dbQuery {
                    Blogs.update({ Blogs.id eq blogId }) {
                        it[domainDnsStatus] = DnsStatus.MISCONFIGURED.name
                    }
                }
                logger.warn("Custom domain '$domain' resolved to $detectedIps, but does not match expected target '$expectedTarget'")

                return VerifyDomainResponse(
                    domain = domain,
                    dnsStatus = DnsStatus.MISCONFIGURED,
                    verified = false,
                    detectedIps = detectedIps,
                    expectedCnameOrIp = expectedTarget,
                    sslReady = false,
                    sslStatus = "PENDING_DNS",
                    message = "Domain resolved to [${detectedIps.joinToString()}], but does not match server target '$expectedTarget'. Please ensure your CNAME or A record points to '$expectedTarget'."
                )
            }
        } catch (e: UnknownHostException) {
            logger.warn("DNS resolution failed for custom domain '$domain': ${e.message}")

            dbQuery {
                Blogs.update({ Blogs.id eq blogId }) {
                    it[domainDnsStatus] = DnsStatus.MISCONFIGURED.name
                }
            }

            return VerifyDomainResponse(
                domain = domain,
                dnsStatus = DnsStatus.MISCONFIGURED,
                verified = false,
                detectedIps = emptyList(),
                expectedCnameOrIp = expectedTarget,
                sslReady = false,
                sslStatus = "PENDING_DNS",
                message = "DNS records not detected yet. CNAME or A record has not propagated. Please allow a few minutes."
            )
        } catch (e: Exception) {
            logger.error("Error verifying domain '$domain': ${e.message}", e)
            return VerifyDomainResponse(
                domain = domain,
                dnsStatus = DnsStatus.MISCONFIGURED,
                verified = false,
                detectedIps = emptyList(),
                expectedCnameOrIp = expectedTarget,
                sslReady = false,
                sslStatus = "FAILED",
                message = "Verification check failed: ${e.message}"
            )
        }
    }

    suspend fun autoVerifyPendingDomains(): Int {
        val pendingBlogs = dbQuery {
            Blogs.selectAll()
                .where {
                    (Blogs.customDomain.isNotNull()) and
                    (Blogs.domainDnsStatus inList listOf(DnsStatus.UNVERIFIED.name, DnsStatus.MISCONFIGURED.name))
                }
                .map { it[Blogs.id].value }
        }

        if (pendingBlogs.isEmpty()) return 0

        var verifiedCount = 0
        for (blogId in pendingBlogs) {
            try {
                val res = verifyDomainInternal(blogId)
                if (res.verified) {
                    verifiedCount++
                }
            } catch (e: Exception) {
                logger.debug("Background auto-DNS check failed for blog $blogId: ${e.message}")
            }
        }

        if (verifiedCount > 0) {
            logger.info("Auto-DNS background check successfully verified $verifiedCount domain(s)")
        }
        return verifiedCount
    }
}
