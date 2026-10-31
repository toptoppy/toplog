package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class RecordPageViewRequest(
    val path: String,
    val postId: Long? = null,
    val referrer: String? = null
)

@Serializable
data class TimeseriesPointDto(
    val date: String,
    val views: Long
)

@Serializable
data class TopPostStatDto(
    val id: Long,
    val title: String,
    val slug: String,
    val views: Long
)

@Serializable
data class ReferrerStatDto(
    val referrer: String,
    val count: Long
)

@Serializable
data class AnalyticsOverviewDto(
    val totalViews: Long,
    val views7d: Long,
    val viewsToday: Long,
    val viewsByDay: List<TimeseriesPointDto>,
    val topPosts: List<TopPostStatDto>,
    val topReferrers: List<ReferrerStatDto>,
    val deviceBreakdown: Map<String, Long>
)
