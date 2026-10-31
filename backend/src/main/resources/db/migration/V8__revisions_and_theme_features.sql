-- 18. Post Revision History & Version Control
CREATE TABLE post_revisions (
    id BIGSERIAL PRIMARY KEY,
    post_variant_id BIGINT NOT NULL REFERENCES post_variants(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    content_html TEXT NOT NULL,
    content_json TEXT NOT NULL DEFAULT '{}',
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_by_user_id BIGINT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_post_revisions_variant ON post_revisions(post_variant_id, created_at DESC);

-- 19. Dark Mode Theme Settings
ALTER TABLE blogs
    ADD COLUMN dark_mode_enabled BOOLEAN NOT NULL DEFAULT TRUE;
