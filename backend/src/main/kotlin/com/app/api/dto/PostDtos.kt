package com.app.api.dto

import com.app.domain.model.PostStatus
import kotlinx.serialization.Serializable

@Serializable
data class CreatePostRequest(
    val title: String,
    val slug: String,
    val languageCode: String = "en",
    val description: String? = null,
    val contentJson: String = "{}",
    val contentHtml: String = "",
    val isFeatured: Boolean = false,
    val isPage: Boolean = false,
    val featuredImageUrl: String? = null,
    val tagIds: List<Long> = emptyList(),
    val status: PostStatus = PostStatus.DRAFT,
    val scheduledAt: String? = null,
    val publishedAt: String? = null
)

@Serializable
data class UpdatePostRequest(
    val isFeatured: Boolean? = null,
    val isPage: Boolean? = null,
    val featuredImageUrl: String? = null,
    val canonicalUrl: String? = null,
    val tagIds: List<Long>? = null
)

@Serializable
data class UpdateVariantRequest(
    val title: String,
    val slug: String,
    val description: String? = null,
    val contentJson: String? = null,
    val contentHtml: String? = null,
    val status: PostStatus? = null,
    val scheduledAt: String? = null,
    val publishedAt: String? = null
)

@Serializable
data class PostVariantDto(
    val id: Long,
    val postId: Long,
    val languageCode: String,
    val slug: String,
    val title: String,
    val description: String?,
    val contentJson: String,
    val contentHtml: String,
    val status: PostStatus,
    val publishedAt: String?,
    val scheduledAt: String? = null,
    val updatedAt: String,
    val readingTimeMinutes: Int = 1,
    val wordCount: Int = 0
)

@Serializable
data class PostDto(
    val id: Long,
    val blogId: Long,
    val isFeatured: Boolean,
    val isPage: Boolean,
    val featuredImageUrl: String?,
    val canonicalUrl: String?,
    val createdAt: String,
    val updatedAt: String,
    val variants: List<PostVariantDto> = emptyList(),
    val tags: List<TagDto> = emptyList()
)

@Serializable
data class PostListItemDto(
    val id: Long,
    val blogId: Long,
    val isFeatured: Boolean,
    val isPage: Boolean,
    val featuredImageUrl: String?,
    val createdAt: String,
    val variant: PostVariantDto?,
    val tags: List<TagDto> = emptyList()
)

@Serializable
data class SchedulerRunResponse(
    val publishedCount: Int,
    val message: String
)

@Serializable
data class PublicPostListItemDto(
    val id: Long,
    val slug: String,
    val title: String,
    val description: String?,
    val isFeatured: Boolean,
    val isPage: Boolean,
    val featuredImageUrl: String?,
    val publishedAt: String?,
    val publishedAtFormatted: String?,
    val readingTimeMinutes: Int,
    val tags: List<TagDto> = emptyList(),
    val languageCode: String
)

@Serializable
data class PostAlternateLanguageDto(
    val languageCode: String,
    val slug: String,
    val title: String
)

@Serializable
data class PublicPostDetailDto(
    val id: Long,
    val slug: String,
    val title: String,
    val description: String?,
    val contentHtml: String,
    val contentJson: String,
    val isFeatured: Boolean,
    val isPage: Boolean,
    val featuredImageUrl: String?,
    val canonicalUrl: String?,
    val publishedAt: String?,
    val publishedAtFormatted: String?,
    val readingTimeMinutes: Int,
    val wordCount: Int,
    val tags: List<TagDto> = emptyList(),
    val languageCode: String,
    val relatedPosts: List<PublicPostListItemDto> = emptyList(),
    val alternateLanguages: List<PostAlternateLanguageDto> = emptyList()
)

@Serializable
data class PublicPostsResponseDto(
    val total: Int,
    val posts: List<PublicPostListItemDto>
)
