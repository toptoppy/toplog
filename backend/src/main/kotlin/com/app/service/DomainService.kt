package com.app.service

import com.app.api.dto.VerifyDomainResponse
import com.app.config.AppConfig
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
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
        val blog = blogService.getBlogById(blogId) ?: throw NoSuchElementException("Blog not found")
        val role = blogService.getUserRoleInBlog(blogId, actorUserId)
        if (role != BlogRole.ADMIN) {
            throw IllegalAccessException("Only blog administrators can verify domains")
        }

        val domain = blog.customDomain?.trim()?.lowercase()
        if (domain.isNullOrBlank()) {
            throw IllegalArgumentException("No custom domain is set for this blog")
        }

        val expectedTarget = config.baseDomain

        try {
            val addresses = InetAddress.getAllByName(domain)
            val ipList = addresses.map { it.hostAddress }

            val now = Instant.now()
            dbQuery {
                Blogs.update({ Blogs.id eq blogId }) {
                    it[domainDnsStatus] = DnsStatus.VERIFIED.name
                    it[domainVerifiedAt] = now
                }
            }

            logger.info("Successfully verified custom domain '$domain' -> IPs: $ipList")

            return VerifyDomainResponse(
                domain = domain,
                dnsStatus = DnsStatus.VERIFIED,
                verified = true,
                detectedIps = ipList,
                expectedCnameOrIp = expectedTarget,
                message = "DNS records successfully verified! Domain is active and ready for TLS certification."
            )
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
                message = "DNS records not detected yet. Please ensure your CNAME or A record points to '$expectedTarget'."
            )
        } catch (e: Exception) {
            logger.error("Error verifying domain '$domain': ${e.message}", e)
            return VerifyDomainResponse(
                domain = domain,
                dnsStatus = DnsStatus.MISCONFIGURED,
                verified = false,
                detectedIps = emptyList(),
                expectedCnameOrIp = expectedTarget,
                message = "Verification check failed: ${e.message}"
            )
        }
    }
}
