package com.app.service

import com.app.api.dto.*
import com.app.domain.model.*
import com.app.infrastructure.database.DatabaseFactory.dbQuery
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.SqlExpressionBuilder.eq
import org.jetbrains.exposed.sql.SqlExpressionBuilder.greaterEq
import org.slf4j.LoggerFactory
import java.net.URI
import java.time.Instant
import java.time.LocalDate
import java.time.ZoneOffset
import java.time.temporal.ChronoUnit

class AnalyticsService {
    private val logger = LoggerFactory.getLogger(AnalyticsService::class.java)

    suspend fun recordView(
        blogId: Long,
        postId: Long?,
        path: String,
        referrer: String?,
        userAgent: String?
    ): Boolean {
        val device = detectDeviceType(userAgent)
        if (device == "bot") {
            // Ignore bot traffic to prevent view count pollution
            return false
        }

        val cleanedRef = cleanReferrer(referrer)

        return try {
            dbQuery {
                PageViews.insert {
                    it[PageViews.blogId] = blogId
                    it[PageViews.postId] = postId
                    it[PageViews.path] = path.take(500)
                    it[PageViews.referrer] = cleanedRef.take(500)
                    it[PageViews.deviceType] = device
                    it[PageViews.userAgent] = userAgent?.take(500)
                    it[PageViews.createdAt] = Instant.now()
                }
            }
            true
        } catch (e: Exception) {
            logger.warn("Failed to record page view for blogId=$blogId: ${e.message}")
            false
        }
    }

    suspend fun getOverview(blogId: Long, days: Int = 30): AnalyticsOverviewDto = dbQuery {
        val now = Instant.now()
        val since = now.minus(days.toLong(), ChronoUnit.DAYS)
        val sevenDaysAgo = now.minus(7, ChronoUnit.DAYS)
        val startOfToday = LocalDate.now(ZoneOffset.UTC).atStartOfDay().toInstant(ZoneOffset.UTC)

        // 1. Total Views
        val totalViews = PageViews.selectAll()
            .where { PageViews.blogId eq blogId }
            .count()

        // 2. 7-Day Views
        val views7d = PageViews.selectAll()
            .where { (PageViews.blogId eq blogId) and (PageViews.createdAt greaterEq sevenDaysAgo) }
            .count()

        // 3. Today's Views
        val viewsToday = PageViews.selectAll()
            .where { (PageViews.blogId eq blogId) and (PageViews.createdAt greaterEq startOfToday) }
            .count()

        // 4. Timeseries (Daily points)
        val dateMap = mutableMapOf<String, Long>()
        for (i in (days - 1) downTo 0) {
            val d = LocalDate.now(ZoneOffset.UTC).minusDays(i.toLong()).toString()
            dateMap[d] = 0L
        }

        PageViews.select(PageViews.createdAt)
            .where { (PageViews.blogId eq blogId) and (PageViews.createdAt greaterEq since) }
            .forEach { row ->
                val dateStr = row[PageViews.createdAt].atZone(ZoneOffset.UTC).toLocalDate().toString()
                if (dateMap.containsKey(dateStr)) {
                    dateMap[dateStr] = (dateMap[dateStr] ?: 0L) + 1L
                }
            }

        val timeseries = dateMap.entries
            .sortedBy { it.key }
            .map { TimeseriesPointDto(date = it.key, views = it.value) }

        // 5. Top Posts
        val postViewCount = PageViews.id.count()
        val topPostCounts = PageViews.select(PageViews.postId, postViewCount)
            .where {
                (PageViews.blogId eq blogId) and
                (PageViews.postId.isNotNull()) and
                (PageViews.createdAt greaterEq since)
            }
            .groupBy(PageViews.postId)
            .orderBy(postViewCount to SortOrder.DESC)
            .limit(10)
            .mapNotNull { row ->
                val pId = row[PageViews.postId]?.value ?: return@mapNotNull null
                pId to row[postViewCount]
            }

        val topPosts = topPostCounts.mapNotNull { (pId, views) ->
            val variant = PostVariants.selectAll()
                .where { PostVariants.postId eq pId }
                .firstOrNull() ?: return@mapNotNull null

            TopPostStatDto(
                id = pId,
                title = variant[PostVariants.title],
                slug = variant[PostVariants.slug],
                views = views
            )
        }

        // 6. Top Referrers
        val refCount = PageViews.id.count()
        val topReferrers = PageViews.select(PageViews.referrer, refCount)
            .where { (PageViews.blogId eq blogId) and (PageViews.createdAt greaterEq since) }
            .groupBy(PageViews.referrer)
            .orderBy(refCount to SortOrder.DESC)
            .limit(10)
            .map { row ->
                ReferrerStatDto(
                    referrer = row[PageViews.referrer] ?: "Direct",
                    count = row[refCount]
                )
            }

        // 7. Device Breakdown
        val devCount = PageViews.id.count()
        val deviceBreakdown = PageViews.select(PageViews.deviceType, devCount)
            .where { (PageViews.blogId eq blogId) and (PageViews.createdAt greaterEq since) }
            .groupBy(PageViews.deviceType)
            .associate { row ->
                row[PageViews.deviceType] to row[devCount]
            }

        AnalyticsOverviewDto(
            totalViews = totalViews,
            views7d = views7d,
            viewsToday = viewsToday,
            viewsByDay = timeseries,
            topPosts = topPosts,
            topReferrers = topReferrers,
            deviceBreakdown = deviceBreakdown
        )
    }

    private fun detectDeviceType(userAgent: String?): String {
        if (userAgent == null) return "desktop"
        val ua = userAgent.lowercase()
        return when {
            ua.contains("bot") || ua.contains("crawler") || ua.contains("spider") ||
            ua.contains("googlebot") || ua.contains("bingbot") || ua.contains("slurp") -> "bot"
            ua.contains("ipad") || ua.contains("tablet") -> "tablet"
            ua.contains("mobi") || ua.contains("android") || ua.contains("iphone") -> "mobile"
            else -> "desktop"
        }
    }

    private fun cleanReferrer(referrer: String?): String {
        if (referrer.isNullOrBlank()) return "Direct"
        return try {
            val uri = URI(referrer)
            val host = uri.host
            if (!host.isNullOrBlank()) {
                host.removePrefix("www.")
            } else {
                referrer.take(100)
            }
        } catch (_: Exception) {
            referrer.take(100)
        }
    }
}
