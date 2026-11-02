package com.app

import com.app.domain.model.*
import com.app.service.SchedulerService
import kotlinx.coroutines.runBlocking
import org.jetbrains.exposed.sql.*
import org.jetbrains.exposed.sql.transactions.transaction
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import java.time.Instant
import java.time.temporal.ChronoUnit
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertNull

class SchedulerTest {

    companion object {
        @BeforeAll
        @JvmStatic
        fun setupDb() {
            Database.connect(
                url = "jdbc:h2:mem:scheduler_test;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
                driver = "org.h2.Driver"
            )
            transaction {
                SchemaUtils.create(
                    Users,
                    Blogs,
                    Posts,
                    PostVariants,
                    PostRevisions
                )
            }
        }
    }

    @Test
    fun testPublishDuePostsAndBlogIsolation() = runBlocking {
        val now = Instant.now()
        val pastTime = now.minus(15, ChronoUnit.MINUTES)
        val futureTime = now.plus(2, ChronoUnit.HOURS)

        var blog1Id: Long = 0
        var blog2Id: Long = 0
        var post1Id: Long = 0
        var post2Id: Long = 0
        var post3Id: Long = 0
        var variant1DueId: Long = 0
        var variant2FutureId: Long = 0
        var variant3Blog2DueId: Long = 0

        transaction {
            val uId = Users.insert {
                it[email] = "test-scheduler@toppy.dev"
                it[passwordHash] = "hash"
                it[name] = "Scheduler Tester"
                it[role] = UserRole.ADMIN.name
            } get Users.id

            blog1Id = (Blogs.insert {
                it[title] = "Blog 1"
                it[subdomain] = "blog1-sched"
                it[ownerId] = uId
            } get Blogs.id).value

            blog2Id = (Blogs.insert {
                it[title] = "Blog 2"
                it[subdomain] = "blog2-sched"
                it[ownerId] = uId
            } get Blogs.id).value

            // Post 1: Blog 1, due for publishing
            post1Id = (Posts.insert {
                it[blogId] = blog1Id
            } get Posts.id).value

            variant1DueId = (PostVariants.insert {
                it[postId] = post1Id
                it[languageCode] = "en"
                it[slug] = "due-post-1"
                it[title] = "Due Post 1"
                it[contentHtml] = "<p>Due content</p>"
                it[contentJson] = "{}"
                it[status] = PostStatus.SCHEDULED.name
                it[scheduledAt] = pastTime
            } get PostVariants.id).value

            // Post 2: Blog 1, scheduled for future
            post2Id = (Posts.insert {
                it[blogId] = blog1Id
            } get Posts.id).value

            variant2FutureId = (PostVariants.insert {
                it[postId] = post2Id
                it[languageCode] = "en"
                it[slug] = "future-post-2"
                it[title] = "Future Post 2"
                it[contentHtml] = "<p>Future content</p>"
                it[contentJson] = "{}"
                it[status] = PostStatus.SCHEDULED.name
                it[scheduledAt] = futureTime
            } get PostVariants.id).value

            // Post 3: Blog 2, due for publishing
            post3Id = (Posts.insert {
                it[blogId] = blog2Id
            } get Posts.id).value

            variant3Blog2DueId = (PostVariants.insert {
                it[postId] = post3Id
                it[languageCode] = "en"
                it[slug] = "blog2-due-post-3"
                it[title] = "Blog 2 Due Post 3"
                it[contentHtml] = "<p>Blog 2 content</p>"
                it[contentJson] = "{}"
                it[status] = PostStatus.SCHEDULED.name
                it[scheduledAt] = pastTime
            } get PostVariants.id).value
        }

        val scheduler = SchedulerService(webhookService = null, pollIntervalMs = 60000L)

        // 1. Run publish targeting only Blog 1
        val publishedBlog1 = scheduler.publishDuePosts(targetBlogId = blog1Id)
        assertEquals(1, publishedBlog1, "Should publish exactly 1 due post for Blog 1")

        transaction {
            // Variant 1 (Blog 1, past) should now be PUBLISHED
            val v1 = PostVariants.selectAll().where { PostVariants.id eq variant1DueId }.first()
            assertEquals(PostStatus.PUBLISHED.name, v1[PostVariants.status])
            assertNotNull(v1[PostVariants.publishedAt])
            assertNull(v1[PostVariants.scheduledAt])

            // Variant 2 (Blog 1, future) should still be SCHEDULED
            val v2 = PostVariants.selectAll().where { PostVariants.id eq variant2FutureId }.first()
            assertEquals(PostStatus.SCHEDULED.name, v2[PostVariants.status])
            assertNull(v2[PostVariants.publishedAt])
            assertEquals(futureTime.truncatedTo(ChronoUnit.MILLIS), v2[PostVariants.scheduledAt]?.truncatedTo(ChronoUnit.MILLIS))

            // Variant 3 (Blog 2, past) should still be SCHEDULED because we targeted Blog 1
            val v3 = PostVariants.selectAll().where { PostVariants.id eq variant3Blog2DueId }.first()
            assertEquals(PostStatus.SCHEDULED.name, v3[PostVariants.status])
        }

        // 2. Run publish globally (across all blogs)
        val publishedGlobal = scheduler.publishDuePosts()
        assertEquals(1, publishedGlobal, "Should publish the remaining Blog 2 due post")

        transaction {
            val v3After = PostVariants.selectAll().where { PostVariants.id eq variant3Blog2DueId }.first()
            assertEquals(PostStatus.PUBLISHED.name, v3After[PostVariants.status])
            assertNotNull(v3After[PostVariants.publishedAt])
            assertNull(v3After[PostVariants.scheduledAt])
        }

        // 3. Running again immediately should find 0 due posts
        val publishedNone = scheduler.publishDuePosts()
        assertEquals(0, publishedNone, "Should find 0 due posts after all due posts are published")
    }
}
