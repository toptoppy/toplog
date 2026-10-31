# Multi-Tenant Blogging Platform Architecture & Technical Deep Dive

This document details the internal architecture, design decisions, data flow, and subsystems of the blogging platform.

---

## 1. High-Level System Architecture

```mermaid
flowchart TD
    subgraph Clients["Clients & External Consumers"]
        BrowserVisitor["Public Readers / Web Browsers"]
        BrowserAuthor["Blog Owners / Editors (Console)"]
        SocialScrapers["Social Scrapers (Twitter, Slack, LinkedIn)"]
        WebhookReceivers["External Webhook Endpoints"]
    end

    subgraph Gateway["Edge Proxy (Caddy 2)"]
        CaddyProxy["Caddy HTTP/HTTPS Reverse Proxy"]
        CaddyTLS["On-Demand TLS Engine"]
    end

    subgraph Applications["Application Tier"]
        ConsoleApp["Admin Console (Next.js 15 App Router)<br/>Port 3000"]
        BackendApp["Core Backend & Delivery (Kotlin 21 + Ktor)<br/>Port 8080"]
    end

    subgraph BackendModules["Ktor Core Subsystems"]
        RoutingDelivery["Public Delivery Routes<br/>(Pebble Template Engine)"]
        RoutingConsole["Console REST API<br/>(JWT Authentication)"]
        RoutingOg["Dynamic OG Image Service<br/>(SVG Vector Cards)"]
        ServiceRevision["Revision History Service<br/>(Automated Snapshots)"]
        ServiceExport["Full Export & Backup Service<br/>(Zip Packaging)"]
        ServiceScheduler["Post Scheduler & Cron<br/>(Coroutine Background Worker)"]
        ServiceWebhook["Webhook Dispatcher<br/>(HMAC-SHA256 Signing)"]
    end

    subgraph Persistence["Storage & Persistence Tier"]
        PostgresDB[("PostgreSQL 16 Database<br/>Exposed SQL + Flyway")]
        DiskStorage[("Media File Storage<br/>/app/uploads")]
    end

    BrowserVisitor -->|HTTP / HTTPS| CaddyProxy
    BrowserAuthor -->|HTTP / HTTPS| CaddyProxy
    SocialScrapers -->|GET /api/og/:slug| CaddyProxy

    CaddyProxy -->|console.localhost| ConsoleApp
    CaddyProxy -->|*.localhost, custom domains| BackendApp
    CaddyTLS -.->|GET /api/internal/check-domain| BackendApp

    ConsoleApp -->|REST API + Bearer Token| RoutingConsole
    BackendApp --- RoutingDelivery
    BackendApp --- RoutingConsole
    BackendApp --- RoutingOg
    BackendApp --- ServiceRevision
    BackendApp --- ServiceExport
    BackendApp --- ServiceScheduler
    BackendApp --- ServiceWebhook

    BackendApp -->|HikariCP Pool| PostgresDB
    BackendApp -->|Multipart Uploads| DiskStorage
    ServiceWebhook -->|Signed HTTP POST| WebhookReceivers
```

---

## 2. Technology Stack & Key Decisions

| Tier | Technology | Rationale |
|---|---|---|
| **Delivery & API** | **Kotlin 21 + Ktor 2.3** | High concurrency with lightweight coroutines, near-instant cold starts, strong typing, low memory footprint (~90MB RAM under load), and high throughput for public blog delivery. |
| **Console Frontend** | **Next.js 15 + React 19** | Fast SSR/client transitions, React Server Components where beneficial, clean App Router architecture, and modern TypeScript support. |
| **Rich Text Editor** | **TipTap (ProseMirror)** | Headless, extensible, produces clean semantic HTML and structured JSON, supports Markdown shortcuts, custom embeds, code highlights, and tables. |
| **Template Engine** | **Pebble Templates** | Jinja/Twig-inspired syntax for Java/Kotlin, sandboxed, fast parsing, built-in inheritance (`{% extends %}` and `{% block %}`), easily themeable by web developers. |
| **Database & ORM** | **PostgreSQL 16 + Exposed SQL** | Rock-solid relational consistency, ACID guarantees, native JSONB support, and idiomatic Kotlin DSL via JetBrains Exposed. |
| **Migrations** | **Flyway 10** | Safe, repeatable, version-controlled schema evolution executed automatically on startup. |
| **Edge Proxy & TLS** | **Caddy 2** | Automatic HTTPS, HTTP/2 & HTTP/3 support, and unique **On-Demand TLS** allowing arbitrary custom domains to receive certificates without server restarts. |

---

## 3. Database Schema Overview

Flyway migrations (`backend/src/main/resources/db/migration/`) construct the relational model:

```mermaid
erDiagram
    USERS ||--o{ BLOGS : "owns"
    USERS ||--o{ BLOG_MEMBERS : "participates in"
    BLOGS ||--o{ BLOG_MEMBERS : "has members"
    BLOGS ||--o{ POSTS : "contains"
    BLOGS ||--o{ TAGS : "defines"
    BLOGS ||--o{ WEBHOOKS : "configures"
    BLOGS ||--o{ SUBSCRIBERS : "has readers"
    BLOGS ||--o{ COMMENTS : "contains comments"

    POSTS ||--o{ POST_VARIANTS : "has localized versions"
    POSTS ||--o{ POST_TAGS : "tagged with"
    TAGS ||--o{ POST_TAGS : "assigned to"
    POST_VARIANTS ||--o{ POST_REVISIONS : "has version snapshots"
    POSTS ||--o{ COMMENTS : "has discussion"

    WEBHOOKS ||--o{ WEBHOOK_DELIVERIES : "logs attempts"

    BLOGS {
        bigint id PK
        varchar subdomain UK
        varchar custom_domain UK
        varchar title
        varchar default_language
        varchar theme_name
        varchar accent_color
        varchar font_family
        boolean dark_mode_enabled
        varchar domain_dns_status
    }

    POSTS {
        bigint id PK
        bigint blog_id FK
        boolean is_featured
        boolean is_page
        varchar featured_image_url
        timestamp created_at
    }

    POST_VARIANTS {
        bigint id PK
        bigint post_id FK
        varchar language_code
        varchar slug
        varchar title
        text content_html
        text content_json
        varchar status
        timestamp scheduled_at
        timestamp published_at
    }

    POST_REVISIONS {
        bigint id PK
        bigint post_variant_id FK
        varchar title
        varchar slug
        text content_html
        text content_json
        varchar status
        bigint created_by_user_id FK
        timestamp created_at
    }
```

---

## 4. Subsystem Deep Dives

### 4.1 Multi-Tenant Routing Engine

1. **Host Header Resolution**:
   - The Ktor `DeliveryRoutes` module intercepts incoming requests.
   - Extracts the `Host` header (e.g. `tech.localhost:8080` or `blog.company.com`).
   - Resolves the tenant:
     ```kotlin
     val blog = blogService.getBlogByHost(host)
         ?: return@get call.respond(HttpStatusCode.NotFound, "Blog not found")
     ```
2. **Pebble Theme Rendering**:
   - Injects the resolved blog context, publication metadata, accent colors, and custom `<head>` / `<body>` tracking scripts.
   - Executes template inheritance from `themes/${blog.themeName}/layout.pebble`.

---

### 4.2 Post Revision History & Instant Rollback

```mermaid
sequenceDiagram
    autonumber
    actor Author as Blog Author
    participant Studio as Post Studio (Console)
    participant API as Ktor PostService
    participant RevService as RevisionService
    participant DB as PostgreSQL

    Author->>Studio: Edits title, content, or metadata
    Author->>Studio: Clicks "Save Draft" or "Publish"
    Studio->>API: PUT /api/console/blogs/:id/posts/:id/variants/:lang
    API->>DB: Updates POST_VARIANTS row
    API->>RevService: createRevision(variant, userId)
    RevService->>DB: INSERT into POST_REVISIONS
    API-->>Studio: 200 OK (Updated Variant)

    Note over Author,Studio: Author inspects past versions
    Author->>Studio: Clicks "History" button
    Studio->>API: GET /api/console/.../revisions
    API->>DB: SELECT * FROM post_revisions ORDER BY created_at DESC
    API-->>Studio: List of revisions with word counts & timestamps
    Author->>Studio: Selects snapshot and clicks "Rollback to This Version"
    Studio->>API: POST /api/console/.../revisions/:revId/restore
    API->>DB: Overwrites POST_VARIANTS with snapshot data
    API-->>Studio: 200 OK (Variant restored)
    Studio->>Author: Editor canvas reloads with restored content
```

---

### 4.3 Dynamic Open Graph & Social Cards

- **Route**: `GET /api/og/{slug}`
- **Renderer**: [`OgImageService.kt`](file:///Users/toptoppy/projects/blogs/backend/src/main/kotlin/com/app/service/OgImageService.kt)
- **Format**: SVG (`image/svg+xml`) rendered with:
  - 1200×630 canvas dimensions.
  - Ambient radial background glow using blog accent colors (`blog.accentColor`).
  - Word-wrapped post title with dynamic line-breaking calculations.
  - Published timestamp & dynamic reading time (`X min read`).
  - Branded publication tag and custom domain watermarks.
  - Response headers: `Cache-Control: public, max-age=86400` for edge caching by CDN and social platform crawlers.

---

### 4.4 Full Blog Backup & Export Pipeline

- **Route**: `GET /api/console/blogs/{blogId}/export.zip`
- **Output**: Compressed ZIP archive stream constructed by [`ExportService.kt`](file:///Users/toptoppy/projects/blogs/backend/src/main/kotlin/com/app/service/ExportService.kt):
  1. `metadata.json`: Complete serialized blog attributes (theme, typography, accent color, domain configs).
  2. `data/tags.json`: JSON dump of all taxonomy tags.
  3. `data/comments.json`: JSON dump of reader comments including parent/child reply hierarchy.
  4. `data/subscribers.csv`: RFC-4180 compliant CSV export of subscriber emails and statuses.
  5. `posts/{lang}/{slug}.md`: Individual Markdown documents equipped with YAML frontmatter:
     ```yaml
     ---
     title: "Building High-Performance Systems with Kotlin"
     slug: "building-high-performance-systems"
     language: "en"
     status: "PUBLISHED"
     published_at: "2026-10-30T02:02:46Z"
     tags: ["Kotlin", "Architecture"]
     ---

     <p>Body content...</p>
     ```

---

### 4.5 Scheduled Publishing & Webhook Dispatcher

- **Worker**: [`SchedulerService.kt`](file:///Users/toptoppy/projects/blogs/backend/src/main/kotlin/com/app/service/SchedulerService.kt) operates a Kotlin Coroutine loop running every 30 seconds.
- **Workflow**:
  1. Queries all post variants where `status = 'SCHEDULED'` and `scheduled_at <= NOW()`.
  2. Atomically transitions their status to `'PUBLISHED'` and sets `published_at = NOW()`.
  3. Dispatches asynchronous webhook payloads (`post.published`) to all active URLs configured for that blog.
  4. Each webhook HTTP request includes:
     - `X-Blog-Event`: `post.published`
     - `X-Blog-Signature`: `sha256=HMAC_SHA256(secret, payload)`
  5. Records HTTP response code and execution latency in `webhook_deliveries`.

---

## 5. Security & Isolation Model

1. **Authentication**: Stateless HMAC-SHA256 JWT tokens with 24-hour expiration, validated by Ktor's `jwt("auth-jwt")` authentication provider.
2. **Multi-Tenant Isolation**: Every database query scoped to console endpoints enforces `WHERE blog_id = :blogId` and verifies that the calling user holds an active membership record in `blog_members` or is the blog `owner_id`.
3. **Role-Based Access Control (RBAC)**:
   - `ADMIN`: Full control including billing, member management, code injection, and deletion.
   - `EDITOR`: Create, edit, and publish posts and manage tags and comments.
   - `AUTHOR`: Create and edit own draft posts; cannot publish without editor approval.
4. **On-Demand TLS Guard**: Caddy queries the backend internal verification route before requesting certificates from Let's Encrypt, preventing malicious domain exhaustion attacks.
