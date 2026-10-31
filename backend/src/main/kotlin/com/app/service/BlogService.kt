package com.app.service

import com.app.api.dto.BlogDto
import com.app.api.dto.CreateBlogRequest
import com.app.api.dto.UpdateBlogRequest
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import java.time.Instant

class BlogService {

    suspend fun listBlogsForUser(userId: Long): List<BlogDto> = dbQuery {
        val ownedBlogIds = Blogs.select(Blogs.id)
            .where { Blogs.ownerId eq userId }
            .map { it[Blogs.id].value }

        val memberBlogIds = BlogMembers.select(BlogMembers.blogId)
            .where { BlogMembers.userId eq userId }
            .map { it[BlogMembers.blogId].value }

        val allIds = (ownedBlogIds + memberBlogIds).distinct()
        if (allIds.isEmpty()) return@dbQuery emptyList()

        Blogs.selectAll()
            .where { Blogs.id inList allIds }
            .orderBy(Blogs.createdAt to SortOrder.DESC)
            .map { it.toBlog().toDto() }
    }

    suspend fun getUserRoleInBlog(blogId: Long, userId: Long): BlogRole? = dbQuery {
        val blog = Blogs.selectAll().where { Blogs.id eq blogId }.firstOrNull() ?: return@dbQuery null
        if (blog[Blogs.ownerId].value == userId) return@dbQuery BlogRole.ADMIN

        val member = BlogMembers.selectAll()
            .where { (BlogMembers.blogId eq blogId) and (BlogMembers.userId eq userId) }
            .firstOrNull() ?: return@dbQuery null

        runCatching { BlogRole.valueOf(member[BlogMembers.role]) }.getOrNull()
    }

    suspend fun getBlogById(blogId: Long): Blog? = dbQuery {
        Blogs.selectAll().where { Blogs.id eq blogId }.firstOrNull()?.toBlog()
    }

    suspend fun findByHost(host: String, baseDomain: String): Blog? = dbQuery {
        val cleanHost = host.substringBefore(':').lowercase().trim()

        // 1. Direct custom domain match
        val customMatch = Blogs.selectAll().where { Blogs.customDomain eq cleanHost }.firstOrNull()
        if (customMatch != null) return@dbQuery customMatch.toBlog()

        // 2. Subdomain match, e.g. "myblog.localhost"
        if (cleanHost.endsWith(baseDomain) && cleanHost != baseDomain) {
            val sub = cleanHost.removeSuffix(".$baseDomain").trim()
            val subMatch = Blogs.selectAll().where { Blogs.subdomain eq sub }.firstOrNull()
            if (subMatch != null) return@dbQuery subMatch.toBlog()
        }

        // 3. Fallback: single subdomain segment if host is "subdomain.localhost"
        if (cleanHost.contains('.')) {
            val sub = cleanHost.substringBefore('.')
            val subMatch = Blogs.selectAll().where { Blogs.subdomain eq sub }.firstOrNull()
            if (subMatch != null) return@dbQuery subMatch.toBlog()
        }

        null
    }

    suspend fun createBlog(userId: Long, request: CreateBlogRequest): BlogDto {
        val sub = request.subdomain.trim().lowercase()
        require(sub.matches(Regex("^[a-z0-9-]+$"))) { "Subdomain must contain only lowercase letters, numbers, and hyphens" }

        val existing = dbQuery {
            Blogs.selectAll().where { Blogs.subdomain eq sub }.firstOrNull()
        }
        if (existing != null) {
            throw IllegalArgumentException("Subdomain '$sub' is already taken")
        }

        val now = Instant.now()
        val blogId = dbQuery {
            val bId = Blogs.insert {
                it[Blogs.ownerId] = userId
                it[Blogs.subdomain] = sub
                it[Blogs.title] = request.title.trim()
                it[Blogs.description] = request.description?.trim()
                it[Blogs.defaultLanguage] = request.defaultLanguage.trim().lowercase()
                it[Blogs.themeName] = "default"
                it[Blogs.accentColor] = request.accentColor
                it[Blogs.fontFamily] = request.fontFamily
                it[Blogs.createdAt] = now
            } get Blogs.id

            BlogMembers.insert {
                it[BlogMembers.blogId] = bId
                it[BlogMembers.userId] = userId
                it[BlogMembers.role] = BlogRole.ADMIN.name
                it[BlogMembers.createdAt] = now
            }

            bId.value
        }

        return BlogDto(
            id = blogId,
            ownerId = userId,
            subdomain = sub,
            customDomain = null,
            title = request.title.trim(),
            description = request.description?.trim(),
            defaultLanguage = request.defaultLanguage.trim().lowercase(),
            themeName = "default",
            accentColor = request.accentColor,
            fontFamily = request.fontFamily,
            domainVerifiedAt = null,
            domainDnsStatus = "UNVERIFIED",
            createdAt = now.toString()
        )
    }

    suspend fun updateBlog(blogId: Long, userId: Long, request: UpdateBlogRequest): BlogDto {
        val blog = getBlogById(blogId) ?: throw NoSuchElementException("Blog not found")
        val role = getUserRoleInBlog(blogId, userId)
        if (role != BlogRole.ADMIN) {
            throw IllegalAccessException("Only blog administrators can update blog settings")
        }

        dbQuery {
            Blogs.update({ Blogs.id eq blogId }) {
                request.title?.let { t -> it[Blogs.title] = t.trim() }
                request.description?.let { d -> it[Blogs.description] = d.trim() }
                request.customDomain?.let { cd ->
                    val cleanCd = cd.trim().lowercase().ifEmpty { null }
                    if (cleanCd != blog.customDomain) {
                        it[Blogs.customDomain] = cleanCd
                        it[Blogs.domainDnsStatus] = "UNVERIFIED"
                        it[Blogs.domainVerifiedAt] = null
                    }
                }
                request.defaultLanguage?.let { l -> it[Blogs.defaultLanguage] = l.trim().lowercase() }
                request.themeName?.let { th -> it[Blogs.themeName] = th.trim() }
                request.codeHead?.let { ch -> it[Blogs.codeHead] = ch.ifBlank { null } }
                request.codeFoot?.let { cf -> it[Blogs.codeFoot] = cf.ifBlank { null } }
                request.accentColor?.let { ac -> it[Blogs.accentColor] = ac.trim() }
                request.fontFamily?.let { ff -> it[Blogs.fontFamily] = ff.trim() }
                request.logoUrl?.let { lu -> it[Blogs.logoUrl] = lu.trim().ifBlank { null } }
                request.faviconUrl?.let { fu -> it[Blogs.faviconUrl] = fu.trim().ifBlank { null } }
                request.darkModeEnabled?.let { dm -> it[Blogs.darkModeEnabled] = dm }
            }
        }

        return getBlogById(blogId)!!.toDto()
    }

    suspend fun checkDomainExists(domain: String): Boolean = dbQuery {
        val cleanDomain = domain.substringBefore(':').lowercase().trim()
        Blogs.selectAll()
            .where { (Blogs.customDomain eq cleanDomain) or (Blogs.subdomain eq cleanDomain) }
            .count() > 0
    }

    private fun ResultRow.toBlog(): Blog = Blog(
        id = this[Blogs.id].value,
        ownerId = this[Blogs.ownerId].value,
        subdomain = this[Blogs.subdomain],
        customDomain = this[Blogs.customDomain],
        title = this[Blogs.title],
        description = this[Blogs.description],
        defaultLanguage = this[Blogs.defaultLanguage],
        themeName = this[Blogs.themeName],
        codeHead = this[Blogs.codeHead],
        codeFoot = this[Blogs.codeFoot],
        accentColor = this[Blogs.accentColor],
        fontFamily = this[Blogs.fontFamily],
        logoUrl = this[Blogs.logoUrl],
        faviconUrl = this[Blogs.faviconUrl],
        domainVerifiedAt = this[Blogs.domainVerifiedAt],
        domainDnsStatus = this[Blogs.domainDnsStatus],
        darkModeEnabled = this[Blogs.darkModeEnabled],
        createdAt = this[Blogs.createdAt]
    )

    fun Blog.toDto(): BlogDto = BlogDto(
        id = this.id,
        ownerId = this.ownerId,
        subdomain = this.subdomain,
        customDomain = this.customDomain,
        title = this.title,
        description = this.description,
        defaultLanguage = this.defaultLanguage,
        themeName = this.themeName,
        codeHead = this.codeHead,
        codeFoot = this.codeFoot,
        accentColor = this.accentColor,
        fontFamily = this.fontFamily,
        logoUrl = this.logoUrl,
        faviconUrl = this.faviconUrl,
        domainVerifiedAt = this.domainVerifiedAt?.toString(),
        domainDnsStatus = this.domainDnsStatus,
        darkModeEnabled = this.darkModeEnabled,
        createdAt = this.createdAt.toString()
    )
}
