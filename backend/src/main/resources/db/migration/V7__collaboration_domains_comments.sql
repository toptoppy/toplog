-- 15. Team Collaboration & Role-Based Permissions
CREATE TABLE blog_members (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(50) NOT NULL DEFAULT 'AUTHOR',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(blog_id, user_id)
);

-- Backfill existing blog owners into blog_members as ADMIN
INSERT INTO blog_members (blog_id, user_id, role)
SELECT id, owner_id, 'ADMIN' FROM blogs
ON CONFLICT DO NOTHING;

CREATE TABLE blog_invites (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'AUTHOR',
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_blog_invites_blog ON blog_invites(blog_id);
CREATE INDEX idx_blog_invites_token ON blog_invites(token);

-- 16. Custom Domain Verification
ALTER TABLE blogs
    ADD COLUMN domain_verified_at TIMESTAMPTZ,
    ADD COLUMN domain_dns_status VARCHAR(50) NOT NULL DEFAULT 'UNVERIFIED';

-- 17. Comments & Reader Engagement
CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    post_id BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    parent_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
    author_name VARCHAR(100) NOT NULL,
    author_email VARCHAR(255) NOT NULL,
    author_website VARCHAR(255),
    content TEXT NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_comments_post_status ON comments(post_id, status);
CREATE INDEX idx_comments_blog_status ON comments(blog_id, status);
CREATE INDEX idx_comments_parent ON comments(parent_id);
