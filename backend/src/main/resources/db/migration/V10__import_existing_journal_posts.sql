-- V10: Import existing journal posts from personal-website & Strapi into TopLog

-- 1. Ensure Tags Exist
INSERT INTO tags (id, blog_id, name, slug)
VALUES 
    (3, 1, 'Distributed Systems', 'distributed-systems'),
    (4, 1, 'Trail Running', 'trail-running'),
    (5, 1, 'Learning', 'learning')
ON CONFLICT (id) DO NOTHING;

-- 2. Post 10: What Trail Running Taught Me About Software Architecture
INSERT INTO posts (id, blog_id, is_featured, is_page, canonical_url, created_at, updated_at)
VALUES (10, 1, TRUE, FALSE, 'https://kananek.top/writing/what-trail-running-taught-me-about-software-architecture', '2024-05-18 00:00:00+00', '2024-05-18 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
VALUES (10, 2), (10, 4) -- Architecture, Trail Running
ON CONFLICT (post_id, tag_id) DO NOTHING;

INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    10,
    10,
    'en',
    'what-trail-running-taught-me-about-software-architecture',
    'What Trail Running Taught Me About Software Architecture',
    'How pacing, feedback, and resilience on the trail translate into better architecture decisions.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Every long trail starts with confidence, then slowly removes anything that is not real. The climb does not care about the plan. Heat, mud, fatigue, and nutrition all become feedback. Software systems behave the same way when they meet production."}]},{"type":"paragraph","content":[{"type":"text","text":"Architecture is not the diagram. It is the set of decisions that still works when conditions change."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Pacing Is A Design Skill"}]},{"type":"paragraph","content":[{"type":"text","text":"On the trail, starting too fast creates debt. In software, over-engineering does the same. Both feel productive at the beginning. Both become expensive later."}]},{"type":"paragraph","content":[{"type":"text","text":"Good architecture leaves room for learning. It chooses boundaries that can move, interfaces that can be replaced, and systems that can recover without drama."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Feedback Beats Ego"}]},{"type":"paragraph","content":[{"type":"text","text":"A race gives honest signals: heart rate, cramps, pace, weather, missed calories. A system gives honest signals too: latency, errors, retries, queues, failed deploys."}]},{"type":"paragraph","content":[{"type":"text","text":"The job is not to defend the original plan. The job is to listen early enough to adapt."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Endurance Is Simplicity Repeated"}]},{"type":"paragraph","content":[{"type":"text","text":"Long-distance running is built from simple actions repeated with discipline. Drink. Eat. Walk the climb. Run when possible. Keep moving."}]},{"type":"paragraph","content":[{"type":"text","text":"Reliable software is similar. Clear ownership. Small deploys. Observable behavior. Boring recovery paths. Good systems are not always clever, but they are durable."}]},{"type":"paragraph","content":[{"type":"text","text":"The journey is the architecture because the route changes the builder."}]}]}',
    '<p>Every long trail starts with confidence, then slowly removes anything that is not real. The climb does not care about the plan. Heat, mud, fatigue, and nutrition all become feedback. Software systems behave the same way when they meet production.</p><p>Architecture is not the diagram. It is the set of decisions that still works when conditions change.</p><h2>Pacing Is A Design Skill</h2><p>On the trail, starting too fast creates debt. In software, over-engineering does the same. Both feel productive at the beginning. Both become expensive later.</p><p>Good architecture leaves room for learning. It chooses boundaries that can move, interfaces that can be replaced, and systems that can recover without drama.</p><h2>Feedback Beats Ego</h2><p>A race gives honest signals: heart rate, cramps, pace, weather, missed calories. A system gives honest signals too: latency, errors, retries, queues, failed deploys.</p><p>The job is not to defend the original plan. The job is to listen early enough to adapt.</p><h2>Endurance Is Simplicity Repeated</h2><p>Long-distance running is built from simple actions repeated with discipline. Drink. Eat. Walk the climb. Run when possible. Keep moving.</p><p>Reliable software is similar. Clear ownership. Small deploys. Observable behavior. Boring recovery paths. Good systems are not always clever, but they are durable.</p><p>The journey is the architecture because the route changes the builder.</p>',
    'PUBLISHED',
    '2024-05-18 00:00:00+00',
    '2024-05-18 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- 3. Post 11: Simplicity in Distributed Systems
INSERT INTO posts (id, blog_id, is_featured, is_page, canonical_url, created_at, updated_at)
VALUES (11, 1, TRUE, FALSE, 'https://kananek.top/writing/simplicity-in-distributed-systems', '2024-05-10 00:00:00+00', '2024-05-10 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
VALUES (11, 2), (11, 3) -- Architecture, Distributed Systems
ON CONFLICT (post_id, tag_id) DO NOTHING;

INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    11,
    11,
    'en',
    'simplicity-in-distributed-systems',
    'Simplicity in Distributed Systems',
    'Why reliable systems often come from boring guarantees, visible ownership, and clear recovery paths.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Distributed systems reward clear thinking. They punish hidden ownership, magical retries, unclear contracts, and data that means different things in different places."}]},{"type":"paragraph","content":[{"type":"text","text":"Simplicity does not mean the system is small. It means the system can still be understood when something fails."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Make Ownership Visible"}]},{"type":"paragraph","content":[{"type":"text","text":"Every event, API, table, topic, and retry policy needs an owner. Without ownership, complexity spreads quietly. When production fails, the first question becomes political instead of technical."}]},{"type":"paragraph","content":[{"type":"text","text":"Good architecture makes responsibility obvious before the incident starts."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Prefer Boring Guarantees"}]},{"type":"paragraph","content":[{"type":"text","text":"Idempotency keys, deduplication, timeouts, correlation IDs, and clear failure states are not glamorous. They are the trail markers of distributed systems."}]},{"type":"paragraph","content":[{"type":"text","text":"They help the team know where it is, what already happened, and which step is safe to take next."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Design For Recovery"}]},{"type":"paragraph","content":[{"type":"text","text":"Failure is not an exception in distributed systems. It is normal terrain. A system is simple when recovery is understandable: replay the event, rebuild the view, retry safely, compensate clearly."}]},{"type":"paragraph","content":[{"type":"text","text":"Every system teaches simplicity when we pay attention to where it breaks."}]}]}',
    '<p>Distributed systems reward clear thinking. They punish hidden ownership, magical retries, unclear contracts, and data that means different things in different places.</p><p>Simplicity does not mean the system is small. It means the system can still be understood when something fails.</p><h2>Make Ownership Visible</h2><p>Every event, API, table, topic, and retry policy needs an owner. Without ownership, complexity spreads quietly. When production fails, the first question becomes political instead of technical.</p><p>Good architecture makes responsibility obvious before the incident starts.</p><h2>Prefer Boring Guarantees</h2><p>Idempotency keys, deduplication, timeouts, correlation IDs, and clear failure states are not glamorous. They are the trail markers of distributed systems.</p><p>They help the team know where it is, what already happened, and which step is safe to take next.</p><h2>Design For Recovery</h2><p>Failure is not an exception in distributed systems. It is normal terrain. A system is simple when recovery is understandable: replay the event, rebuild the view, retry safely, compensate clearly.</p><p>Every system teaches simplicity when we pay attention to where it breaks.</p>',
    'PUBLISHED',
    '2024-05-10 00:00:00+00',
    '2024-05-10 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- 4. Post 12: My Journey Toward Kotlin Mastery
INSERT INTO posts (id, blog_id, is_featured, is_page, canonical_url, created_at, updated_at)
VALUES (12, 1, TRUE, FALSE, 'https://kananek.top/writing/my-journey-toward-kotlin-mastery', '2024-05-02 00:00:00+00', '2024-05-02 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
VALUES (12, 1), (12, 5) -- Kotlin, Learning
ON CONFLICT (post_id, tag_id) DO NOTHING;

INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    12,
    12,
    'en',
    'my-journey-toward-kotlin-mastery',
    'My Journey Toward Kotlin Mastery',
    'A personal training plan for becoming a deeper Kotlin engineer and Kotlin Master in Thailand.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Kotlin is more than a language I use at work. It is a craft path. The goal is not only to write Kotlin syntax well, but to design software that feels clear, safe, and expressive."}]},{"type":"paragraph","content":[{"type":"text","text":"My goal is to become a Kotlin Master in Thailand. That means depth, consistency, and contribution."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Mastery Needs A Training Plan"}]},{"type":"paragraph","content":[{"type":"text","text":"I want to keep improving across the full stack of Kotlin work: backend services, Spring, coroutines, testing, Kafka, architecture, and eventually multiplatform thinking."}]},{"type":"paragraph","content":[{"type":"text","text":"Like trail running, the improvement comes from repeated training blocks, not one heroic effort."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Kotlin Rewards Intentional Design"}]},{"type":"paragraph","content":[{"type":"text","text":"Null safety, sealed classes, data classes, extension functions, and coroutines all encourage better modeling. But tools do not create clarity by themselves."}]},{"type":"paragraph","content":[{"type":"text","text":"The real work is choosing names, boundaries, and flows that make the domain easier to understand."}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Teach To Learn"}]},{"type":"paragraph","content":[{"type":"text","text":"Teaching is part of the journey. If I can explain a concept simply, I understand it more deeply. If I cannot explain it, that is a signal to return to the trail and keep climbing."}]},{"type":"paragraph","content":[{"type":"text","text":"The Kotlin journey is another form of endurance: steady practice, honest feedback, and one deliberate step at a time."}]}]}',
    '<p>Kotlin is more than a language I use at work. It is a craft path. The goal is not only to write Kotlin syntax well, but to design software that feels clear, safe, and expressive.</p><p>My goal is to become a Kotlin Master in Thailand. That means depth, consistency, and contribution.</p><h2>Mastery Needs A Training Plan</h2><p>I want to keep improving across the full stack of Kotlin work: backend services, Spring, coroutines, testing, Kafka, architecture, and eventually multiplatform thinking.</p><p>Like trail running, the improvement comes from repeated training blocks, not one heroic effort.</p><h2>Kotlin Rewards Intentional Design</h2><p>Null safety, sealed classes, data classes, extension functions, and coroutines all encourage better modeling. But tools do not create clarity by themselves.</p><p>The real work is choosing names, boundaries, and flows that make the domain easier to understand.</p><h2>Teach To Learn</h2><p>Teaching is part of the journey. If I can explain a concept simply, I understand it more deeply. If I cannot explain it, that is a signal to return to the trail and keep climbing.</p><p>The Kotlin journey is another form of endurance: steady practice, honest feedback, and one deliberate step at a time.</p>',
    'PUBLISHED',
    '2024-05-02 00:00:00+00',
    '2024-05-02 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- 5. Post 13: Columbia Trail Master 2022 – ระยะ 50K
INSERT INTO posts (id, blog_id, is_featured, is_page, canonical_url, created_at, updated_at)
VALUES (13, 1, FALSE, FALSE, 'https://kananek.top/writing/journal-entry', '2022-08-10 00:00:00+00', '2022-08-10 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
VALUES (13, 4) -- Trail Running
ON CONFLICT (post_id, tag_id) DO NOTHING;

INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    13,
    13,
    'th',
    'journal-entry',
    'Columbia Trail Master 2022 – ระยะ 50K',
    'CTM 2022 - 50KM - My First Trail Running (DNF at KM 37 - Lesson in heat and pacing)',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Race Journal: CTM 2022 – 50K (DNF)"}]},{"type":"paragraph","content":[{"type":"text","text":"Race Overview"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"ชื่องาน:"},{"type":"text","text":" Columbia Trail Masters 2022 (CTM 2022) – Episode 1"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"วันแข่งขัน:"},{"type":"text","text":" 9 มกราคม 2565 (2022)"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"สถานที่:"},{"type":"text","text":" Wisdom Valley พัทยา จังหวัดชลบุรี"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"ระยะทาง:"},{"type":"text","text":" 50 กิโลเมตร (จบเส้นทางที่ระยะ 37 กิโลเมตร - DNF)"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"เวลาปล่อยตัว:"},{"type":"text","text":" 05:00 AM"}]}]}]},{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Key Takeaways"}]},{"type":"orderedList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"การพักผ่อนคือหัวใจสำคัญ:"},{"type":"text","text":" การนอนน้อยกว่า 4 ชั่วโมงมีผลโดยตรงต่อความอึดของร่างกายในสนามระยะอัลตร้า (50K)"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"การจัดการความร้อน:"},{"type":"text","text":" แดดเมืองพัทยาโหดกว่าที่คิด ต้องเตรียมแผนรับมือกับแดดจัดและการเติมเกลือแร่ที่ถี่ขึ้น"}]}]}]}]}',
    '<h3>Race Journal: CTM 2022 – 50K (DNF)</h3><h4>Race Overview</h4><ul><li><strong>ชื่องาน:</strong> Columbia Trail Masters 2022 (CTM 2022) – Episode 1</li><li><strong>วันแข่งขัน:</strong> 9 มกราคม 2565 (2022)</li><li><strong>สถานที่:</strong> Wisdom Valley พัทยา จังหวัดชลบุรี</li><li><strong>ระยะทาง:</strong> 50 กิโลเมตร (จบเส้นทางที่ระยะ 37 กิโลเมตร - DNF)</li><li><strong>เวลาปล่อยตัว:</strong> 05:00 AM</li></ul><hr/><h4>Pre-Race Status & Gear</h4><ul><li><strong>การนอนหลับ:</strong> นอนน้อยมากเพียง <strong>3-4 ชั่วโมง</strong> เนื่องจากอาการตื่นเต้นก่อนแข่ง</li><li><strong>Gear:</strong> Hoka Speedgoat 4, T8 Running Shorts</li></ul><hr/><h4>บันทึกการแข่งขัน (Race Note)</h4><ul><li><strong>ลักษณะเส้นทาง:</strong> เป็นเส้นทางธรรมชาติ มีความหลากหลายสูง สลับระหว่างเนินเขา ดินลูกรัง และมีช่วงที่เป็นพื้นทราย ซึ่งค่อนข้างดูดพลังขา</li><li><strong>สภาพอากาศ:</strong> แดดแรงและร้อนจัดตลอดทั้งวัน สภาพภูมิประเทศส่วนใหญ่เปิดโล่ง ไม่มีต้นไม้ใหญ่คอยบังแดด</li></ul><hr/><h4>Result (The DNF Moment)</h4><ul><li><strong>ระยะทางที่ยุติการวิ่ง:</strong> <strong>กิโลเมตรที่ 37</strong></li><li><strong>Reflections:</strong> ร้อน ล้า แดด ใจไม่ถึง</li></ul><hr/><h4>Key Takeaways</h4><ol><li><strong>การพักผ่อนคือหัวใจสำคัญ:</strong> การนอนน้อยกว่า 4 ชั่วโมงมีผลโดยตรงต่อความอึดของร่างกายในสนามระยะอัลตร้า (50K) สนามหน้าต้องบังคับตัวเองให้นอนหลับให้สนิทและเต็มอิ่มกว่านี้</li><li><strong>การจัดการความร้อน:</strong> แดดเมืองพัทยาโหดกว่าที่คิด ครั้งต่อไปต้องเตรียมแผนรับมือกับแดดจัด เช่น การเติมเกลือแร่ที่ถี่ขึ้น การพกหมวก/ผ้าบัฟชุบน้ำ และการคุมเพซไม่ให้หัวใจพุ่งสูงเกินไปในช่วงที่แดดเริ่มแรง</li></ol>',
    'PUBLISHED',
    '2022-08-10 00:00:00+00',
    '2022-08-10 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- 6. Post 14: Kao Pratubchang Trail 2022 (KPT2022)
INSERT INTO posts (id, blog_id, is_featured, is_page, canonical_url, created_at, updated_at)
VALUES (14, 1, FALSE, FALSE, 'https://kananek.top/writing/journal-entry-1', '2022-08-10 00:00:00+00', '2022-08-10 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
VALUES (14, 4) -- Trail Running
ON CONFLICT (post_id, tag_id) DO NOTHING;

INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    14,
    14,
    'th',
    'journal-entry-1',
    'KPT2022',
    'Kao Pratubchang Trail 2022 - 25K',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Kao Pratubchang Trail 2022 - 25K"}]},{"type":"paragraph","content":[{"type":"text","text":"บันทึกเส้นทางเทรลเขาประทับช้าง จังหวัดราชบุรี เส้นทางดินลูกรัง เนินดิน ป่าไผ่ และความชันที่ท้าทายความอดทนของกล้ามเนื้อ"}]}]}',
    '<h3>Kao Pratubchang Trail 2022 - 25K</h3><p>บันทึกเส้นทางเทรลเขาประทับช้าง จังหวัดราชบุรี เส้นทางดินลูกรัง เนินดิน ป่าไผ่ และความชันที่ท้าทายความอดทนของกล้ามเนื้อ</p>',
    'PUBLISHED',
    '2022-08-10 00:00:00+00',
    '2022-08-10 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- 7. Post 15: Doi Inthanon by UTMB 2022
INSERT INTO posts (id, blog_id, is_featured, is_page, canonical_url, created_at, updated_at)
VALUES (15, 1, FALSE, FALSE, 'https://kananek.top/writing/journal-entry-2', '2022-12-11 00:00:00+00', '2022-12-11 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
VALUES (15, 4) -- Trail Running
ON CONFLICT (post_id, tag_id) DO NOTHING;

INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    15,
    15,
    'en',
    'journal-entry-2',
    'Doi Inthanon by UTMB 2022',
    'Doi Inthanon by UTMB 2022 - TERRACE20 (23.9 KM, 1070M+ elevation gain)',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Doi Inthanon by UTMB 2022 - TERRACE20"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Date:"},{"type":"text","text":" 11th December 2022"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Race Category:"},{"type":"text","text":" 20K"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Distance:"},{"type":"text","text":" 23.9 KM"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","marks":[{"type":"bold"}],"text":"Elevation Gain:"},{"type":"text","text":" 1070 M+"}]}]}]}]}',
    '<h3>Doi Inthanon by UTMB 2022 - TERRACE20</h3><ul><li><strong>Date:</strong> 11th December 2022</li><li><strong>Race Category:</strong> 20K</li><li><strong>Distance:</strong> 23.9 KM</li><li><strong>Elevation Gain:</strong> 1070 M+</li></ul><p>Race recap from the iconic peaks of Doi Inthanon National Park, Chiang Mai, Thailand.</p>',
    'PUBLISHED',
    '2022-12-11 00:00:00+00',
    '2022-12-11 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- 8. Also add semantic slug variants for trail posts so both old journal-entry-X and human-readable slugs work
INSERT INTO posts (id, blog_id, is_featured, is_page, canonical_url, created_at, updated_at)
VALUES (16, 1, FALSE, FALSE, 'https://kananek.top/writing/columbia-trail-master-2022-50k', '2022-08-10 00:00:00+00', '2022-08-10 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id)
VALUES (16, 4)
ON CONFLICT (post_id, tag_id) DO NOTHING;

INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    16,
    16,
    'th',
    'columbia-trail-master-2022-50k',
    'Columbia Trail Master 2022 – ระยะ 50K',
    'CTM 2022 - 50KM - My First Trail Running (DNF at KM 37 - Lesson in heat and pacing)',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":3},"content":[{"type":"text","text":"Race Journal: CTM 2022 – 50K (DNF)"}]},{"type":"paragraph","content":[{"type":"text","text":"Race Overview"}]}]}',
    '<h3>Race Journal: CTM 2022 – 50K (DNF)</h3><h4>Race Overview</h4><ul><li><strong>ชื่องาน:</strong> Columbia Trail Masters 2022 (CTM 2022) – Episode 1</li><li><strong>วันแข่งขัน:</strong> 9 มกราคม 2565 (2022)</li><li><strong>สถานที่:</strong> Wisdom Valley พัทยา จังหวัดชลบุรี</li><li><strong>ระยะทาง:</strong> 50 กิโลเมตร (จบเส้นทางที่ระยะ 37 กิโลเมตร - DNF)</li><li><strong>เวลาปล่อยตัว:</strong> 05:00 AM</li></ul><hr/><h4>Key Takeaways</h4><ol><li><strong>การพักผ่อนคือหัวใจสำคัญ:</strong> การนอนน้อยกว่า 4 ชั่วโมงมีผลโดยตรงต่อความอึดของร่างกายในสนามระยะอัลตร้า (50K)</li><li><strong>การจัดการความร้อน:</strong> แดดเมืองพัทยาโหดกว่าที่คิด ครั้งต่อไปต้องเตรียมแผนรับมือกับแดดจัด</li></ol>',
    'PUBLISHED',
    '2022-08-10 00:00:00+00',
    '2022-08-10 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Update sequences
SELECT setval('tags_id_seq', (SELECT GREATEST(MAX(id), 10) FROM tags));
SELECT setval('posts_id_seq', (SELECT GREATEST(MAX(id), 20) FROM posts));
SELECT setval('post_variants_id_seq', (SELECT GREATEST(MAX(id), 20) FROM post_variants));
