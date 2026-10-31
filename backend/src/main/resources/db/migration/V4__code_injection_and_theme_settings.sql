-- 10. Code injection and theme appearance settings
ALTER TABLE blogs
    ADD COLUMN code_head TEXT,
    ADD COLUMN code_foot TEXT,
    ADD COLUMN accent_color VARCHAR(30) DEFAULT '#2563eb',
    ADD COLUMN font_family VARCHAR(50) DEFAULT 'Inter',
    ADD COLUMN logo_url TEXT,
    ADD COLUMN favicon_url TEXT;
