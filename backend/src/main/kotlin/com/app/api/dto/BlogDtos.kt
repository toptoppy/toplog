package com.app.api.dto

import kotlinx.serialization.Serializable

@Serializable
data class CreateBlogRequest(
    val subdomain: String,
    val title: String,
    val description: String? = null,
    val defaultLanguage: String = "en",
    val accentColor: String = "#2563eb",
    val fontFamily: String = "Inter"
)

@Serializable
data class UpdateBlogRequest(
    val title: String? = null,
    val description: String? = null,
    val customDomain: String? = null,
    val defaultLanguage: String? = null,
    val themeName: String? = null,
    val codeHead: String? = null,
    val codeFoot: String? = null,
    val accentColor: String? = null,
    val fontFamily: String? = null,
    val logoUrl: String? = null,
    val faviconUrl: String? = null,
    val darkModeEnabled: Boolean? = null
)

@Serializable
data class BlogDto(
    val id: Long,
    val ownerId: Long,
    val subdomain: String,
    val customDomain: String?,
    val title: String,
    val description: String?,
    val defaultLanguage: String,
    val themeName: String,
    val codeHead: String? = null,
    val codeFoot: String? = null,
    val accentColor: String = "#2563eb",
    val fontFamily: String = "Inter",
    val logoUrl: String? = null,
    val faviconUrl: String? = null,
    val domainVerifiedAt: String? = null,
    val domainDnsStatus: String = "UNVERIFIED",
    val darkModeEnabled: Boolean = true,
    val createdAt: String
)
