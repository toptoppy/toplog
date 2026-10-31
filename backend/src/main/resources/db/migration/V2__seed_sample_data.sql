-- 1. Seed Default Admin User
-- Password is 'password123'
INSERT INTO users (id, email, password_hash, name, role)
VALUES (
    1,
    'admin@example.com',
    '$2a$12$IRtxFEz6WBvgVf9o/ZRDleLBg7MaJV7XLXPaGhjbDtdoUOTZFsK4O',
    'Platform Admin',
    'ADMIN'
) ON CONFLICT (id) DO NOTHING;

-- 2. Seed Default Sample Blog
INSERT INTO blogs (id, owner_id, subdomain, title, description, default_language, theme_name)
VALUES (
    1,
    1,
    'tech',
    'Engineering & Systems',
    'Deep dives into distributed systems, Kotlin, and modern web architectures.',
    'en',
    'default'
) ON CONFLICT (id) DO NOTHING;

-- 3. Seed Sample Tags
INSERT INTO tags (id, blog_id, name, slug)
VALUES 
    (1, 1, 'Kotlin', 'kotlin'),
    (2, 1, 'Architecture', 'architecture')
ON CONFLICT (id) DO NOTHING;

-- 4. Seed First Post (Featured)
INSERT INTO posts (id, blog_id, is_featured, is_page)
VALUES (1, 1, TRUE, FALSE)
ON CONFLICT (id) DO NOTHING;

-- Link Post 1 to Tags
INSERT INTO post_tags (post_id, tag_id)
VALUES (1, 1), (1, 2)
ON CONFLICT (post_id, tag_id) DO NOTHING;

-- 5. Seed English Variant (EN)
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at
) VALUES (
    1,
    1,
    'en',
    'building-high-performance-systems',
    'Building High-Performance Systems with Ktor and Next.js',
    'How we architected a multi-tenant publishing platform combining Kotlin backend performance with Next.js frontend flexibility.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Welcome to our new publishing platform! Built with Kotlin 2.0, Ktor 3.x, and PostgreSQL, this platform delivers high-throughput blog rendering alongside a modern Next.js editor studio."}]}]}',
    '<p>Welcome to our new publishing platform! Built with <strong>Kotlin 2.0</strong>, <strong>Ktor 3.x</strong>, and <strong>PostgreSQL</strong>, this platform delivers high-throughput blog rendering alongside a modern Next.js editor studio.</p><h2>The Variant i18n Model</h2><p>Every post acts as a language-agnostic container, with localized content stored in dedicated variants. This allows adding translations seamlessly without duplicating metadata or category relationships.</p><p>Explore the admin console or subscribe to our <a href="/feed.atom">RSS feed</a>!</p>',
    'PUBLISHED',
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- 6. Seed Spanish Translation Variant (ES)
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at
) VALUES (
    2,
    1,
    'es',
    'construyendo-sistemas-de-alto-rendimiento',
    'Construyendo Sistemas de Alto Rendimiento con Ktor y Next.js',
    'Cómo diseñamos una plataforma de publicación multi-inquilino combinando el rendimiento de Kotlin con Next.js.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"¡Bienvenidos a nuestra nueva plataforma de blogs!"}]}]}',
    '<p>¡Bienvenidos a nuestra nueva plataforma de blogs! Construida con <strong>Kotlin</strong> y <strong>PostgreSQL</strong>, esta arquitectura ofrece publicación multilingüe y ultra-rápida.</p><h2>Modelo de Variantes</h2><p>Cada publicación actúa como un contenedor independiente del idioma, mientras que el contenido se almacena en variantes específicas para cada idioma.</p>',
    'PUBLISHED',
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Update sequence IDs to avoid collisions on new inserts
SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));
SELECT setval('blogs_id_seq', (SELECT MAX(id) FROM blogs));
SELECT setval('tags_id_seq', (SELECT MAX(id) FROM tags));
SELECT setval('posts_id_seq', (SELECT MAX(id) FROM posts));
SELECT setval('post_variants_id_seq', (SELECT MAX(id) FROM post_variants));
