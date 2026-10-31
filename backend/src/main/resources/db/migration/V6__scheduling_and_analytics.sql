-- 13. Post Scheduling
ALTER TABLE post_variants
    ADD COLUMN scheduled_at TIMESTAMPTZ;

CREATE INDEX idx_post_variants_scheduled ON post_variants(status, scheduled_at);

-- 14. Privacy-Preserving Analytics (Page Views & Referrers)
CREATE TABLE page_views (
    id BIGSERIAL PRIMARY KEY,
    blog_id BIGINT NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
    post_id BIGINT REFERENCES posts(id) ON DELETE SET NULL,
    path VARCHAR(500) NOT NULL,
    referrer VARCHAR(500),
    device_type VARCHAR(50) NOT NULL DEFAULT 'desktop',
    user_agent VARCHAR(500),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_page_views_blog_created ON page_views(blog_id, created_at);
CREATE INDEX idx_page_views_post_id ON page_views(post_id);
