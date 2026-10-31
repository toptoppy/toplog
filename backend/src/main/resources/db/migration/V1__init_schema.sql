-- 1. Users
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'AUTHOR',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Blogs (Multi-tenant blogs)
CREATE TABLE blogs (
    id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subdomain VARCHAR(100) NOT NULL UNIQUE,
    custom_domain VARCHAR(255) UNIQUE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    default_language VARCHAR(10) NOT NULL DEFAULT 'en',
    theme_name VARCHAR(100) NOT NULL DEFAULT 'default',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Base Posts (Language-agnostic container)
CREATE TABLE posts (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    is_featured BOOLEAN NOT NULL DEFAULT FALSE,
    is_page BOOLEAN NOT NULL DEFAULT FALSE,
    featured_image_url TEXT,
    canonical_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Post Variants (Locale-specific content)
CREATE TABLE post_variants (
    id BIGSERIAL PRIMARY KEY,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    language_code VARCHAR(10) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    content_json TEXT NOT NULL DEFAULT '{}',
    content_html TEXT NOT NULL DEFAULT '',
    status VARCHAR(50) NOT NULL DEFAULT 'DRAFT',
    published_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_post_language UNIQUE (post_id, language_code)
);

-- 5. Tags & Post Tags
CREATE TABLE tags (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL,
    CONSTRAINT uq_blog_tag_slug UNIQUE (blog_id, slug)
);

CREATE TABLE post_tags (
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
);

-- 6. Media Uploads
CREATE TABLE media (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    mime_type VARCHAR(100) NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_blogs_subdomain ON blogs(subdomain);
CREATE INDEX idx_blogs_custom_domain ON blogs(custom_domain);
CREATE INDEX idx_posts_blog_id ON posts(blog_id);
CREATE INDEX idx_post_variants_post_id ON post_variants(post_id);
CREATE INDEX idx_post_variants_slug ON post_variants(slug);
CREATE INDEX idx_post_variants_status ON post_variants(status);
