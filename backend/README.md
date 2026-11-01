# Blogs Delivery Engine & REST API (Kotlin + Ktor)

Modern, high-performance blogging engine and multi-tenant headless CMS built with **Kotlin**, **Ktor 3.x**, and **PostgreSQL**.

## Architecture & Features

- **Multi-Tenant / Multi-Blog**: Host unlimited blogs with custom subdomains or custom domains.
- **Variant i18n Architecture**: Base `Post` containers with locale-specific `PostVariant` content (TipTap rich-text JSON + pre-rendered HTML).
- **Dynamic Theming with Pebble**: Twig/Jinja-compatible JVM templating engine with sandboxed execution.
- **Automatic Custom Domains**: Includes `/api/internal/check-domain` hook for **Caddy On-Demand TLS**.
- **Auth & Security**: JWT-based session tokens with BCrypt password hashing.
- **Media Uploads**: Local volume or S3-compatible asset management.
- **Syndication & SEO**: Automatic Atom/RSS feeds (`/feed.atom`), XML sitemaps (`/sitemap.xml`), and OpenGraph metadata.

---

## Getting Started

### Prerequisites

- Java 21+
- PostgreSQL 18+

### Local Setup

1. **Start PostgreSQL**:
   ```bash
   docker run --name blog-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=blogdb -p 5432:5432 -d postgres:16-alpine
   ```

2. **Run the Application**:
   ```bash
   ./gradlew run
   ```
   Flyway will automatically apply database migrations on startup.

3. **Verify Health**:
   ```bash
   curl http://localhost:8080/health
   # Returns: {"status": "UP"}
   ```

---

## API Overview

### 1. Authentication (`/api/auth`)
- `POST /api/auth/register` - Create an author account (`{ email, password, name }`)
- `POST /api/auth/login` - Authenticate and obtain JWT (`{ email, password }`)
- `GET /api/auth/me` - Current authenticated user profile (Bearer token)

### 2. Console Management (`/api/console`)
- `GET /api/console/blogs` - List user's blogs
- `POST /api/console/blogs` - Create a new blog (`{ subdomain, title, defaultLanguage }`)
- `GET /api/console/blogs/{blogId}/posts` - List posts (supports `?language=en&status=PUBLISHED&isPage=false`)
- `POST /api/console/blogs/{blogId}/posts` - Create post with initial language variant
- `PUT /api/console/blogs/{blogId}/posts/{postId}/variants/{lang}` - Update/create localized variant (TipTap JSON & HTML)
- `POST /api/console/blogs/{blogId}/media` - Upload image/asset (multipart)

### 3. Public Blog Delivery Engine
- `GET /` - Blog homepage (renders theme `index.pebble`)
- `GET /{slug}` - Post or page (renders theme `post.pebble`)
- `GET /tag/{slug}` - Tag archive (renders theme `tag.pebble`)
- `GET /feed.atom` - Atom RSS feed
- `GET /sitemap.xml` - XML sitemap
- `GET /assets/{file}` - Theme static assets (CSS, images, JS)
