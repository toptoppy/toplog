-- 11. Subscribers
CREATE TABLE subscribers (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    status VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    token VARCHAR(255) NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_blog_subscriber UNIQUE (blog_id, email)
);

CREATE INDEX idx_subscribers_blog_id ON subscribers(blog_id);
CREATE INDEX idx_subscribers_token ON subscribers(token);

-- 12. Newsletters (Campaign dispatch logs)
CREATE TABLE newsletters (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    post_id BIGINT REFERENCES posts(id) ON DELETE SET NULL,
    subject VARCHAR(255) NOT NULL,
    content_html TEXT NOT NULL,
    recipient_count INT NOT NULL DEFAULT 0,
    sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_newsletters_blog_id ON newsletters(blog_id);
