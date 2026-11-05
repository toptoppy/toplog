-- V11: Seed technical notes and projects from Obsidian (docs-v2) into TopLog
-- Total imported notes: 50

-- 1. Insert Tags
INSERT INTO tags (id, blog_id, name, slug) VALUES (10, 1, 'AI', 'ai') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (11, 1, 'Developer Tools', 'tools') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (12, 1, 'Infrastructure', 'infrastructure') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (13, 1, 'Projects', 'projects') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (14, 1, 'CloudEvents', 'cloudevents') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (15, 1, 'Kafka', 'kafka') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (16, 1, 'Docker', 'docker') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (17, 1, 'Kubernetes', 'kubernetes') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (18, 1, 'Ubuntu', 'ubuntu') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (19, 1, 'Git', 'git') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (20, 1, 'Neovim', 'neovim') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (21, 1, 'Vim', 'vim') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (22, 1, 'Zsh', 'zsh') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (23, 1, 'macOS', 'macos') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (24, 1, 'Ktor', 'ktor') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (25, 1, 'MCP', 'mcp') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (26, 1, 'Raycast', 'raycast') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (27, 1, 'Linux', 'linux') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (28, 1, 'Ai-agent', 'ai-agent') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (29, 1, 'Hermes', 'hermes') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (30, 1, 'Knowledgework', 'knowledgework') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (31, 1, 'Event-driven-architecture', 'event-driven-architecture') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (32, 1, 'Thai', 'thai') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (33, 1, 'Devops', 'devops') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (34, 1, 'Sre', 'sre') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (35, 1, 'Performance', 'performance') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (36, 1, 'Windows', 'windows') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (37, 1, 'Network', 'network') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (38, 1, 'Java', 'java') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (39, 1, 'Maven', 'maven') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (40, 1, 'Dependency-management', 'dependency-management') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (41, 1, 'Cheatsheet', 'cheatsheet') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (42, 1, 'Dev-workflow', 'dev-workflow') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (43, 1, 'Engineering-practices', 'engineering-practices') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (44, 1, 'Terminal', 'terminal') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (45, 1, 'Ghostty', 'ghostty') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (46, 1, 'Iterm2', 'iterm2') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (47, 1, 'Readline', 'readline') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (48, 1, 'Productivity', 'productivity') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (49, 1, 'Dev-environment', 'dev-environment') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (50, 1, 'Editor', 'editor') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (51, 1, 'Opencode', 'opencode') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (52, 1, 'Mise', 'mise') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (53, 1, '1password', '1password') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (54, 1, 'Atlassian', 'atlassian') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (55, 1, 'Security', 'security') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (56, 1, 'Index', 'index') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (57, 1, 'Shell', 'shell') ON CONFLICT (id) DO NOTHING;
INSERT INTO tags (id, blog_id, name, slug) VALUES (58, 1, 'Setup', 'setup') ON CONFLICT (id) DO NOTHING;

-- Post 30: AI Coding ขาด Feedforward Layer
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (30, 1, TRUE, FALSE, '2026-06-08 00:00:00+00', '2026-06-08 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (30, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    30, 30, 'th', 'ai-coding-feedforward-layer', 'AI Coding ขาด Feedforward Layer', 'ทุกคนพูดถึง tests, review และ feedback กันมาก ประเด็นเหล่านี้สำคัญ แต่ยังไม่ใช่ภาพทั้งหมด ช่องว่างจริงของ AI-native development อยู่ก่อนหน้านั้นอีกขั้น: feedforward',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ทุกคนพูดถึง tests, review และ feedback กันมาก ประเด็นเหล่านี้สำคัญ แต่ยังไม่ใช่ภาพทั้งหมด ช่องว่างจริงของ AI-native development อยู่ก่อนหน้านั้นอีกขั้น: feedforward"}]}]}', '<h1>AI Coding ขาด Feedforward Layer</h1>
<p>ทุกคนพูดถึง tests, review และ feedback กันมาก
ประเด็นเหล่านี้สำคัญ แต่ยังไม่ใช่ภาพทั้งหมด
ช่องว่างจริงของ AI-native development อยู่ก่อนหน้านั้นอีกขั้น: <strong>feedforward</strong></p>
<h2>ทำไม README.md อย่างเดียวไม่พอ</h2>
<p><code>README.md</code> ถูกออกแบบมาสำหรับมนุษย์
มันบอกว่า repository นี้คืออะไร รันอย่างไร และมีวิธี contribute แบบไหน
สิ่งนี้ใช้ได้ดีเมื่อ developer สามารถถามคำถาม อ่านบริบท และเติมช่องว่างด้วยตัวเอง
แต่ AI agent ทำแบบนั้นได้ไม่ดีเท่ามนุษย์
มันเห็นแค่ code และ context ที่เราให้
ถ้า context ไม่ชัด output ก็จะไม่ชัดตาม</p>
<h2>ชั้นที่หายไป</h2>
<p>คุณภาพของ AI coding ถูกกำหนดโดย 2 loop</p>
<ul>
<li><strong>Feedforward</strong>: สิ่งที่บอก AI ก่อนเริ่มเขียนโค้ด</li>
<li><strong>Feedback</strong>: สิ่งที่บอก AI หลังเขียนโค้ดเสร็จ</li>
</ul>
<p>หลายทีมเก่งเรื่อง feedback อยู่แล้ว</p>
<ul>
<li>Unit tests</li>
<li>Integration tests</li>
<li>E2E tests</li>
<li>Linting</li>
<li>Static analysis</li>
<li>Security scans</li>
</ul>
<p>แต่หลายทีมยังอ่อนเรื่อง feedforward
และตรงนั้นคือจุดที่โมเดลเริ่มเดา</p>
<h2>อะไรควรอยู่ใน feedforward</h2>
<p>Feedforward ไม่ใช่เอกสารสรุปโปรเจกต์แบบทั่วไป
แต่มันคือ behavioral contract สำหรับ agent
ควรมี:</p>
<ul>
<li>Agent rules</li>
<li>Coding standards</li>
<li>Architecture principles</li>
<li>Business constraints</li>
<li>Domain knowledge</li>
<li><code>SKILL.md</code></li>
</ul>
<p>นี่คือส่วนที่ senior engineer มักเก็บไว้ในหัว
แต่ AI ไม่มี
ถ้ามันสำคัญ ต้องเขียนไว้</p>
<h2>ทำไม SKILL.md สำคัญ</h2>
<p><code>README.md</code> บอกว่าโปรเจกต์นี้คืออะไร
<code>SKILL.md</code> บอกว่า agent ควร behave อย่างไรภายในโปรเจกต์นั้น
ตัวอย่างเช่นระบบ payment อาจต้องมี rule แบบนี้:</p>
<ul>
<li>รองรับ refund</li>
<li>ห้ามเรียก payment gateway โดยตรง</li>
<li>ต้องผ่าน <code>PaymentService</code> เสมอ</li>
<li>ทุก transaction ต้องมี audit log</li>
<li>ต้อง enforce idempotency</li>
</ul>
<p>นี่ไม่ใช่เอกสารประกอบที่เขียนสวย ๆ
แต่มันคือ operational knowledge
และเป็น knowledge ที่ AI agent ต้องรู้ก่อนเริ่ม generate code</p>
<h2>มุมมองที่ดีกว่า</h2>
<p>ให้มอง AI-native development แบบนี้:</p>
<ul>
<li>มนุษย์ต้องการ repository ที่เข้าใจเร็ว</li>
<li>Agent ต้องการ repository ที่ลงมือทำได้อย่างปลอดภัย</li>
<li>Tests ใช้จับข้อผิดพลาด</li>
<li>Rules ใช้ป้องกันไม่ให้เกิดข้อผิดพลาดตั้งแต่ต้น</li>
</ul>
<p>นี่คือจุดเปลี่ยน
ทีมที่ชนะจะไม่ใช่แค่มี model ที่เก่งกว่า
แต่จะมี feedforward ที่ดีกว่า</p>
<h2>อนาคตของ repository</h2>
<p>repository สมัยใหม่จะมีองค์ประกอบเหล่านี้มากขึ้น:</p>
<ul>
<li><code>README.md</code></li>
<li><code>CONTRIBUTING.md</code></li>
<li><code>ARCHITECTURE.md</code></li>
<li><code>SKILL.md</code></li>
<li><code>AGENTS.md</code></li>
</ul>
<p>เพราะ repository ไม่ได้เป็นแค่ knowledge base สำหรับมนุษย์อีกต่อไป
แต่มันเป็น control surface สำหรับมนุษย์และ AI ที่ทำงานร่วมกัน</p>
<h2>บทสรุป</h2>
<p>คำถามไม่ใช่แค่ว่า &quot;AI เขียนโค้ดได้ไหม&quot;
คำถามที่ดีกว่าคือ:
<strong>เราให้ structure กับ AI มากพอหรือยัง เพื่อให้มันเขียนโค้ดที่ถูกต้องตั้งแต่ครั้งแรก</strong></p>
', 'PUBLISHED', '2026-06-08 00:00:00+00', '2026-06-08 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 31: AI Coding Is Missing a Feedforward Layer
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (31, 1, TRUE, FALSE, '2026-06-08 00:00:00+00', '2026-06-08 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (31, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    31, 31, 'en', 'ai-coding-is-missing-a-feedforward-layer', 'AI Coding Is Missing a Feedforward Layer', 'Everyone talks about tests, review, and feedback. That matters. But it is not the whole story. The real gap in AI-native development is earlier in the loop: feedforward.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Everyone talks about tests, review, and feedback. That matters. But it is not the whole story. The real gap in AI-native development is earlier in the loop: feedforward."}]}]}', '<h1>AI Coding Is Missing a Feedforward Layer</h1>
<p>Everyone talks about tests, review, and feedback.
That matters. But it is not the whole story.
The real gap in AI-native development is earlier in the loop: <strong>feedforward</strong>.</p>
<h2>Why README.md is no longer enough</h2>
<p><code>README.md</code> was designed for humans.
It explains what the repository is, how to run it, and how to contribute.
That works when a developer can ask questions, infer intent, and fill in the gaps.
An AI agent cannot do that reliably.
It only sees the code and the context we give it.
If the context is vague, the output will be vague too.</p>
<h2>The missing layer</h2>
<p>AI coding quality is shaped by two loops:</p>
<ul>
<li><strong>Feedforward</strong>: what we tell the AI before it writes code</li>
<li><strong>Feedback</strong>: what we tell the AI after it writes code</li>
</ul>
<p>Most teams are already strong at feedback.</p>
<ul>
<li>Unit tests</li>
<li>Integration tests</li>
<li>E2E tests</li>
<li>Linting</li>
<li>Static analysis</li>
<li>Security scans</li>
</ul>
<p>But many teams are still weak at feedforward.
That is where the model starts guessing.</p>
<h2>What belongs in feedforward</h2>
<p>Feedforward is not a generic project overview.
It is the behavioral contract for the agent.
It should include:</p>
<ul>
<li>Agent rules</li>
<li>Coding standards</li>
<li>Architecture principles</li>
<li>Business constraints</li>
<li>Domain knowledge</li>
<li><code>SKILL.md</code></li>
</ul>
<p>This is the part senior engineers often carry in their heads.
AI does not.
So if it matters, write it down.</p>
<h2>Why SKILL.md matters</h2>
<p><code>README.md</code> says what the project is.
<code>SKILL.md</code> says how the agent should behave inside it.
For a payment system, that may mean rules like:</p>
<ul>
<li>Support refunds</li>
<li>Never call the payment gateway directly</li>
<li>Always go through <code>PaymentService</code></li>
<li>Write an audit log for every transaction</li>
<li>Enforce idempotency</li>
</ul>
<p>That is not documentation fluff.
That is operational knowledge.
And it is exactly the kind of knowledge an AI agent needs before it starts generating code.</p>
<h2>A better mental model</h2>
<p>Think of AI-native development this way:</p>
<ul>
<li>Humans need a repository they can understand quickly</li>
<li>Agents need a repository they can act on safely</li>
<li>Tests catch mistakes</li>
<li>Rules prevent many mistakes from happening in the first place</li>
</ul>
<p>That is the shift.
The winning team will not just have a better model.
It will have better feedforward.</p>
<h2>The future repository</h2>
<p>A modern repository will increasingly include:</p>
<ul>
<li><code>README.md</code></li>
<li><code>CONTRIBUTING.md</code></li>
<li><code>ARCHITECTURE.md</code></li>
<li><code>SKILL.md</code></li>
<li><code>AGENTS.md</code></li>
</ul>
<p>Because the repository is no longer just a knowledge base for humans.
It is a control surface for humans and AI working together.</p>
<h2>Closing thought</h2>
<p>The question is no longer, &quot;Can AI write code?&quot;
The better question is:
<strong>Did we give the AI enough structure to write the right code on the first attempt?</strong></p>
', 'PUBLISHED', '2026-06-08 00:00:00+00', '2026-06-08 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 32: AI -xxx
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (32, 1, FALSE, FALSE, '2026-06-20 00:00:00+00', '2026-06-20 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (32, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    32, 32, 'en', 'ai-xxx', 'AI -xxx', 'Technical notes and documentation from knowledge vault.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical notes and documentation from knowledge vault."}]}]}', '<p>image_1781922465624_0</p>
<p>image_1781922838158_0</p>
<p>image_1781922904792_0
image_1781922929506_0
image_1781922952719_0
image_1781923002778_0</p>
<p>artifical interigen
artifical nural network</p>
<p><a href="https://teachablemachine.withgoogle.com/train/image">https://teachablemachine.withgoogle.com/train/image</a> - example</p>
<p>the change call &quot;Foundation Models&quot;</p>
<p>image_1781924064065_0
image_1781924212394_0
image_1781924275412_0
image_1781924364864_0
LLMs</p>
<ul>
<li>Model size and parameters</li>
<li>Large Language Model</li>
<li>Transformer model</li>
</ul>
<p>Model plus fine-tuning leads to inference.
DPO
Set weight, tune, and adjust weight.</p>
', 'PUBLISHED', '2026-06-20 00:00:00+00', '2026-06-20 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 33: Hermes WebUI Docker Setup on VPS TH
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (33, 1, FALSE, FALSE, '2026-06-25 00:00:00+00', '2026-06-25 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (33, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (33, 27) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (33, 28) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (33, 29) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (33, 16) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    33, 33, 'th', 'hermes-webui-docker-setup-on-vps-th', 'Hermes WebUI Docker Setup on VPS TH', 'อัปเดตเอกสาร: 2026-06-25 แหล่งอ้างอิง:',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"อัปเดตเอกสาร: 2026-06-25 แหล่งอ้างอิง:"}]}]}', '<h1>Hermes WebUI Docker Setup on VPS / วิธีติดตั้ง Hermes WebUI ด้วย Docker บน VPS</h1>
<p>อัปเดตเอกสาร: 2026-06-25
แหล่งอ้างอิง:</p>
<ul>
<li>Hermes WebUI: <a href="https://get-hermes.ai/">https://get-hermes.ai/</a></li>
<li>GitHub repo: <a href="https://github.com/nesquena/hermes-webui">https://github.com/nesquena/hermes-webui</a></li>
<li>Docker docs: <a href="https://github.com/nesquena/hermes-webui/blob/master/docs/docker.md">https://github.com/nesquena/hermes-webui/blob/master/docs/docker.md</a></li>
<li>Single-container compose: <a href="https://github.com/nesquena/hermes-webui/blob/master/docker-compose.yml">https://github.com/nesquena/hermes-webui/blob/master/docker-compose.yml</a></li>
<li>Two-container compose: <a href="https://github.com/nesquena/hermes-webui/blob/master/docker-compose.two-container.yml">https://github.com/nesquena/hermes-webui/blob/master/docker-compose.two-container.yml</a></li>
</ul>
<hr />
<h2>สรุปคำแนะนำสำหรับ VPS ของคุณ</h2>
<p>แนะนำใช้ <strong>Docker Compose แบบ two-container</strong> เป็นค่าเริ่มต้นสำหรับ VPS:</p>
<ul>
<li><code>hermes-agent</code> container: รัน Hermes gateway ตลอดเวลา</li>
<li><code>hermes-webui</code> container: รันหน้าเว็บแชต</li>
<li>ใช้ Docker named volumes สำหรับ <code>hermes-home</code> และ agent source เพื่อลดปัญหา permission</li>
<li>เปิด WebUI เฉพาะ <code>127.0.0.1:8787</code> แล้วเข้าผ่าน SSH tunnel</li>
<li>ไม่เปิด port <code>8787</code> ออก public โดยตรง</li>
</ul>
<h2>ใช้ single-container เฉพาะกรณีอยากลองเร็ว ๆ หรือไม่ใช้ scheduled jobs/gateway แบบจริงจัง</h2>
<h2>ภาพรวม Architecture</h2>
<pre><code>เครื่องเรา
  -&gt; browser: http://localhost:8787
  -&gt; SSH tunnel
  -&gt; VPS 127.0.0.1:8787
  -&gt; hermes-webui container
  -&gt; hermes-agent container: http://hermes-agent:8642
  -&gt; Docker volume: hermes-home
  -&gt; LLM provider API

</code></pre>
<hr />
<h2>0. เงื่อนไขก่อนเริ่ม</h2>
<p>ควรทำ server hardening จากเอกสาร <code>New Ubuntu Server Setup Checklist</code> ก่อน:</p>
<ul>
<li>มี user ปกติที่ sudo ได้ เช่น <code>toppy</code></li>
<li>SSH key login ใช้งานได้</li>
<li>ปิด root SSH login แล้ว</li>
<li>ปิด password SSH login แล้ว</li>
<li>เปิด UFW แล้ว</li>
<li>เปิดเฉพาะ port ที่จำเป็น เช่น <code>OpenSSH</code>, <code>80</code>, <code>443</code></li>
<li>ยังไม่ต้องเปิด <code>8787/tcp</code> public</li>
</ul>
<hr />
<h2>1. ติดตั้ง Docker Engine และ Compose Plugin</h2>
<p>รันบน VPS ด้วย user <code>toppy</code></p>
<pre><code>sudo apt update
sudo apt install -y ca-certificates curl gnupg git jq htop

sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo &quot;deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release &amp;&amp; echo $VERSION_CODENAME) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null

sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

</code></pre>
<p>เพิ่ม user เข้า docker group:</p>
<pre><code>sudo usermod -aG docker toppy

</code></pre>
<p>ออกจาก SSH แล้ว login ใหม่ เพื่อให้ group มีผล:</p>
<pre><code>exit
ssh toppy@SERVER_IP

</code></pre>
<p>ตรวจสอบ:</p>
<pre><code>docker --version
docker compose version
docker run --rm hello-world

</code></pre>
<h2>ถ้า <code>docker run hello-world</code> ผ่าน แปลว่า Docker พร้อมใช้งาน</h2>
<h2>2. เตรียม directory สำหรับ workspace</h2>
<pre><code>mkdir -p ~/workspace
mkdir -p ~/apps
cd ~/apps

</code></pre>
<h2><code>~/workspace</code> คือ directory ที่ Hermes WebUI จะเห็นเป็น <code>/workspace</code> ใน container
ถ้าต้องการให้ Hermes เข้าถึง project อื่น เช่น <code>/opt/apps</code> หรือ <code>/home/toppy/projects</code> ให้เปลี่ยน <code>HERMES\_WORKSPACE</code> ใน <code>.env</code> ภายหลัง</h2>
<h2>3. Clone Hermes WebUI repo</h2>
<pre><code>cd ~/apps
git clone https://github.com/nesquena/hermes-webui.git
cd ~/apps/hermes-webui

</code></pre>
<p>สร้างไฟล์ <code>.env</code>:</p>
<pre><code>cp .env.docker.example .env

</code></pre>
<p>แก้ไฟล์ <code>.env</code>:</p>
<pre><code>vim .env

</code></pre>
<p>ตั้งค่าพื้นฐาน:</p>
<pre><code>UID=1000
GID=1000
HERMES_WORKSPACE=/home/toppy/workspace

</code></pre>
<p>ถ้าไม่แน่ใจ UID/GID ให้ดูด้วย:</p>
<pre><code>id -u
id -g

</code></pre>
<h2>แล้วใส่ค่าจริงใน <code>.env</code></h2>
<h2>4. วิธีแนะนำ: Two-container Docker Compose</h2>
<p>เหมาะกับ VPS เพราะมี gateway container แยก ทำให้ scheduled jobs และ gateway status ทำงานดีกว่า single-container
เริ่ม service:</p>
<pre><code>cd ~/apps/hermes-webui
docker compose -f docker-compose.two-container.yml up -d

</code></pre>
<p>ตรวจ container:</p>
<pre><code>docker compose -f docker-compose.two-container.yml ps

</code></pre>
<p>ดู logs:</p>
<pre><code>docker compose -f docker-compose.two-container.yml logs -f --tail=100

</code></pre>
<p>ตรวจ health จาก VPS:</p>
<pre><code>curl -fsS http://127.0.0.1:8787/health
curl -fsS http://127.0.0.1:8642/health

</code></pre>
<p>Port ที่ใช้:</p>
<ul>
<li><code>127.0.0.1:8787</code> = Hermes WebUI</li>
<li><code>127.0.0.1:8642</code> = Hermes Agent gateway API</li>
</ul>
<h2>สำคัญ: ทั้งสอง port ควร bind เฉพาะ localhost บน VPS</h2>
<h2>5. เข้าใช้งาน WebUI ผ่าน SSH tunnel</h2>
<p>รันบนเครื่อง local ของคุณ ไม่ใช่บน VPS:</p>
<pre><code>ssh -N -L 8787:127.0.0.1:8787 toppy@SERVER_IP

</code></pre>
<p>เปิด browser บนเครื่อง local:</p>
<pre><code>http://localhost:8787

</code></pre>
<p>ถ้า port local ชนกับ service อื่น ใช้ port local อื่นได้ เช่น:</p>
<pre><code>ssh -N -L 18787:127.0.0.1:8787 toppy@SERVER_IP

</code></pre>
<p>แล้วเปิด:</p>
<pre><code>http://localhost:18787

</code></pre>
<hr />
<h2>6. ตั้งค่า Hermes model / API key</h2>
<p>หลัง WebUI เปิดได้ ให้เข้าไปตั้งค่า model provider ใน UI หรือเข้า container เพื่อรัน Hermes CLI
เข้า container agent:</p>
<pre><code>cd ~/apps/hermes-webui
docker compose -f docker-compose.two-container.yml exec hermes-agent bash

</code></pre>
<p>ลองดูคำสั่ง Hermes:</p>
<pre><code>hermes --help
hermes model
hermes doctor

</code></pre>
<p>ออกจาก container:</p>
<pre><code>exit

</code></pre>
<p>หมายเหตุ:</p>
<ul>
<li>เตรียม API key ของ provider ที่จะใช้ เช่น OpenAI, Anthropic, Gemini, OpenRouter, DeepSeek หรือ Nous Portal</li>
<li>ถ้า configure ผ่าน CLI แล้วข้อมูลจะอยู่ใน Docker volume <code>hermes-home</code></li>
<li>อย่าใส่ API key ลง git</li>
</ul>
<hr />
<h2>7. ตั้ง password ถ้าจะเปิดผ่าน public domain</h2>
<p>ถ้าใช้ SSH tunnel เท่านั้น ยังไม่จำเป็นต้องตั้ง password แต่ตั้งไว้ก็ไม่เสียหาย
แก้ไฟล์ compose หรือ <code>.env</code> แล้วเพิ่ม:</p>
<pre><code>HERMES_WEBUI_PASSWORD=CHANGE_ME_LONG_RANDOM_PASSWORD

</code></pre>
<p>ถ้า compose file ยังไม่ได้อ่าน variable นี้จาก <code>.env</code> ให้เพิ่มใน service <code>hermes-webui</code> ตรง <code>environment</code>:</p>
<pre><code>- HERMES_WEBUI_PASSWORD=${HERMES_WEBUI_PASSWORD}

</code></pre>
<p>restart:</p>
<pre><code>cd ~/apps/hermes-webui
docker compose -f docker-compose.two-container.yml up -d

</code></pre>
<p>คำแนะนำ:</p>
<ul>
<li>ถ้า expose public ต้องมี password</li>
<li>ใช้ password ยาว ๆ อย่างน้อย 24-32 ตัวอักษร</li>
<li>ใช้ HTTPS ผ่าน Nginx/Certbot</li>
<li>ห้ามเปิด public โดยไม่มี authentication</li>
</ul>
<hr />
<h2>8. Firewall ที่ควรใช้</h2>
<p>ถ้าใช้ SSH tunnel เท่านั้น:</p>
<pre><code>sudo ufw allow OpenSSH
sudo ufw deny 8787/tcp
sudo ufw deny 8642/tcp
sudo ufw status verbose

</code></pre>
<p>ตรวจว่า Docker bind แค่ localhost:</p>
<pre><code>sudo ss -tulpn | grep -E ''8787|8642''

</code></pre>
<p>ควรเห็นประมาณนี้:</p>
<pre><code>127.0.0.1:8787
127.0.0.1:8642

</code></pre>
<p>ไม่ควรเห็น:</p>
<pre><code>0.0.0.0:8787
0.0.0.0:8642

</code></pre>
<hr />
<h2>9. Optional: เปิดผ่าน domain ด้วย Nginx + HTTPS</h2>
<p>ทำเฉพาะถ้าคุณไม่อยากใช้ SSH tunnel หรือ Tailscale
ติดตั้ง Nginx และ Certbot:</p>
<pre><code>sudo apt install -y nginx certbot python3-certbot-nginx

</code></pre>
<p>สร้าง config:</p>
<pre><code>sudo vim /etc/nginx/sites-available/hermes.example.com

</code></pre>
<p>ตัวอย่าง:</p>
<pre><code>server {
    listen 80;
    server_name hermes.example.com;

    location / {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }
}

</code></pre>
<p>เปิด site:</p>
<pre><code>sudo ln -s /etc/nginx/sites-available/hermes.example.com /etc/nginx/sites-enabled/hermes.example.com
sudo nginx -t
sudo systemctl reload nginx

</code></pre>
<p>ออก certificate:</p>
<pre><code>sudo certbot --nginx -d hermes.example.com
sudo certbot renew --dry-run

</code></pre>
<p>เปิด firewall สำหรับ web:</p>
<pre><code>sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status verbose

</code></pre>
<h2>อย่าลืมตั้ง <code>HERMES\_WEBUI\_PASSWORD</code></h2>
<h2>10. Quick start แบบ Single-container</h2>
<p>เหมาะกับการลองเร็ว ๆ หรือ setup ส่วนตัวที่ไม่ต้องพึ่ง scheduled jobs/gateway มาก</p>
<pre><code>cd ~/apps/hermes-webui
cp .env.docker.example .env
vim .env
docker compose up -d

</code></pre>
<p>เปิดผ่าน SSH tunnel เหมือนเดิม:</p>
<pre><code>ssh -N -L 8787:127.0.0.1:8787 toppy@SERVER_IP

</code></pre>
<p>เปิด browser:</p>
<pre><code>http://localhost:8787

</code></pre>
<p>ข้อดี:</p>
<ul>
<li>ง่ายสุด</li>
<li>permission issue น้อยกว่าในบางกรณี</li>
<li>เหมาะกับเริ่มทดลอง</li>
</ul>
<p>ข้อจำกัด:</p>
<ul>
<li>ถ้าใช้ scheduled jobs แบบให้ทำงานเองตอนเราไม่เปิด UI อาจต้องมี gateway daemon แยก</li>
<li>ถ้า System Settings ขึ้น <code>Gateway not configured</code> ให้เปลี่ยนไปใช้ two-container</li>
</ul>
<hr />
<h2>11. คำสั่งดูแลระบบประจำวัน</h2>
<p>ดู container:</p>
<pre><code>cd ~/apps/hermes-webui
docker compose -f docker-compose.two-container.yml ps

</code></pre>
<p>ดู logs:</p>
<pre><code>docker compose -f docker-compose.two-container.yml logs -f --tail=100

</code></pre>
<p>restart:</p>
<pre><code>docker compose -f docker-compose.two-container.yml restart

</code></pre>
<p>stop:</p>
<pre><code>docker compose -f docker-compose.two-container.yml stop

</code></pre>
<p>start:</p>
<pre><code>docker compose -f docker-compose.two-container.yml start

</code></pre>
<p>ปิดและลบ container แต่เก็บ volume ไว้:</p>
<pre><code>docker compose -f docker-compose.two-container.yml down

</code></pre>
<h2>ห้ามลบ volume ถ้ายังไม่ได้ backup เพราะ state/config/memory อยู่ใน volume</h2>
<h2>12. วิธีอัปเดต Docker image</h2>
<pre><code>cd ~/apps/hermes-webui
docker compose -f docker-compose.two-container.yml down
docker compose -f docker-compose.two-container.yml pull
docker compose -f docker-compose.two-container.yml up -d

</code></pre>
<p>ถ้าอัปเดต agent image แล้ว agent source volume ยังเก่า อาจต้องลบ volume <code>hermes-agent-src</code>
ดูชื่อ volume จริง:</p>
<pre><code>docker volume ls | grep hermes-agent-src

</code></pre>
<p>ขั้นตอนอัปเดตแบบ refresh agent source:</p>
<pre><code>cd ~/apps/hermes-webui
docker compose -f docker-compose.two-container.yml down
docker volume ls | grep hermes-agent-src
docker volume rm hermes-webui_hermes-agent-src
docker compose -f docker-compose.two-container.yml pull
docker compose -f docker-compose.two-container.yml up -d

</code></pre>
<p>หมายเหตุ:</p>
<ul>
<li>ชื่อ volume อาจไม่ใช่ <code>hermes-webui\_hermes-agent-src</code> เสมอไป ขึ้นกับชื่อ directory/project</li>
<li>อย่าลบ <code>hermes-home</code> ถ้ายังไม่ได้ backup</li>
</ul>
<hr />
<h2>13. Backup</h2>
<p>สำคัญที่สุดคือ Docker volume <code>hermes-home</code>
ดูชื่อ volume:</p>
<pre><code>docker volume ls | grep hermes-home

</code></pre>
<p>backup volume เป็น tar:</p>
<pre><code>mkdir -p ~/backups
cd ~/apps/hermes-webui

docker run --rm \
  -v hermes-webui_hermes-home:/data:ro \
  -v ~/backups:/backup \
  alpine \
  tar -czf /backup/hermes-home-$(date +%F).tar.gz -C /data .

</code></pre>
<p>backup compose/config:</p>
<pre><code>tar -czf ~/backups/hermes-webui-compose-$(date +%F).tar.gz \
  ~/apps/hermes-webui/docker-compose.two-container.yml \
  ~/apps/hermes-webui/.env

</code></pre>
<p>ถ้า workspace มีไฟล์สำคัญ:</p>
<pre><code>tar -czf ~/backups/hermes-workspace-$(date +%F).tar.gz ~/workspace

</code></pre>
<hr />
<h2>14. Restore จาก backup</h2>
<p>สร้าง volume ใหม่ถ้ายังไม่มี:</p>
<pre><code>docker volume create hermes-webui_hermes-home

</code></pre>
<p>restore:</p>
<pre><code>docker run --rm \
  -v hermes-webui_hermes-home:/data \
  -v ~/backups:/backup \
  alpine \
  sh -c ''cd /data &amp;&amp; tar -xzf /backup/hermes-home-YYYY-MM-DD.tar.gz''

</code></pre>
<p>start service:</p>
<pre><code>cd ~/apps/hermes-webui
docker compose -f docker-compose.two-container.yml up -d

</code></pre>
<hr />
<h2>15. Troubleshooting</h2>
<h3>WebUI เปิดไม่ได้</h3>
<pre><code>docker compose -f docker-compose.two-container.yml ps
docker compose -f docker-compose.two-container.yml logs --tail=100 hermes-webui
curl -v http://127.0.0.1:8787/health

</code></pre>
<p>ตรวจ SSH tunnel:</p>
<pre><code>ssh -N -L 8787:127.0.0.1:8787 toppy@SERVER_IP

</code></pre>
<h3>Gateway ไม่ขึ้นหรือ System Settings แจ้ง Gateway not configured</h3>
<pre><code>docker compose -f docker-compose.two-container.yml ps
docker compose -f docker-compose.two-container.yml logs --tail=100 hermes-agent
curl -fsS http://127.0.0.1:8642/health

</code></pre>
<p>ตรวจว่า WebUI มี env นี้:</p>
<pre><code>- HERMES_API_URL=http://hermes-agent:8642

</code></pre>
<h3>Permission denied</h3>
<p>ตรวจ UID/GID:</p>
<pre><code>id -u
id -g
cat .env

</code></pre>
<p>ควรให้ <code>.env</code> มี UID/GID ตรงกับ user บน host:</p>
<pre><code>UID=1000
GID=1000

</code></pre>
<p>ถ้าใช้ bind mount กับ <code>~/.hermes</code> แล้ว permission ยุ่ง ให้กลับไปใช้ named volumes ตาม compose default ก่อน</p>
<h3>Port ชน</h3>
<pre><code>sudo ss -tulpn | grep -E ''8787|8642''

</code></pre>
<p>ถ้า <code>8787</code> ถูกใช้แล้ว เปลี่ยน host port เช่น:</p>
<pre><code>ports:
  - &quot;127.0.0.1:18787:8787&quot;

</code></pre>
<p>แล้ว tunnel แบบนี้:</p>
<pre><code>ssh -N -L 18787:127.0.0.1:18787 toppy@SERVER_IP

</code></pre>
<h3>ดู shell ใน container</h3>
<pre><code>docker compose -f docker-compose.two-container.yml exec hermes-webui bash
docker compose -f docker-compose.two-container.yml exec hermes-agent bash

</code></pre>
<hr />
<h2>16. Production checklist</h2>
<ul>
<li>Docker Engine ติดตั้งผ่าน official Docker repo</li>
<li>user <code>toppy</code> อยู่ใน docker group</li>
<li>ใช้ two-container compose สำหรับ VPS</li>
<li>WebUI bind ที่ <code>127.0.0.1:8787</code></li>
<li>Gateway bind ที่ <code>127.0.0.1:8642</code></li>
<li>UFW ไม่เปิด <code>8787</code> และ <code>8642</code> public</li>
<li>เข้าผ่าน SSH tunnel หรือ Tailscale</li>
<li>ตั้ง <code>HERMES\_WEBUI\_PASSWORD</code> ถ้าใช้ public domain</li>
<li>ใช้ Nginx + HTTPS ถ้าเปิดผ่าน domain</li>
<li>backup volume <code>hermes-home</code></li>
<li>backup <code>.env</code> และ compose file</li>
<li>ทดสอบ restore อย่างน้อยหนึ่งครั้ง</li>
<li>อัปเดต image อย่างมีขั้นตอน และอย่าลบ <code>hermes-home</code> โดยไม่ backup</li>
</ul>
<hr />
<h2>คำสั่งติดตั้งแบบสั้นที่สุดสำหรับ VPS</h2>
<pre><code>sudo apt update
sudo apt install -y ca-certificates curl gnupg git jq
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo &quot;deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release &amp;&amp; echo $VERSION_CODENAME) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker toppy

</code></pre>
<p>logout/login ใหม่ แล้วรัน:</p>
<pre><code>mkdir -p ~/workspace ~/apps
cd ~/apps
git clone https://github.com/nesquena/hermes-webui.git
cd hermes-webui
cp .env.docker.example .env
printf &quot;UID=$(id -u)\nGID=$(id -g)\nHERMES_WORKSPACE=$HOME/workspace\n&quot; &gt;&gt; .env
docker compose -f docker-compose.two-container.yml up -d
docker compose -f docker-compose.two-container.yml ps

</code></pre>
<p>จากเครื่อง local:</p>
<pre><code>ssh -N -L 8787:127.0.0.1:8787 toppy@SERVER_IP

</code></pre>
<p>เปิด:</p>
<pre><code>http://localhost:8787

</code></pre>
', 'PUBLISHED', '2026-06-25 00:00:00+00', '2026-06-25 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 34: Hermes WebUI Native + Cloudflare Tunnel TH
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (34, 1, FALSE, FALSE, '2026-06-25 00:00:00+00', '2026-06-25 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (34, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (34, 27) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (34, 29) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (34, 28) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    34, 34, 'th', 'hermes-webui-native-cloudflare-tunnel-th', 'Hermes WebUI Native + Cloudflare Tunnel TH', 'อัปเดต: 2026-06-25 เป้าหมาย setup นี้:',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"อัปเดต: 2026-06-25 เป้าหมาย setup นี้:"}]}]}', '<h1>Hermes WebUI Native + Host Hermes + Cloudflare Tunnel</h1>
<p>อัปเดต: 2026-06-25
เป้าหมาย setup นี้:</p>
<ul>
<li>Hermes Agent ติดตั้งและรันบน host Linux user: <code>hermes</code></li>
<li>Hermes WebUI ติดตั้งแบบ native บน host ภายใต้ user <code>hermes</code></li>
<li>WebUI ใช้ข้อมูล Hermes จาก <code>/home/hermes/.hermes</code> โดยตรง</li>
<li>เข้าใช้งานผ่าน Cloudflare Tunnel domain: <code>https://hermes.kananek.top</code></li>
<li>มี user/password login ผ่าน Nginx Basic Auth</li>
<li>เพิ่ม <code>HERMES\_WEBUI\_PASSWORD</code> เป็นชั้นป้องกันเสริม</li>
<li>ไม่เปิด port <code>8787</code>, <code>8642</code>, หรือ <code>18080</code> ออก public โดยตรง</li>
</ul>
<p>แหล่งอ้างอิง:</p>
<ul>
<li>Hermes WebUI: <a href="https://get-hermes.ai/">https://get-hermes.ai/</a></li>
<li>Hermes WebUI GitHub: <a href="https://github.com/nesquena/hermes-webui">https://github.com/nesquena/hermes-webui</a></li>
<li>Hermes Agent install docs: <a href="https://hermes-agent.nousresearch.com/installation/">https://hermes-agent.nousresearch.com/installation/</a></li>
<li>Cloudflare Tunnel setup: <a href="https://developers.cloudflare.com/tunnel/setup/">https://developers.cloudflare.com/tunnel/setup/</a></li>
<li>Cloudflare cloudflared downloads: <a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/">https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/downloads/</a></li>
</ul>
<hr />
<h2>Recommendation / สรุปแบบที่แนะนำ</h2>
<p>สำหรับเคสนี้ ใช้ native WebUI สะดวกกว่า Docker:</p>
<pre><code>Cloudflare Tunnel
  -&gt; http://127.0.0.1:18080 บน VPS
  -&gt; Nginx Basic Auth
  -&gt; http://127.0.0.1:8787
  -&gt; Hermes WebUI native service
  -&gt; Hermes Agent native user hermes
  -&gt; /home/hermes/.hermes

</code></pre>
<p>เหตุผล:</p>
<ul>
<li>ไม่ต้องแก้ปัญหา Docker UID/GID และ volume permission</li>
<li>WebUI อ่าน <code>/home/hermes/.hermes</code> ได้ตรง ๆ</li>
<li>WebUI คุยกับ Hermes gateway ผ่าน localhost ง่ายกว่า</li>
<li>Debug ง่ายด้วย <code>systemctl</code>, <code>journalctl</code>, และ <code>./ctl.sh logs</code></li>
<li>Cloudflare Tunnel ยังใช้เหมือนเดิม ไม่ต้องเปิด inbound port</li>
</ul>
<hr />
<h2>0. Assumptions / สมมติฐาน</h2>
<ul>
<li>VPS เป็น Ubuntu</li>
<li>มี user <code>hermes</code> อยู่แล้ว</li>
<li>Domain <code>kananek.top</code> อยู่ใน Cloudflare แล้ว</li>
<li>ต้องการ hostname: <code>hermes.kananek.top</code></li>
<li>จะให้ Cloudflare Tunnel ชี้เข้ามาที่ Nginx local port <code>18080</code></li>
<li>จะให้ WebUI listen ที่ <code>127.0.0.1:8787</code></li>
<li>จะให้ Hermes gateway listen ที่ <code>127.0.0.1:8642</code></li>
</ul>
<p>ถ้ายังไม่มี user <code>hermes</code>:</p>
<pre><code>sudo adduser hermes
sudo usermod -aG sudo hermes

</code></pre>
<hr />
<h2>1. Install packages / ติดตั้ง package พื้นฐาน</h2>
<pre><code>sudo apt update
sudo apt install -y git curl python3 python3-venv python3-pip ca-certificates jq htop nginx apache2-utils

</code></pre>
<hr />
<h2>2. Install Hermes Agent under user hermes</h2>
<p>เข้า user <code>hermes</code>:</p>
<pre><code>sudo -iu hermes

</code></pre>
<p>ติดตั้ง Hermes Agent:</p>
<pre><code>curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

</code></pre>
<p>Reload shell:</p>
<pre><code>source ~/.bashrc

</code></pre>
<p>ตั้งค่า model provider/API key:</p>
<pre><code>hermes model

</code></pre>
<p>ตรวจ:</p>
<pre><code>which hermes
hermes --help
hermes doctor
ls -la /home/hermes/.hermes

</code></pre>
<p>ออกจาก user hermes ชั่วคราว:</p>
<pre><code>exit

</code></pre>
<hr />
<h2>3. Run Hermes gateway as systemd</h2>
<p>Hermes WebUI ควรมี Hermes gateway รันตลอดเวลาเพื่อให้ WebUI คุยกับ Agent ได้มั่นคง
สร้าง service:</p>
<pre><code>sudo vim /etc/systemd/system/hermes-gateway.service

</code></pre>
<p>ใส่:</p>
<pre><code>[Unit]
Description=Hermes Agent Gateway
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=hermes
Group=hermes
WorkingDirectory=/home/hermes
Environment=HOME=/home/hermes
ExecStart=/usr/bin/env hermes gateway
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target

</code></pre>
<p>Enable service:</p>
<pre><code>sudo systemctl daemon-reload
sudo systemctl enable --now hermes-gateway
sudo systemctl status hermes-gateway

</code></pre>
<p>ตรวจ health:</p>
<pre><code>curl -fsS http://127.0.0.1:8642/health

</code></pre>
<p>ดู logs:</p>
<pre><code>journalctl -u hermes-gateway -f

</code></pre>
<p>ถ้า <code>ExecStart=/usr/bin/env hermes gateway</code> หา <code>hermes</code> ไม่เจอ ให้ดู path จริง:</p>
<pre><code>sudo -iu hermes which hermes

</code></pre>
<p>แล้วเปลี่ยน <code>ExecStart</code> เป็น full path เช่น:</p>
<pre><code>ExecStart=/home/hermes/.local/bin/hermes gateway

</code></pre>
<p>จากนั้น reload:</p>
<pre><code>sudo systemctl daemon-reload
sudo systemctl restart hermes-gateway

</code></pre>
<hr />
<h2>4. Install Hermes WebUI native under user hermes</h2>
<p>เข้า user <code>hermes</code>:</p>
<pre><code>sudo -iu hermes

</code></pre>
<p>Clone WebUI:</p>
<pre><code>cd ~
git clone https://github.com/nesquena/hermes-webui.git
cd ~/hermes-webui

</code></pre>
<p>Bootstrap แบบไม่เปิด browser:</p>
<pre><code>python3 bootstrap.py --no-browser

</code></pre>
<p>ถ้า bootstrap start server ขึ้นมาแล้ว ให้หยุดด้วย <code>Ctrl-C</code>
ตั้งค่า environment สำหรับ WebUI:</p>
<pre><code>cp .env.example .env 2&gt;/dev/null || touch .env
vim .env

</code></pre>
<p>ใส่หรือปรับค่าหลัก:</p>
<pre><code>HERMES_WEBUI_HOST=127.0.0.1
HERMES_WEBUI_PORT=8787
HERMES_API_URL=http://127.0.0.1:8642
HERMES_WEBUI_GATEWAY_BASE_URL=http://127.0.0.1:8642
HERMES_WEBUI_PASSWORD=CHANGE_THIS_LONG_WEBUI_PASSWORD

</code></pre>
<p>ทดสอบ start ด้วย helper:</p>
<pre><code>./ctl.sh start
./ctl.sh status
./ctl.sh logs --lines 100
curl -fsS http://127.0.0.1:8787/health

</code></pre>
<p>หยุดก่อนทำ systemd:</p>
<pre><code>./ctl.sh stop

</code></pre>
<p>ออกจาก user <code>hermes</code>:</p>
<pre><code>exit

</code></pre>
<hr />
<h2>5. Run Hermes WebUI as systemd</h2>
<p>สร้าง service:</p>
<pre><code>sudo vim /etc/systemd/system/hermes-webui.service

</code></pre>
<p>ใส่:</p>
<pre><code>[Unit]
Description=Hermes WebUI
After=network-online.target hermes-gateway.service
Wants=network-online.target
Requires=hermes-gateway.service

[Service]
Type=forking
User=hermes
Group=hermes
WorkingDirectory=/home/hermes/hermes-webui
Environment=HOME=/home/hermes
EnvironmentFile=/home/hermes/hermes-webui/.env
ExecStart=/home/hermes/hermes-webui/ctl.sh start
ExecStop=/home/hermes/hermes-webui/ctl.sh stop
ExecReload=/home/hermes/hermes-webui/ctl.sh restart
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target

</code></pre>
<p>Enable service:</p>
<pre><code>sudo systemctl daemon-reload
sudo systemctl enable --now hermes-webui
sudo systemctl status hermes-webui

</code></pre>
<p>ตรวจ:</p>
<pre><code>curl -fsS http://127.0.0.1:8787/health
journalctl -u hermes-webui -n 100 --no-pager
sudo -iu hermes -- /home/hermes/hermes-webui/ctl.sh status

</code></pre>
<hr />
<h2>6. Nginx Basic Auth for hermes.kananek.top</h2>
<p>Cloudflare Tunnel จะชี้มาที่ Nginx local port <code>18080</code> แล้ว Nginx จะถาม username/password ก่อน proxy ไป WebUI
สร้าง password file:</p>
<pre><code>sudo htpasswd -c /etc/nginx/.htpasswd-hermes YOUR_USERNAME

</code></pre>
<p>สร้าง Nginx config:</p>
<pre><code>sudo vim /etc/nginx/sites-available/hermes-webui-local

</code></pre>
<p>ใส่:</p>
<pre><code>server {
    listen 127.0.0.1:18080;
    server_name hermes.kananek.top;

    auth_basic &quot;Hermes WebUI&quot;;
    auth_basic_user_file /etc/nginx/.htpasswd-hermes;

    location / {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;
        proxy_buffering off;
    }
}

</code></pre>
<p>Enable site:</p>
<pre><code>sudo ln -s /etc/nginx/sites-available/hermes-webui-local /etc/nginx/sites-enabled/hermes-webui-local
sudo nginx -t
sudo systemctl reload nginx

</code></pre>
<p>ทดสอบ Basic Auth:</p>
<pre><code>curl -I http://127.0.0.1:18080

</code></pre>
<p>ควรได้ <code>401 Unauthorized</code>
ทดสอบพร้อม username/password:</p>
<pre><code>curl -I -u YOUR_USERNAME:YOUR_PASSWORD http://127.0.0.1:18080

</code></pre>
<h2>ควรได้ <code>200</code>, <code>302</code>, หรือ response จาก WebUI</h2>
<h2>7. Cloudflare Tunnel setup</h2>
<p>วิธี Dashboard ง่ายสุด:</p>
<ol>
<li>เข้า Cloudflare Zero Trust dashboard</li>
<li>ไปที่ <code>Networks</code> -&gt; <code>Tunnels</code></li>
<li>กด <code>Create tunnel</code></li>
<li>เลือก <code>Cloudflared</code></li>
<li>ตั้งชื่อเช่น <code>hermes-vps</code></li>
<li>เลือก OS/architecture ของ VPS</li>
<li>copy install/run command ที่ Cloudflare ให้ไปวางบน VPS</li>
</ol>
<p>หลัง connector online แล้ว ให้เพิ่ม Public Hostname:</p>
<pre><code>Subdomain: hermes
Domain: kananek.top
Type: HTTP
URL: 127.0.0.1:18080

</code></pre>
<p>ผลลัพธ์:</p>
<pre><code>https://hermes.kananek.top
  -&gt; Cloudflare Tunnel
  -&gt; http://127.0.0.1:18080
  -&gt; Nginx Basic Auth
  -&gt; http://127.0.0.1:8787
  -&gt; Hermes WebUI native

</code></pre>
<hr />
<h2>8. Firewall</h2>
<p>ไม่ต้องเปิด <code>8787</code>, <code>8642</code>, หรือ <code>18080</code> public</p>
<pre><code>sudo ufw allow OpenSSH
sudo ufw deny 8787/tcp
sudo ufw deny 8642/tcp
sudo ufw deny 18080/tcp
sudo ufw status verbose

</code></pre>
<p>ตรวจ listening ports:</p>
<pre><code>sudo ss -tulpn | grep -E ''8787|8642|18080''

</code></pre>
<p>ควรเห็นเป็น localhost:</p>
<pre><code>127.0.0.1:8787
127.0.0.1:8642
127.0.0.1:18080

</code></pre>
<p>ไม่ควรเห็น:</p>
<pre><code>0.0.0.0:8787
0.0.0.0:8642
0.0.0.0:18080

</code></pre>
<hr />
<h2>9. Final test</h2>
<p>บน VPS:</p>
<pre><code>sudo systemctl status hermes-gateway
sudo systemctl status hermes-webui
curl -fsS http://127.0.0.1:8642/health
curl -fsS http://127.0.0.1:8787/health
curl -I http://127.0.0.1:18080

</code></pre>
<p>บนเครื่อง local เปิด:</p>
<pre><code>https://hermes.kananek.top

</code></pre>
<p>ลำดับ login ที่คาดว่าจะเจอ:</p>
<ol>
<li>Browser ถาม Basic Auth username/password จาก Nginx</li>
<li>Hermes WebUI ถาม WebUI password ถ้าตั้ง <code>HERMES\_WEBUI\_PASSWORD</code></li>
</ol>
<hr />
<h2>10. Daily operations</h2>
<p>Hermes gateway:</p>
<pre><code>sudo systemctl status hermes-gateway
sudo systemctl restart hermes-gateway
journalctl -u hermes-gateway -f

</code></pre>
<p>Hermes WebUI:</p>
<pre><code>sudo systemctl status hermes-webui
sudo systemctl restart hermes-webui
journalctl -u hermes-webui -f
sudo -iu hermes -- /home/hermes/hermes-webui/ctl.sh logs --lines 100

</code></pre>
<p>Nginx:</p>
<pre><code>sudo nginx -t
sudo systemctl reload nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

</code></pre>
<p>Cloudflared:</p>
<pre><code>systemctl status cloudflared
journalctl -u cloudflared -f

</code></pre>
<hr />
<h2>11. Update</h2>
<p>Update Hermes Agent:</p>
<pre><code>sudo -iu hermes
hermes --version
hermes doctor
exit
sudo systemctl restart hermes-gateway

</code></pre>
<p>ถ้า Hermes Agent ติดตั้งจาก git source ให้ update ตาม path จริง เช่น:</p>
<pre><code>sudo -iu hermes
cd ~/.hermes/hermes-agent
git pull
exit
sudo systemctl restart hermes-gateway

</code></pre>
<p>Update Hermes WebUI:</p>
<pre><code>sudo systemctl stop hermes-webui
sudo -iu hermes
cd ~/hermes-webui
git pull
python3 bootstrap.py --no-browser
exit
sudo systemctl start hermes-webui
sudo systemctl status hermes-webui

</code></pre>
<hr />
<h2>12. Backup</h2>
<p>Backup Hermes state และ workspace:</p>
<pre><code>sudo mkdir -p /opt/backups/hermes
sudo tar -czf /opt/backups/hermes/hermes-home-$(date +%F).tar.gz -C /home/hermes .hermes workspace

</code></pre>
<p>Backup WebUI app/config และ system config:</p>
<pre><code>sudo tar -czf /opt/backups/hermes/hermes-native-config-$(date +%F).tar.gz \
  /home/hermes/hermes-webui/.env \
  /etc/systemd/system/hermes-gateway.service \
  /etc/systemd/system/hermes-webui.service \
  /etc/nginx/sites-available/hermes-webui-local \
  /etc/nginx/.htpasswd-hermes

</code></pre>
<h2>เก็บ backup ของ <code>.htpasswd</code> และ <code>.env</code> ให้ดี เพราะมี credentials</h2>
<h2>13. Troubleshooting</h2>
<h3>เข้า <a href="https://hermes.kananek.top">https://hermes.kananek.top</a> แล้ว 502</h3>
<pre><code>curl -I http://127.0.0.1:18080
sudo nginx -t
sudo systemctl status nginx
systemctl status cloudflared
journalctl -u cloudflared -n 100 --no-pager

</code></pre>
<p>ตรวจ Cloudflare Public Hostname:</p>
<pre><code>HTTP -&gt; 127.0.0.1:18080

</code></pre>
<h3>Nginx login ผ่าน แต่ WebUI ไม่ขึ้น</h3>
<pre><code>curl -fsS http://127.0.0.1:8787/health
sudo systemctl status hermes-webui
journalctl -u hermes-webui -n 100 --no-pager
sudo -iu hermes -- /home/hermes/hermes-webui/ctl.sh logs --lines 100

</code></pre>
<h3>WebUI ขึ้น แต่คุยกับ Hermes ไม่ได้</h3>
<pre><code>curl -fsS http://127.0.0.1:8642/health
sudo systemctl status hermes-gateway
journalctl -u hermes-gateway -n 100 --no-pager
sudo -iu hermes -- hermes doctor

</code></pre>
<p>ตรวจ <code>.env</code> ของ WebUI:</p>
<pre><code>sudo -iu hermes -- grep HERMES /home/hermes/hermes-webui/.env

</code></pre>
<p>ควรมี:</p>
<pre><code>HERMES_API_URL=http://127.0.0.1:8642
HERMES_WEBUI_GATEWAY_BASE_URL=http://127.0.0.1:8642

</code></pre>
<h3>systemd หา hermes ไม่เจอ</h3>
<pre><code>sudo -iu hermes which hermes

</code></pre>
<p>เอา full path ไปใส่ <code>ExecStart</code> ใน <code>/etc/systemd/system/hermes-gateway.service</code></p>
<h3>WebUI password ไม่ทำงาน</h3>
<p>ตรวจว่า systemd อ่าน <code>.env</code>:</p>
<pre><code>sudo systemctl show hermes-webui | grep EnvironmentFile
sudo -iu hermes -- grep HERMES_WEBUI_PASSWORD /home/hermes/hermes-webui/.env
sudo systemctl restart hermes-webui

</code></pre>
<hr />
<h2>Security checklist</h2>
<ul>
<li>Hermes gateway listen เฉพาะ <code>127.0.0.1:8642</code></li>
<li>Hermes WebUI listen เฉพาะ <code>127.0.0.1:8787</code></li>
<li>Nginx Basic Auth listen เฉพาะ <code>127.0.0.1:18080</code></li>
<li>Cloudflare Tunnel ชี้ไป <code>http://127.0.0.1:18080</code></li>
<li>UFW ไม่เปิด <code>8787</code>, <code>8642</code>, <code>18080</code></li>
<li>ตั้ง Nginx Basic Auth username/password</li>
<li>ตั้ง <code>HERMES\_WEBUI\_PASSWORD</code></li>
<li>Backup <code>/home/hermes/.hermes</code></li>
<li>ไม่เก็บ API keys/password ใน git</li>
</ul>
', 'PUBLISHED', '2026-06-25 00:00:00+00', '2026-06-25 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 35: Hermes WebUI VPS Setup Guide TH/EN
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (35, 1, FALSE, FALSE, '2026-06-24 00:00:00+00', '2026-06-24 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (35, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (35, 27) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (35, 28) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (35, 29) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    35, 35, 'th', 'hermes-webui-vps-setup-guide-th-en', 'Hermes WebUI VPS Setup Guide TH/EN', 'Source docs checked on 2026-06-24:',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Source docs checked on 2026-06-24:"}]}]}', '<h1>Hermes WebUI VPS Setup Guide / คู่มือติดตั้ง Hermes WebUI บน VPS</h1>
<p>Source docs checked on 2026-06-24:</p>
<ul>
<li>Hermes community Web UI: <a href="https://get-hermes.ai/">https://get-hermes.ai/</a></li>
<li>Hermes WebUI GitHub: <a href="https://github.com/nesquena/hermes-webui">https://github.com/nesquena/hermes-webui</a></li>
<li>Hermes Agent install docs: <a href="https://hermes-agent.nousresearch.com/installation/">https://hermes-agent.nousresearch.com/installation/</a></li>
<li>Based on local checklist: <code>New Ubuntu Server Setup Checklist</code></li>
</ul>
<hr />
<h2>Recommendation / คำแนะนำหลัก</h2>
<h3>English</h3>
<p>For your case, run Hermes on a VPS as a private always-on assistant:</p>
<ul>
<li>VPS size: 2 vCPU, 4 GB RAM, 40 GB SSD is a comfortable baseline. Minimum is smaller, but 4 GB RAM gives breathing room.</li>
<li>OS: Ubuntu 22.04 LTS or 24.04 LTS.</li>
<li>Runtime: install Hermes Agent and Hermes WebUI under the normal sudo user, for example <code>toppy</code>.</li>
<li>Access: bind WebUI to <code>127.0.0.1:8787</code> and access it through SSH tunnel or Tailscale.</li>
<li>Security default: do not expose port <code>8787</code> directly to the public internet.</li>
<li>Model: use external API providers such as OpenAI, Anthropic, Gemini, OpenRouter, DeepSeek, or Nous Portal. No GPU is needed.</li>
<li>Persistence: use systemd so the WebUI starts after reboot.</li>
</ul>
<p>Best setup for you: <code>Ubuntu VPS + hardened SSH + UFW + Hermes native install + localhost-only WebUI + SSH tunnel</code>. Add Nginx/TLS only if you truly need browser access without a tunnel.</p>
<h3>ไทย</h3>
<p>สำหรับเคสของคุณ แนะนำให้รัน Hermes บน VPS เป็นผู้ช่วย AI ที่เปิดไว้ตลอดเวลาแบบส่วนตัว:</p>
<ul>
<li>ขนาด VPS: 2 vCPU, RAM 4 GB, SSD 40 GB กำลังดี แม้ขั้นต่ำจะต่ำกว่านี้ แต่ 4 GB ใช้งานจริงสบายกว่า</li>
<li>OS: Ubuntu 22.04 LTS หรือ 24.04 LTS</li>
<li>Runtime: ติดตั้ง Hermes Agent และ Hermes WebUI ภายใต้ user ปกติที่มี sudo เช่น <code>toppy</code></li>
<li>การเข้าใช้งาน: ให้ WebUI bind ที่ <code>127.0.0.1:8787</code> แล้วเข้าผ่าน SSH tunnel หรือ Tailscale</li>
<li>ค่าเริ่มต้นด้านความปลอดภัย: อย่าเปิด port <code>8787</code> สู่ public internet โดยตรง</li>
<li>Model: ใช้ API provider ภายนอก เช่น OpenAI, Anthropic, Gemini, OpenRouter, DeepSeek หรือ Nous Portal ไม่ต้องใช้ GPU</li>
<li>Persistence: ใช้ systemd เพื่อให้ WebUI start เองหลัง reboot</li>
</ul>
<h2>ชุดที่เหมาะสุด: <code>Ubuntu VPS + SSH hardened + UFW + Hermes native install + WebUI เฉพาะ localhost + SSH tunnel</code> แล้วค่อยเพิ่ม Nginx/TLS เฉพาะกรณีที่จำเป็นต้องเข้าใช้งานผ่าน browser โดยไม่ tunnel</h2>
<h2>Architecture / ภาพรวมระบบ</h2>
<pre><code>Your laptop browser
  -&gt; SSH tunnel localhost:8787
    -&gt; VPS 127.0.0.1:8787 Hermes WebUI
      -&gt; Hermes Agent ~/.hermes/
        -&gt; LLM provider API
        -&gt; workspace files ~/workspace

</code></pre>
<p>Thai:</p>
<pre><code>Browser บนเครื่องเรา
  -&gt; SSH tunnel localhost:8787
    -&gt; VPS 127.0.0.1:8787 Hermes WebUI
      -&gt; Hermes Agent ~/.hermes/
        -&gt; LLM provider API
        -&gt; ไฟล์งาน ~/workspace

</code></pre>
<hr />
<h2>Prerequisites / สิ่งที่ต้องเตรียม</h2>
<h3>English</h3>
<p>Finish the base Ubuntu checklist first:</p>
<ul>
<li>Create sudo user, for example <code>toppy</code>.</li>
<li>Disable root SSH login.</li>
<li>Disable password SSH login.</li>
<li>Enable UFW.</li>
<li>Allow only <code>OpenSSH</code>, <code>80/tcp</code>, and <code>443/tcp</code> if using Nginx.</li>
<li>Enable unattended security updates.</li>
<li>Enable fail2ban.</li>
<li>Point DNS only if you plan to use a public domain.</li>
</ul>
<h3>ไทย</h3>
<p>ทำ checklist พื้นฐานของ Ubuntu ให้เสร็จก่อน:</p>
<ul>
<li>สร้าง user ที่มี sudo เช่น <code>toppy</code></li>
<li>ปิด root SSH login</li>
<li>ปิด password SSH login</li>
<li>เปิด UFW</li>
<li>อนุญาตเฉพาะ <code>OpenSSH</code>, <code>80/tcp</code>, <code>443/tcp</code> ถ้าใช้ Nginx</li>
<li>เปิด unattended security updates</li>
<li>เปิด fail2ban</li>
<li>ตั้ง DNS เฉพาะกรณีต้องใช้ public domain</li>
</ul>
<hr />
<h2>1. Install Required Packages / ติดตั้ง package ที่จำเป็น</h2>
<p>Run on the server as <code>toppy</code>.</p>
<pre><code>sudo apt update
sudo apt install -y git curl python3 python3-venv python3-pip ca-certificates jq htop
mkdir -p ~/workspace

</code></pre>
<p>Optional but useful:</p>
<pre><code>python3 --version
curl --version
git --version

</code></pre>
<hr />
<h2>2. Install Hermes Agent / ติดตั้ง Hermes Agent</h2>
<p>Official installer:</p>
<pre><code>curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash

</code></pre>
<p>Reload shell:</p>
<pre><code>source ~/.bashrc

</code></pre>
<p>Configure your model provider:</p>
<pre><code>hermes model

</code></pre>
<p>Useful commands:</p>
<pre><code>hermes tools
hermes doctor
hermes

</code></pre>
<p>Thai notes:</p>
<ul>
<li><code>hermes model</code> ใช้ตั้งค่า provider และ API key</li>
<li><code>hermes doctor</code> ใช้ตรวจปัญหา environment</li>
<li>ถ้าใช้ OpenAI / Anthropic / Gemini / OpenRouter ให้เตรียม API key ไว้ก่อน</li>
</ul>
<hr />
<h2>3. Install Hermes WebUI / ติดตั้ง Hermes WebUI</h2>
<p>Recommended native source install for VPS:</p>
<pre><code>cd ~
git clone https://github.com/nesquena/hermes-webui.git hermes-webui
cd ~/hermes-webui
python3 bootstrap.py --no-browser

</code></pre>
<p>If bootstrap works, stop it with <code>Ctrl-C</code>, then use the daemon helper:</p>
<pre><code>cd ~/hermes-webui
./ctl.sh start
./ctl.sh status
./ctl.sh logs --lines 100

</code></pre>
<p>Default WebUI URL on the VPS:</p>
<pre><code>http://127.0.0.1:8787

</code></pre>
<p>Thai notes:</p>
<ul>
<li><code>bootstrap.py</code> จะตรวจ Hermes Agent, สร้าง Python environment, start WebUI และตรวจ <code>/health</code></li>
<li>บน VPS ใช้ <code>--no-browser</code> เพราะไม่มี desktop browser</li>
<li><code>ctl.sh</code> เหมาะกับ VPS เพราะมี start/status/logs/restart/stop</li>
</ul>
<hr />
<h2>4. Access From Your Computer / เข้าใช้งานจากเครื่องเรา</h2>
<p>Run this on your local computer:</p>
<pre><code>ssh -N -L 8787:127.0.0.1:8787 toppy@SERVER_IP

</code></pre>
<p>Then open:</p>
<pre><code>http://localhost:8787

</code></pre>
<h2>Thai:
รันคำสั่งนี้บนเครื่อง local ของเรา แล้วเปิด browser ไปที่ <code>http://localhost:8787</code> ระบบจะ tunnel ไปหา WebUI บน VPS โดยไม่ต้องเปิด port 8787 สู่ internet</h2>
<h2>5. systemd Service / ทำให้ start อัตโนมัติด้วย systemd</h2>
<p>Create service file:</p>
<pre><code>sudo vim /etc/systemd/system/hermes-webui.service

</code></pre>
<p>Recommended service:</p>
<pre><code>[Unit]
Description=Hermes WebUI
After=network-online.target
Wants=network-online.target

[Service]
Type=forking
User=toppy
WorkingDirectory=/home/toppy/hermes-webui
Environment=HERMES_WEBUI_HOST=127.0.0.1
Environment=HERMES_WEBUI_PORT=8787
ExecStart=/home/toppy/hermes-webui/ctl.sh start
ExecStop=/home/toppy/hermes-webui/ctl.sh stop
ExecReload=/home/toppy/hermes-webui/ctl.sh restart
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target

</code></pre>
<p>Enable and start:</p>
<pre><code>sudo systemctl daemon-reload
sudo systemctl enable --now hermes-webui
sudo systemctl status hermes-webui

</code></pre>
<p>Check logs:</p>
<pre><code>journalctl -u hermes-webui -n 100 --no-pager
cd ~/hermes-webui &amp;&amp; ./ctl.sh logs --lines 100

</code></pre>
<h2>Thai:
systemd จะช่วยให้ WebUI กลับมาหลัง reboot หรือ service crash แต่ตัว log หลักของ WebUI ยังดูผ่าน <code>./ctl.sh logs</code> ได้สะดวก</h2>
<h2>6. Firewall / Firewall ที่ควรใช้</h2>
<p>If using SSH tunnel only:</p>
<pre><code>sudo ufw allow OpenSSH
sudo ufw deny 8787/tcp
sudo ufw status verbose

</code></pre>
<p>If using Nginx later:</p>
<pre><code>sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status verbose

</code></pre>
<p>Important:</p>
<ul>
<li>Keep <code>8787</code> private.</li>
<li>Do not run <code>HERMES\_WEBUI\_HOST=0.0.0.0</code> unless you also configure strong authentication and HTTPS.</li>
</ul>
<p>Thai:</p>
<ul>
<li>เก็บ <code>8787</code> ให้เป็น private</li>
<li>อย่า bind เป็น <code>0.0.0.0</code> ถ้ายังไม่มี password/auth และ HTTPS ที่ดีพอ</li>
</ul>
<hr />
<h2>7. Optional Public Domain With Nginx / ถ้าต้องใช้ Public Domain</h2>
<p>Only do this if SSH tunnel or Tailscale is inconvenient.</p>
<h3>English</h3>
<p>Use Nginx reverse proxy with HTTPS and WebUI password enabled. Public exposure increases risk because the WebUI can reach your Hermes memory and workspace.</p>
<h3>ไทย</h3>
<p>ใช้ Nginx reverse proxy พร้อม HTTPS และเปิด password ให้ WebUI เท่านั้น การเปิด public มีความเสี่ยงมากขึ้น เพราะ WebUI เข้าถึง memory และ workspace ของ Hermes ได้
Set password environment in systemd:</p>
<pre><code>Environment=HERMES_WEBUI_PASSWORD=CHANGE_ME_LONG_RANDOM_PASSWORD

</code></pre>
<p>Nginx example:</p>
<pre><code>server {
    listen 80;
    server_name hermes.example.com;

    location / {
        proxy_pass http://127.0.0.1:8787;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }
}

</code></pre>
<p>Enable HTTPS:</p>
<pre><code>sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d hermes.example.com
sudo certbot renew --dry-run

</code></pre>
<hr />
<h2>8. Docker Option / ตัวเลือก Docker</h2>
<p>Docker works, but for your VPS the native source install is simpler because Hermes WebUI is tightly coupled to Hermes Agent files and state.
Manual Docker example from WebUI docs:</p>
<pre><code>docker pull ghcr.io/nesquena/hermes-webui:latest
docker run -d \
  -e WANTED_UID=$(id -u) -e WANTED_GID=$(id -g) \
  -v ~/.hermes:/home/hermeswebui/.hermes \
  -e HERMES_WEBUI_STATE_DIR=/home/hermeswebui/.hermes/webui \
  -v ~/workspace:/workspace \
  -p 127.0.0.1:8787:8787 \
  ghcr.io/nesquena/hermes-webui:latest

</code></pre>
<h2>Thai:
Docker ใช้ได้ แต่ถ้าติดตั้งบน VPS ส่วนตัว แนะนำ native source install ก่อน เพราะ debug ง่ายกว่าและเข้ากับ Hermes Agent state โดยตรง</h2>
<h2>9. Upgrade / อัปเดต</h2>
<p>Update Hermes Agent:</p>
<pre><code>cd ~/.hermes/hermes-agent
git pull

</code></pre>
<p>Update WebUI:</p>
<pre><code>cd ~/hermes-webui
./ctl.sh stop
git pull
python3 bootstrap.py --no-browser
./ctl.sh start
./ctl.sh status

</code></pre>
<p>Important:</p>
<ul>
<li>Upgrade Hermes Agent and WebUI together where possible.</li>
<li>Avoid mixing very old Agent with very new WebUI.</li>
<li>For Docker, pin image tags in production instead of relying on <code>latest</code> forever.</li>
</ul>
<p>Thai:</p>
<ul>
<li>ควรอัปเดต Hermes Agent และ WebUI ไปด้วยกัน</li>
<li>หลีกเลี่ยงการใช้ Agent รุ่นเก่ามากกับ WebUI รุ่นใหม่มาก</li>
<li>ถ้าใช้ Docker production ควร pin tag ไม่ใช้ <code>latest</code> ตลอดไป</li>
</ul>
<hr />
<h2>10. Backup / Backup ที่ควรมี</h2>
<p>Back up these paths:</p>
<pre><code>/home/toppy/.hermes/
/home/toppy/hermes-webui/.env
/home/toppy/workspace/
/etc/systemd/system/hermes-webui.service
/etc/nginx/sites-available/hermes.example.com

</code></pre>
<p>Suggested backup command:</p>
<pre><code>tar -czf hermes-backup-$(date +%F).tar.gz ~/.hermes ~/workspace ~/hermes-webui/.env

</code></pre>
<h2>Thai:
<code>~/.hermes/</code> สำคัญมาก เพราะมี memory, config, profiles, sessions และ WebUI state บางส่วน</h2>
<h2>11. Quick Troubleshooting / วิธีตรวจปัญหาเร็ว</h2>
<pre><code>hermes doctor
systemctl status hermes-webui
journalctl -u hermes-webui -n 100 --no-pager
cd ~/hermes-webui &amp;&amp; ./ctl.sh status
cd ~/hermes-webui &amp;&amp; ./ctl.sh logs --lines 100
ss -tlnp | grep 8787
curl -fsS http://127.0.0.1:8787/health

</code></pre>
<p>Common issues:</p>
<ul>
<li>Cannot open WebUI locally: check SSH tunnel command.</li>
<li>WebUI not running: check <code>./ctl.sh status</code> and logs.</li>
<li>Model missing: run <code>hermes model</code> again.</li>
<li>Permission issue: confirm files are owned by <code>toppy</code>, not root.</li>
<li>Port already used: check <code>ss -tlnp \| grep 8787</code>.</li>
</ul>
<p>Thai:</p>
<ul>
<li>เข้า WebUI ไม่ได้จากเครื่องเรา: ตรวจ SSH tunnel</li>
<li>WebUI ไม่รัน: ดู <code>./ctl.sh status</code> และ logs</li>
<li>Model ไม่ขึ้น: รัน <code>hermes model</code> ใหม่</li>
<li>Permission error: ตรวจว่าไฟล์เป็น owner <code>toppy</code> ไม่ใช่ root</li>
<li>Port ชน: ใช้ <code>ss -tlnp \| grep 8787</code></li>
</ul>
<hr />
<h2>Final Checklist / Checklist สุดท้าย</h2>
<ul>
<li>Base Ubuntu hardening complete.</li>
<li>Hermes Agent installed under <code>toppy</code>.</li>
<li><code>hermes model</code> configured.</li>
<li><code>hermes doctor</code> passes or only shows understood warnings.</li>
<li>Hermes WebUI installed in <code>/home/toppy/hermes-webui</code>.</li>
<li>WebUI binds to <code>127.0.0.1:8787</code>.</li>
<li>Local SSH tunnel works.</li>
<li><code>hermes-webui.service</code> enabled.</li>
<li>UFW does not expose <code>8787</code> publicly.</li>
<li>Backup includes <code>~/.hermes/</code>.</li>
<li>If public domain is used, HTTPS and <code>HERMES\_WEBUI\_PASSWORD</code> are enabled.</li>
</ul>
', 'PUBLISHED', '2026-06-24 00:00:00+00', '2026-06-24 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 36: Install Hermes WebUI + Cloudflare Tunnel Setup
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (36, 1, FALSE, FALSE, '2026-06-25 00:00:00+00', '2026-06-25 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (36, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (36, 27) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (36, 28) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (36, 29) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    36, 36, 'en', 'install-hermes-webui-cloudflare-tunnel-setup', 'Install Hermes WebUI + Cloudflare Tunnel Setup', 'Technical notes and documentation from knowledge vault.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical notes and documentation from knowledge vault."}]}]}', '<h1>Install Hermes WebUI + Cloudflare Tunnel Setup</h1>
<p>Created: 2026-06-25</p>
<h2>Goal</h2>
<p>Install Hermes WebUI on a host and expose it through a Cloudflare Tunnel without opening inbound firewall ports. This doc includes an investigation section so future troubleshooting has a place to land.</p>
<h2>Source References</h2>
<ul>
<li>Hermes WebUI repo: <a href="https://github.com/nesquena/hermes-webui">https://github.com/nesquena/hermes-webui</a></li>
<li>Hermes WebUI Docker notes: <a href="https://github.com/nesquena/hermes-webui/blob/master/docs/docker.md">https://github.com/nesquena/hermes-webui/blob/master/docs/docker.md</a></li>
<li>Open WebUI + Hermes Agent reference: <a href="https://docs.openwebui.com/getting-started/quick-start/connect-an-agent/hermes-agent/">https://docs.openwebui.com/getting-started/quick-start/connect-an-agent/hermes-agent/</a></li>
<li>Cloudflare Tunnel dashboard setup: <a href="https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/">https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/get-started/create-remote-tunnel/</a></li>
</ul>
<h2>Prerequisites</h2>
<ul>
<li>Linux, macOS, or WSL2 host with shell access.</li>
<li>Hermes Agent installed or permission for Hermes WebUI bootstrap to install it.</li>
<li>Python 3 available on the host.</li>
<li>A Cloudflare account with the target domain added to Cloudflare.</li>
<li>Permission to create Cloudflare Zero Trust tunnels and Access applications.</li>
<li>A chosen public hostname, for example <code>hermes.example.com</code>.</li>
</ul>
<h2>Recommended Native Install</h2>
<pre><code>git clone https://github.com/nesquena/hermes-webui.git ~/hermes-webui
cd ~/hermes-webui
python3 bootstrap.py

</code></pre>
<p>The bootstrap flow detects Hermes Agent, creates or finds a Python environment for WebUI dependencies, starts the server, waits for <code>/health</code>, and opens first-run onboarding.
For a server or homelab install, prefer the lifecycle wrapper:</p>
<pre><code>cd ~/hermes-webui
./ctl.sh start
./ctl.sh status
./ctl.sh logs --lines 100
./ctl.sh restart
./ctl.sh stop

</code></pre>
<p>Default local URL:</p>
<pre><code>http://127.0.0.1:8787

</code></pre>
<p>If Cloudflare Tunnel runs on the same host, keep Hermes WebUI bound to localhost unless there is a specific reason to expose it on the LAN.</p>
<h2>Docker Install Option</h2>
<p>Single-container quickstart:</p>
<pre><code>git clone https://github.com/nesquena/hermes-webui.git ~/hermes-webui
cd ~/hermes-webui
cp .env.docker.example .env
docker compose up -d

</code></pre>
<p>Open:</p>
<pre><code>http://localhost:8787

</code></pre>
<p>Notes:</p>
<ul>
<li>On macOS or hosts where UID/GID are not <code>1000</code>, edit <code>.env</code> before launch.</li>
<li>If scheduled/offline jobs matter, investigate the two-container or three-container Docker Compose options, or run <code>hermes gateway</code> separately. The single-container setup is mainly the WebUI container.</li>
</ul>
<h2>Cloudflare Tunnel Setup</h2>
<ol>
<li>In Cloudflare dashboard, go to Zero Trust / Networking / Tunnels.</li>
<li>Create a tunnel and give it a clear name, for example <code>hermes-webui-prod</code>.</li>
<li>Choose the host operating system and run the generated <code>cloudflared</code> install/connect command on the Hermes host.</li>
<li>Wait until the connector shows connected or healthy.</li>
<li>Add a route as a Published application.</li>
<li>Set the public hostname, for example <code>hermes.example.com</code>.</li>
<li>Set Service URL to:</li>
</ol>
<pre><code>http://localhost:8787

</code></pre>
<ol>
<li>Save the route and confirm the tunnel status is healthy.</li>
</ol>
<h2>Access Protection</h2>
<p>Do not leave Hermes WebUI publicly reachable without authentication. It can operate the same agent and workspace capabilities available locally.
Recommended controls:</p>
<ul>
<li>Add a Cloudflare Access application for the hostname.</li>
<li>Restrict access to specific email addresses, groups, or an identity provider policy.</li>
<li>Enable MFA through the identity provider where possible.</li>
<li>Keep the origin bound to <code>127.0.0.1</code> when Cloudflare Tunnel and WebUI are on the same machine.</li>
<li>Configure any WebUI password/security options available in the Hermes Control Center.</li>
</ul>
<h2>Verification Checklist</h2>
<pre><code>cd ~/hermes-webui
./ctl.sh status
curl -fsS http://127.0.0.1:8787/health

</code></pre>
<p>Then verify:</p>
<ul>
<li>Local page loads at <code>http://127.0.0.1:8787</code>.</li>
<li>Cloudflare Tunnel shows Healthy.</li>
<li>Public hostname loads after Cloudflare Access login.</li>
<li>WebUI can see the expected Hermes model/provider configuration.</li>
<li>Chat works from the tunneled URL.</li>
<li>Workspace file browsing points at the intended workspace only.</li>
</ul>
<h2>Troubleshooting</h2>
<h3>WebUI is not reachable locally</h3>
<pre><code>cd ~/hermes-webui
./ctl.sh status
./ctl.sh logs --lines 100
lsof -i :8787

</code></pre>
<p>Check whether another process owns port <code>8787</code>, whether bootstrap failed, or whether the service is bound to a different host/port.</p>
<h3>Tunnel is healthy but browser cannot load the site</h3>
<ul>
<li>Confirm the Cloudflare route Service URL is <code>http://localhost:8787</code>.</li>
<li>If <code>cloudflared</code> runs in a container, <code>localhost</code> means the tunnel container, not the host. Use the correct Docker network service name or host gateway address.</li>
<li>Check Cloudflare Access policy denies versus origin connection failures.</li>
</ul>
<h3>Cloudflare reports tunnel down/degraded</h3>
<ul>
<li>Confirm the host can make outbound connections to Cloudflare.</li>
<li>Cloudflare notes restrictive firewalls should allow the tunnel connector to reach Cloudflare, including port <code>7844</code> where required.</li>
<li>Restart <code>cloudflared</code> using the install method chosen by the dashboard command.</li>
</ul>
<h3>Login or session issues over tunnel</h3>
<ul>
<li>Confirm public hostname is consistent and HTTPS is used.</li>
<li>Check browser console for CSP, cookie, or mixed-content errors.</li>
<li>Re-test locally to separate WebUI issues from tunnel/proxy issues.</li>
</ul>
<h2>Investigation Log</h2>
<p>Use this section for every installation attempt, failure, workaround, or environmental discovery.</p>
<h3>2026-06-25 Initial Investigation</h3>
<p>Findings:</p>
<ul>
<li>Hermes WebUI upstream recommends native install via <code>python3 bootstrap.py</code>, with <code>./start.sh</code> still available.</li>
<li>Server lifecycle on homelab/VM is handled by <code>./ctl.sh</code> commands.</li>
<li>Default WebUI port is <code>8787</code>.</li>
<li>Docker Compose is available, but single-container mode may not be enough for scheduled/offline jobs unless a Hermes gateway daemon is also running.</li>
<li>Cloudflare’s current dashboard flow creates a remotely-managed tunnel, installs <code>cloudflared</code> on the origin server, then publishes an application route to the local service URL.</li>
<li>Public exposure should be protected with Cloudflare Access or equivalent auth.</li>
</ul>
<p>Open questions:</p>
<ul>
<li>Which host will run Hermes WebUI?</li>
<li>Will WebUI run natively or in Docker?</li>
<li>What public hostname should be used?</li>
<li>Which Cloudflare Access identity provider/group should be allowed?</li>
<li>Does the deployment need scheduled/offline Hermes jobs, or only interactive WebUI chat?</li>
</ul>
<p>Decision pending:</p>
<ul>
<li>Native install is the default recommendation unless the host already standardizes on Docker Compose.</li>
<li>Cloudflare Tunnel should point to <code>http://localhost:8787</code> only when <code>cloudflared</code> and WebUI share the same host namespace.</li>
</ul>
<h2>Maintenance</h2>
<p>Update native install:</p>
<pre><code>cd ~/hermes-webui
git pull
./ctl.sh restart

</code></pre>
<p>Update Docker install:</p>
<pre><code>cd ~/hermes-webui
git pull
docker compose pull
docker compose up -d

</code></pre>
<p>Backup items to consider:</p>
<ul>
<li><code>~/.hermes</code></li>
<li>Hermes WebUI <code>.env</code></li>
<li>Workspace directories mounted into WebUI</li>
<li>Cloudflare tunnel/access policy notes</li>
</ul>
', 'PUBLISHED', '2026-06-25 00:00:00+00', '2026-06-25 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 37: OpenRouter Model
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (37, 1, FALSE, FALSE, '2026-06-27 00:00:00+00', '2026-06-27 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (37, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (37, 28) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    37, 37, 'en', 'openrouter-model', 'OpenRouter Model', 'model NSFW list [DeepSeek V3.2 - API Pricing &amp; Benchmarks](https://openrouter.ai/deepseek/deepseek-v3.2)',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"model NSFW list [DeepSeek V3.2 - API Pricing &amp; Benchmarks](https://openrouter.ai/deepseek/deepseek-v3.2)"}]}]}', '<p>model NSFW list
<a href="https://openrouter.ai/deepseek/deepseek-v3.2">DeepSeek V3.2 - API Pricing &amp; Benchmarks</a></p>
<p><a href="https://openrouter.ai/deepseek/deepseek-v4-pro">DeepSeek V4 Pro - API Pricing &amp; Benchmarks</a>
mistralai/mistral-nemo
<a href="https://openrouter.ai/mistralai/mistral-nemo">Mistral Nemo - API Pricing &amp; Providers</a>
sao10k/l3-lunaris-8b</p>
<p>Role play model</p>
<ul>
<li>aion-labs/aion-2.0</li>
<li><code>sao10k/l3-lunaris-8b</code>  cheap, small context 8k</li>
</ul>
<p>Free model</p>
<ul>
<li>text gen
<a href="https://openrouter.ai/openrouter/owl-alpha">Owl Alpha - API Pricing &amp; Providers</a></li>
</ul>
<p>Embeddeing</p>
<ul>
<li>perplexity/pplx-embed-v1-0.6b</li>
<li>nvidia/llama-nemotron-embed-vl-1b-v2:free</li>
<li>perplexity/pplx-embed-v1-0.6b</li>
</ul>
', 'PUBLISHED', '2026-06-27 00:00:00+00', '2026-06-27 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 38: The Missing Layer of AI Coding: Feedforward
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (38, 1, FALSE, FALSE, '2026-06-08 00:00:00+00', '2026-06-08 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (38, 10) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    38, 38, 'th', 'the-missing-layer-of-ai-coding-feedforward', 'The Missing Layer of AI Coding: Feedforward', 'ช่วงหลายปีที่ผ่านมา README.md เป็นเอกสารมาตรฐานของทุก repository มันอธิบายว่าโปรเจกต์นี้คืออะไร, รันอย่างไร, และพัฒนาอย่างไร แต่เมื่อ AI Agent กลายเป็นส่วนหนึ่งของทีมพัฒนา README.md เพียงอย่...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ช่วงหลายปีที่ผ่านมา README.md เป็นเอกสารมาตรฐานของทุก repository มันอธิบายว่าโปรเจกต์นี้คืออะไร, รันอย่างไร, และพัฒนาอย่างไร แต่เมื่อ AI Agent กลายเป็นส่วนหนึ่งของทีมพัฒนา README.md เพียงอย่..."}]}]}', '<h1>The Missing Layer of AI Coding: Feedforward</h1>
<blockquote>
<p>เราใช้เวลาหลายสิบปีในการสร้าง feedback loop สำหรับมนุษย์
แต่เรายังเพิ่งเริ่มสร้าง feedforward loop สำหรับ AI</p>
</blockquote>
<p>ช่วงหลายปีที่ผ่านมา <code>README.md</code> เป็นเอกสารมาตรฐานของทุก repository
มันอธิบายว่าโปรเจกต์นี้คืออะไร, รันอย่างไร, และพัฒนาอย่างไร
แต่เมื่อ AI Agent กลายเป็นส่วนหนึ่งของทีมพัฒนา <code>README.md</code> เพียงอย่างเดียวอาจไม่พออีกต่อไป</p>
<h2>ปัญหาที่เริ่มชัดขึ้น</h2>
<p>Developer ใหม่ที่เข้าทีมสามารถถามคำถามได้เสมอ:</p>
<ul>
<li>โค้ดส่วนนี้มีไว้ทำอะไร?</li>
<li>มีข้อห้ามอะไรบ้าง?</li>
<li>ควรใช้ pattern ไหน?</li>
<li>มี business rule อะไรที่สำคัญ?</li>
</ul>
<p>แต่ AI agent ไม่ได้มี privilege แบบเดียวกันเสมอไป
มันเห็นเพียง source code และ context ที่เราป้อนให้
ถ้า context ไม่ชัดเจน AI จะต้องเดา
และการเดาในระบบจริงมักแพงกว่าที่คิด</p>
<h2>Traditional Development vs AI-Native Development</h2>
<table>
<thead>
<tr>
<th align="left">Traditional Development   <br></th>
<th align="left">AI-Native Development   <br></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Developer อ่าน README   <br></td>
<td align="left">AI อ่าน <code>SKILL.md</code>   <br></td>
</tr>
<tr>
<td align="left">Developer เรียนรู้ convention   <br></td>
<td align="left">AI อ่าน agent rules   <br></td>
</tr>
<tr>
<td align="left">Code review   <br></td>
<td align="left">Automated feedback   <br></td>
</tr>
<tr>
<td align="left">Unit test   <br></td>
<td align="left">Unit test   <br></td>
</tr>
<tr>
<td align="left">Integration test   <br></td>
<td align="left">Integration test   <br></td>
</tr>
<tr>
<td align="left">Architecture guideline   <br></td>
<td align="left">Skill definition   <br></td>
</tr>
</tbody>
</table>
<p>นี่คือความต่างที่สำคัญ:
traditional development ออกแบบเพื่อให้มนุษย์เรียนรู้ระบบได้เร็ว
แต่ AI-native development ต้องออกแบบเพื่อให้ทั้งมนุษย์และ agent เข้าใจบริบทได้แม่น</p>
<h2>Feedforward และ Feedback</h2>
<p>ผมเริ่มมองว่าการทำงานร่วมกับ AI ต้องมีวงจรสองส่วน</p>
<h3>Feedforward</h3>
<p>ข้อมูลที่ส่งให้ AI ก่อนเริ่มทำงาน เช่น:</p>
<ul>
<li>Agent rules</li>
<li>Coding standards</li>
<li>Architecture principles</li>
<li>Business constraints</li>
<li>Domain knowledge</li>
<li><code>SKILL.md</code></li>
</ul>
<p><code>SKILL.md</code> ไม่ได้อธิบายว่า repository คืออะไร
แต่บอกว่า repository นี้ &quot;ทำอะไรได้&quot; และ &quot;ควรทำงานอย่างไร&quot;</p>
<h3>Feedback</h3>
<p>ข้อมูลที่ส่งกลับไปให้ AI หลังจากสร้างโค้ด เช่น:</p>
<ul>
<li>Unit tests</li>
<li>Integration tests</li>
<li>End-to-end tests</li>
<li>Static analysis</li>
<li>Linting</li>
<li>Security scanning</li>
</ul>
<p>Feedback ช่วยบอก AI ว่า output ที่สร้างขึ้นถูกต้องหรือไม่
แต่ feedforward ช่วยลดโอกาสที่ AI จะสร้างสิ่งที่ผิดตั้งแต่แรก</p>
<h2>ทำไม SKILL.md จึงสำคัญ</h2>
<p><code>README.md</code> อธิบาย project
<code>SKILL.md</code> อธิบาย behavior
ตัวอย่างเช่นระบบ payment:</p>
<ul>
<li>รองรับ refund</li>
<li>ห้ามเรียก payment gateway โดยตรง</li>
<li>ต้องผ่าน <code>PaymentService</code> เสมอ</li>
<li>ทุก transaction ต้องมี audit log</li>
<li>ต้องรองรับ idempotency</li>
</ul>
<p>นี่คือข้อมูลที่ developer รุ่นเก่ารู้โดยสัญชาตญาณ
แต่ AI จะไม่มีทางรู้ ถ้าเราไม่เขียนมันไว้</p>
<h2>อนาคตของ Repository</h2>
<p>ในอนาคต repository อาจประกอบด้วย:</p>
<ul>
<li><code>README.md</code></li>
<li><code>CONTRIBUTING.md</code></li>
<li><code>ARCHITECTURE.md</code></li>
<li><code>SKILL.md</code></li>
<li><code>AGENTS.md</code></li>
</ul>
<p>repository จะไม่ได้ถูกออกแบบมาเพื่อมนุษย์อย่างเดียวอีกต่อไป
แต่จะถูกออกแบบมาเพื่อมนุษย์และ AI ที่ทำงานร่วมกัน
และคุณภาพของ AI coding จะขึ้นอยู่กับคุณภาพของ feedforward และ feedback loop มากกว่าความสามารถของโมเดลเพียงอย่างเดียว</p>
<h2>สรุป</h2>
<p>ทุกคนพูดถึง tests, review, และ feedback กันมาก
แต่มีคนน้อยมากที่พูดถึง feedforward
ทั้งที่ในทางปฏิบัติ คุณภาพของ AI มักถูกกำหนดก่อนที่มันจะเริ่มเขียนโค้ดเสียอีก
ถ้าทีมต้องการ AI-native development จริง ๆ
สิ่งที่ต้องทำไม่ใช่แค่เลือก model ที่เก่งขึ้น
แต่ต้องออกแบบ repository, rules, และ skill definition ให้ดีพอ
เพราะในยุคนี้ คำถามไม่ใช่แค่ว่า &quot;AI เขียนโค้ดได้ไหม&quot;
แต่คือ &quot;ระบบของเราสอน AI ให้เขียนโค้ดถูกตั้งแต่ต้นหรือยัง&quot;</p>
', 'PUBLISHED', '2026-06-08 00:00:00+00', '2026-06-08 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 39: CloudEvents
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (39, 1, TRUE, FALSE, '2026-10-05 00:00:00+00', '2026-10-05 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (39, 2) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (39, 30) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (39, 31) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (39, 14) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    39, 39, 'en', 'cloudevents', 'CloudEvents', 'CloudEvents is a CNCF specification for describing event data in a common way. It standardizes the event envelope and context metadata, helping producers, consumers, routers, and other infra...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"CloudEvents is a CNCF specification for describing event data in a common way. It standardizes the event envelope and context metadata, helping producers, consumers, routers, and other infra..."}]}]}', '<h1>CloudEvents</h1>
<h2>What it is</h2>
<p>CloudEvents is a CNCF specification for describing event data in a common way. It standardizes the <strong>event envelope and context metadata</strong>, helping producers, consumers, routers, and other infrastructure exchange event information across services and platforms. It does not prescribe a message broker, transport, business meaning, or processing model. [1][2]</p>
<p>An event consists of:</p>
<ul>
<li><strong>Context attributes</strong>: metadata that identifies and describes the event.</li>
<li><strong>Data</strong>: the application-specific payload, when present.</li>
</ul>
<p>The context can be useful to infrastructure even when it does not understand the payload—for example, to filter or route events by their type. [1][2]</p>
<h2>History and milestones</h2>
<p>CloudEvents grew from a CNCF effort to make event descriptions interoperable across services and platforms. Its development moved from a CNCF Sandbox project to a stable core specification, then expanded through additional formats, protocol bindings, SDKs, and related specifications. [6]</p>
<table>
<thead>
<tr>
<th>Date</th>
<th>Milestone</th>
</tr>
</thead>
<tbody>
<tr>
<td>2018-05-15</td>
<td>Accepted into the CNCF Sandbox.</td>
</tr>
<tr>
<td>2019-10-24</td>
<td>Moved to CNCF Incubation and released the core specification v1.0.</td>
</tr>
<tr>
<td>2022-02-05</td>
<td>CloudEvents specifications v1.0.2 released, with clarifications and updates to related deliverables.</td>
</tr>
<tr>
<td>2024-01-25</td>
<td>Graduated as a CNCF project.</td>
</tr>
<tr>
<td>2024-06 / 2024-07</td>
<td>CESQL v1.0 was approved in June; the project announced its release on July 15. CESQL adds a SQL-like way to express predicates over CloudEvents, including for filtering.</td>
</tr>
</tbody>
</table>
<p>The CNCF maturity milestones describe the project''s status in the foundation; they do not mean that every optional binding, SDK, or related specification has the same maturity or feature coverage. [5][6][7][8][9]</p>
<h2>Core attributes</h2>
<table>
<thead>
<tr>
<th>Attribute</th>
<th>Required?</th>
<th>Meaning</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>specversion</code></td>
<td>Yes</td>
<td>CloudEvents specification version used by this event, currently commonly <code>1.0</code>.</td>
</tr>
<tr>
<td><code>id</code></td>
<td>Yes</td>
<td>Identifies this event. It must be unique within the scope of its <code>source</code>; together, <code>source</code> + <code>id</code> identify each distinct event.</td>
</tr>
<tr>
<td><code>source</code></td>
<td>Yes</td>
<td>Identifies the context in which the event happened, usually a URI-reference. It is not the consumer''s destination address.</td>
</tr>
<tr>
<td><code>type</code></td>
<td>Yes</td>
<td>Identifies the kind of event, commonly a reverse-DNS-style name such as <code>com.example.order.created</code>.</td>
</tr>
<tr>
<td><code>datacontenttype</code></td>
<td>No</td>
<td>Media type of the <code>data</code>, such as <code>application/json</code>.</td>
</tr>
<tr>
<td><code>dataschema</code></td>
<td>No</td>
<td>URI identifying the schema to which the <code>data</code> conforms.</td>
</tr>
<tr>
<td><code>subject</code></td>
<td>No</td>
<td>The subject of the event within the context of its <code>source</code>.</td>
</tr>
<tr>
<td><code>time</code></td>
<td>No</td>
<td>Timestamp for when the occurrence happened, represented in RFC 3339 format.</td>
</tr>
</tbody>
</table>
<p>An event may also include extension attributes for application- or domain-specific context. Extension names use lowercase ASCII letters and digits and follow the CloudEvents type system. [1]</p>
<h2>Example: JSON event</h2>
<pre><code class="language-json">{
  &quot;specversion&quot;: &quot;1.0&quot;,
  &quot;id&quot;: &quot;evt-7842&quot;,
  &quot;source&quot;: &quot;urn:example:orders&quot;,
  &quot;type&quot;: &quot;com.example.order.created&quot;,
  &quot;subject&quot;: &quot;orders/7842&quot;,
  &quot;time&quot;: &quot;2026-10-05T09:30:00Z&quot;,
  &quot;datacontenttype&quot;: &quot;application/json&quot;,
  &quot;data&quot;: {
    &quot;orderId&quot;: &quot;7842&quot;,
    &quot;total&quot;: 1250
  }
}
</code></pre>
<p>The JSON event format represents core attributes as top-level members. The JSON format''s media type is <code>application/cloudevents+json</code>. The <code>data</code> field carries the domain payload; the envelope format and the payload''s content type are separate concerns. When the payload is binary and the event is represented as JSON, use <code>data_base64</code> for its Base64-encoded value; <code>data</code> and <code>data_base64</code> are mutually exclusive. [3]</p>
<h2>Keep the layers distinct</h2>
<table>
<thead>
<tr>
<th>Layer</th>
<th>Question it answers</th>
<th>Example</th>
</tr>
</thead>
<tbody>
<tr>
<td>CloudEvents context</td>
<td>What kind of event is this, and where did it happen?</td>
<td><code>type</code>, <code>source</code>, <code>id</code></td>
</tr>
<tr>
<td>Event format</td>
<td>How is the event serialized?</td>
<td>CloudEvents JSON format</td>
</tr>
<tr>
<td>Protocol binding</td>
<td>How is the event carried by a transport?</td>
<td>HTTP binding, using headers/body or a structured body</td>
</tr>
<tr>
<td>SDK</td>
<td>What library helps application code create or read events?</td>
<td>A language-specific CloudEvents SDK</td>
</tr>
</tbody>
</table>
<p>For example, the HTTP binding defines <strong>binary mode</strong>, where context attributes are conveyed using HTTP headers and the event data is carried in the body; <strong>structured mode</strong>, where the body contains the complete event in a chosen event format; and <strong>batched mode</strong>, where multiple events are carried as a batch. [3][4] In binary mode, the regular HTTP <code>Content-Type</code> describes the event data; do not also send a <code>ce-datacontenttype</code> header. “Binary mode” describes where metadata and data are carried, not whether the payload itself is binary. [4] SDKs provide implementation helpers; they do not replace the specification or the transport. [5]</p>
<h3>Same event over HTTP: structured and binary</h3>
<p>These requests carry the same CloudEvent.</p>
<p><strong>Structured mode</strong> puts context and data together in the body. The <code>Content-Type</code> identifies the CloudEvents JSON event format:</p>
<pre><code class="language-http">POST /events HTTP/1.1
Host: consumer.example
Content-Type: application/cloudevents+json

{
  &quot;specversion&quot;: &quot;1.0&quot;,
  &quot;id&quot;: &quot;evt-7842&quot;,
  &quot;source&quot;: &quot;urn:example:orders&quot;,
  &quot;type&quot;: &quot;com.example.order.created&quot;,
  &quot;subject&quot;: &quot;orders/7842&quot;,
  &quot;datacontenttype&quot;: &quot;application/json&quot;,
  &quot;data&quot;: { &quot;orderId&quot;: &quot;7842&quot;, &quot;total&quot;: 1250 }
}
</code></pre>
<p><strong>Binary mode</strong> puts attributes in <code>ce-</code> headers and the application payload alone in the body. The regular HTTP <code>Content-Type</code> maps to <code>datacontenttype</code>:</p>
<pre><code class="language-http">POST /events HTTP/1.1
Host: consumer.example
ce-specversion: 1.0
ce-id: evt-7842
ce-source: urn:example:orders
ce-type: com.example.order.created
ce-subject: orders/7842
Content-Type: application/json

{ &quot;orderId&quot;: &quot;7842&quot;, &quot;total&quot;: 1250 }
</code></pre>
<p>An HTTP consumer determines the content mode from <code>Content-Type</code>, decodes the event using that mode and format, then validates the event type and payload before processing. The HTTP binding defines mapping; it does not define what an application should do after receiving the event. [4]</p>
<p>For HTTP batching, the receiver must solicit batched mode; a batch is only a packaging/transport convenience and does not define event ordering or business meaning. [2][4]</p>
<h2>Typical event flow</h2>
<ol>
<li>A <strong>producer</strong> creates an event describing an occurrence.</li>
<li>The event is sent using a protocol, optionally through a broker, router, or other intermediary.</li>
<li>An intermediary may route or filter based on context attributes.</li>
<li>A <strong>consumer</strong> interprets the event and its payload to perform application work.</li>
</ol>
<p>CloudEvents standardizes the event description and its representation. It does not require an intermediary, nor does it define delivery guarantees or application processing. [1][2]</p>
<h2>Designing a useful event contract</h2>
<p>For an <code>order.created</code> event, a reasonable starting point is:</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Example</th>
<th>Design question</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>source</code></td>
<td><code>urn:example:orders</code></td>
<td>Which source context owns this occurrence? Keep it stable and meaningful.</td>
</tr>
<tr>
<td><code>type</code></td>
<td><code>com.example.order.created</code></td>
<td>What fact happened? Use a clear, producer-defined name.</td>
</tr>
<tr>
<td><code>id</code></td>
<td><code>evt-7842</code></td>
<td>How will this event be uniquely identified within its source, including when it is retried?</td>
</tr>
<tr>
<td><code>subject</code></td>
<td><code>orders/7842</code></td>
<td>Which entity did the occurrence concern?</td>
</tr>
<tr>
<td><code>time</code></td>
<td>RFC 3339 timestamp</td>
<td>Which consistent rule will the producer use for occurrence time?</td>
</tr>
<tr>
<td><code>dataschema</code></td>
<td>URI to a schema</td>
<td>Where is the payload contract described, if a schema URI is useful?</td>
</tr>
</tbody>
</table>
<p>Keep routing metadata in context only when infrastructure or consumers need it for generic routing/filtering; keep domain details in <code>data</code>. For evolution, document the compatibility promise for each <code>type</code>. The CloudEvents Primer recommends keeping <code>type</code> stable for backward-compatible payload changes and generally changing it for backward-incompatible changes; incompatible schema changes should also be reflected by a different <code>dataschema</code> URI when that attribute is used. These are design recommendations, not automatic schema enforcement. [1][2]</p>
<p>For example, adding an optional field with a safe default may be compatible for a particular schema format and consumer set; renaming a field or changing its type may not be. Compatibility depends on the schema format and the old/new readers, so validate changes with the schema tooling used by the system rather than relying on CloudEvents alone. [2][12]</p>
<h2>What CloudEvents does not provide</h2>
<ul>
<li>It does not define the business meaning or schema of an application''s <code>data</code>; teams still need an event contract and a compatibility strategy. <code>type</code> identifies an event kind but is not a complete schema.</li>
<li><code>source</code> describes event origin/context, not where to send the event.</li>
<li>It does not itself guarantee ordering, exactly-once delivery, persistence, or duplicate-free processing. <code>source</code> + <code>id</code> gives an identity that consumers may use when implementing deduplication, but the delivery behavior belongs to the surrounding system.</li>
<li>A partition-key extension or broker-specific partitioning can help a system route related events consistently, but does not by itself create an ordering guarantee. Ordering depends on the binding, broker, and consumer processing strategy.</li>
<li>It is not a broker, security protocol, or authorization mechanism. Security, integrity, confidentiality, and persistence are outside the core specification''s scope. [1][2]</li>
<li>It does not prescribe the consumer''s retry, acknowledgement, dead-letter, replay, or idempotency policy.</li>
</ul>
<h3>Operational checklist (application and broker responsibilities)</h3>
<ul>
<li>Assume a delivery system may retry or redeliver; make side effects idempotent where required. <code>(source, id)</code> is a useful deduplication key, but the consumer needs durable deduplication state if it must survive restarts. [1][2]</li>
<li>Decide retry/backoff, timeout, acknowledgement, dead-letter, and replay behavior for the chosen protocol/broker. Specify how operators can inspect and safely replay failed events.</li>
<li>Define ordering requirements explicitly. If using keys/partitions, understand the chosen broker''s ordering scope and consumer concurrency; a CloudEvents partition-key extension alone does not guarantee processing order.</li>
<li>Secure the transport and endpoints, authenticate/authorize producers and consumers, validate event types and payloads, and avoid putting secrets or unnecessary sensitive data in attributes or payloads. CloudEvents does not mandate these controls. [2][4]</li>
</ul>
<h2>Reading the wider ecosystem</h2>
<p>CloudEvents has related specifications and extensions, but distinguish them from the core event envelope. Event formats define serialization, and protocol bindings describe how CloudEvents are mapped to transports. An extension adds context attributes; it does not automatically make a broker enforce authorization, ordering, or other behavior. Verify each extension''s status and semantics in its own specification before depending on it. [2][3][4]</p>
<table>
<thead>
<tr>
<th>Technology</th>
<th>Main job</th>
<th>Relationship to CloudEvents</th>
</tr>
</thead>
<tbody>
<tr>
<td>CloudEvents</td>
<td>Standardize runtime event context and its representation.</td>
<td>The event envelope/context, including <code>id</code>, <code>source</code>, and <code>type</code>.</td>
</tr>
<tr>
<td>Kafka record</td>
<td>Carry a key, value, and headers in Kafka''s log/transport model.</td>
<td>The CloudEvents Kafka binding maps context attributes to Kafka record headers (with the binding-specific <code>ce_</code> prefix) and event data to the record value. This differs from HTTP''s <code>ce-</code> header prefix. Kafka is a transport/log, not an alternative definition of the CloudEvents contract.</td>
</tr>
<tr>
<td>AsyncAPI</td>
<td>Describe a message-driven API as a machine-readable contract: servers, channels, operations, messages, and schemas.</td>
<td>Documents how an application sends/receives messages; it can describe messages whose runtime envelope uses CloudEvents.</td>
</tr>
<tr>
<td>Schema Registry</td>
<td>Store/manage schema versions and optionally enforce configured compatibility rules.</td>
<td>Governs the <code>data</code> payload schema; it complements rather than replaces CloudEvents. Compatibility policies and behavior are registry- and format-specific.</td>
</tr>
</tbody>
</table>
<p>This is a division of responsibilities, not a required architecture. A system can use CloudEvents without Kafka, AsyncAPI, or a schema registry. [10][11][12]</p>
<h2>Version note</h2>
<p>The project publishes CloudEvents specification version 1.0.2, which is compatible with CloudEvents v1.0. The event''s <code>specversion</code> value identifies the specification version as <code>1.0</code>; patch revisions to the specification do not change that value. [1][2]</p>
<h2>Future direction (status snapshot)</h2>
<p>The project roadmap does <strong>not</strong> promise a date for a future core release: it says remaining issues and pull requests will be examined and that the timing and version of future releases will depend on the changes approved. [7]</p>
<p>As listed in the project repository on 2026-10-05, the core specification''s latest release is v1.0.2, with work-in-progress material also present. The same repository lists CESQL v1.0.0 and a work-in-progress draft, a Subscriptions specification as work in progress, and says the Registry and Pagination specifications have moved to the xRegistry repository. These are project-status signals, not guarantees that a given draft will ship or that it will be part of a future CloudEvents core version. [6]</p>
<p>The practical direction is continued work around interoperability beyond the core envelope—such as portable filtering, subscriptions, event formats, protocol bindings, and registry-related work—while retaining the core idea of common event metadata. For a current status, check the repository''s release table and roadmap rather than assuming a specific v2 or release date. [6][7][9]</p>
<h2>Sources</h2>
<ol>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md">CloudEvents Specification v1.0.2</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md">CloudEvents Primer v1.0.2</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/formats/json-format.md">JSON Event Format v1.0.2</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/http-protocol-binding.md">HTTP Protocol Binding v1.0.2</a></li>
<li><a href="https://cloudevents.io/">CloudEvents project site and SDKs</a></li>
<li><a href="https://github.com/cloudevents/spec">CloudEvents specification repository README and release/status table</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/main/docs/ROADMAP.md">CloudEvents project roadmap</a></li>
<li><a href="https://cloudevents.io/blog/2024-01-25/">CloudEvents has Graduated! (project announcement, 2024-01-25)</a></li>
<li><a href="https://cloudevents.io/blog/2024-07-15/">CloudEvents SQL Reached V1! (project announcement, 2024-07-15)</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/kafka-protocol-binding.md">CloudEvents Kafka Protocol Binding v1.0.2</a></li>
<li><a href="https://www.asyncapi.com/docs/concepts/asyncapi-document">AsyncAPI document concepts</a></li>
<li><a href="https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html">Confluent Schema Registry: Schema Evolution and Compatibility</a></li>
</ol>
<h2>Related writing</h2>
<ul>
<li>CloudEvents คืออะไร - รูปแบบกลางที่ทำให้ระบบเข้าใจ Event ตรงกัน</li>
</ul>
', 'PUBLISHED', '2026-10-05 00:00:00+00', '2026-10-05 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 40: Event Storm
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (40, 1, FALSE, FALSE, '2024-06-01 00:00:00+00', '2024-06-01 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (40, 2) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    40, 40, 'en', 'event-storm', 'Event Storm', 'Technical notes and documentation from knowledge vault.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical notes and documentation from knowledge vault."}]}]}', '<p>pre-requirement:</p>
<ul>
<li>Post-it</li>
</ul>
<p>Starting guided:</p>
<ul>
<li>Ask questions 3-5 to initiate the event</li>
<li>Find event</li>
</ul>
<p>Set Characteristic
Apply Architecture style following Characteristic</p>
<ul>
<li>Monlite</li>
<li>Distributed</li>
</ul>
<p>Architecture style Topologie</p>
<ul>
<li>Component</li>
<li>Data</li>
<li>Deployment</li>
<li>communication</li>
</ul>
<p>Pilow</p>
<ol>
<li>Why &gt; How</li>
<li>Solution between 2 extremes</li>
<li>Everything is a thread off</li>
</ol>
<p>Architecture Characteristic -&gt; Architecture Style -&gt; Topology</p>
<p>หา กำไลขาดทุน</p>
', 'PUBLISHED', '2024-06-01 00:00:00+00', '2024-06-01 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 41: Software Architecture
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (41, 1, FALSE, FALSE, '2024-06-01 00:00:00+00', '2024-06-01 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (41, 2) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    41, 41, 'en', 'software-architecture', 'Software Architecture', 'Technical notes and documentation from knowledge vault.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical notes and documentation from knowledge vault."}]}]}', '<p>Faciliator</p>
<ul>
<li>Event Storming</li>
<li>User storytelling</li>
<li>Domain story telling</li>
</ul>
', 'PUBLISHED', '2024-06-01 00:00:00+00', '2024-06-01 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 42: CloudEvents คืออะไร: รูปแบบกลางที่ทำให้ระบบเข้าใจ Event ตรงกัน
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (42, 1, TRUE, FALSE, '2026-10-05 00:00:00+00', '2026-10-05 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (42, 2) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (42, 14) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (42, 31) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (42, 32) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    42, 42, 'th', 'cloudevents-th', 'CloudEvents คืออะไร: รูปแบบกลางที่ทำให้ระบบเข้าใจ Event ตรงกัน', 'ทำความรู้จัก CloudEvents มาตรฐานเปิดสำหรับอธิบาย event ด้วย metadata ที่สม่ำเสมอ พร้อมแยกความต่างระหว่าง event format, protocol binding และ SDK รวมถึงขอบเขตที่ CloudEvents ไม่ได้ครอบคลุม',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ทำความรู้จัก CloudEvents มาตรฐานเปิดสำหรับอธิบาย event ด้วย metadata ที่สม่ำเสมอ พร้อมแยกความต่างระหว่าง event format, protocol binding และ SDK รวมถึงขอบเขตที่ CloudEvents ไม่ได้ครอบคลุม"}]}]}', '<h1>CloudEvents คืออะไร: รูปแบบกลางที่ทำให้ระบบเข้าใจ Event ตรงกัน</h1>
<p>เมื่อบริการต่าง ๆ ในระบบต้องสื่อสารกัน เหตุการณ์หนึ่งอาจเกิดในบริการสั่งซื้อ แล้วต้องถูกส่งต่อให้ระบบชำระเงิน คลังสินค้า หรือระบบแจ้งเตือน แต่ละบริการอาจตั้งชื่อและจัดโครงสร้าง event ต่างกัน ผู้พัฒนาจึงต้องเขียนตัวแปลงหรือเงื่อนไขเฉพาะสำหรับผู้ส่งแต่ละราย</p>
<p><strong>CloudEvents</strong> เป็นข้อกำหนดเปิดจาก Cloud Native Computing Foundation (CNCF) ที่ช่วยให้ระบบอธิบาย event ด้วยโครงสร้าง metadata ที่สม่ำเสมอ เป้าหมายคือช่วยให้บริการและโครงสร้างพื้นฐานเข้าใจบริบทของ event ได้ตรงกัน แม้จะทำงานบนแพลตฟอร์มหรือเทคโนโลยีคนละชุดกัน [1][2]</p>
<h2>Event หนึ่งรายการประกอบด้วยอะไร?</h2>
<p>CloudEvents แยกข้อมูลออกเป็นสองส่วนหลัก:</p>
<ul>
<li><strong>บริบทของ event (context)</strong> เช่น event มาจากที่ใด เป็นเหตุการณ์ชนิดไหน และมีรหัสอะไร</li>
<li><strong>ข้อมูลเหตุการณ์ (<code>data</code>)</strong> ซึ่งเก็บรายละเอียดเฉพาะของแอปพลิเคชัน เช่น ข้อมูลคำสั่งซื้อที่เพิ่งถูกสร้าง</li>
</ul>
<p>attributes ที่จำเป็นมี 4 ตัว:</p>
<ul>
<li><code>specversion</code> ระบุเวอร์ชันของ CloudEvents ที่ event ใช้</li>
<li><code>id</code> ระบุตัว event โดยต้องไม่ซ้ำภายในขอบเขตของ <code>source</code>; เมื่อนำ <code>source</code> กับ <code>id</code> มาพิจารณาคู่กัน จะระบุ event ที่แตกต่างกันได้</li>
<li><code>source</code> ระบุบริบทหรือแหล่งกำเนิดของ event</li>
<li><code>type</code> ระบุชนิดของเหตุการณ์ เช่น <code>com.example.order.created</code></li>
</ul>
<p>ส่วน <code>subject</code>, <code>time</code>, <code>datacontenttype</code> และ <code>dataschema</code> เป็น attributes ที่เลือกใช้ได้ และยังเพิ่ม extension attributes เพื่อใส่บริบทอื่นที่ระบบต้องการได้ด้วย [1]</p>
<p>ตัวอย่าง CloudEvent ในรูปแบบ JSON:</p>
<pre><code class="language-json">{
  &quot;specversion&quot;: &quot;1.0&quot;,
  &quot;id&quot;: &quot;evt-7842&quot;,
  &quot;source&quot;: &quot;urn:example:orders&quot;,
  &quot;type&quot;: &quot;com.example.order.created&quot;,
  &quot;subject&quot;: &quot;orders/7842&quot;,
  &quot;time&quot;: &quot;2026-10-05T09:30:00Z&quot;,
  &quot;datacontenttype&quot;: &quot;application/json&quot;,
  &quot;data&quot;: {
    &quot;orderId&quot;: &quot;7842&quot;,
    &quot;total&quot;: 1250
  }
}
</code></pre>
<p>ในตัวอย่าง <code>type</code> ช่วยให้ระบบรู้ว่าเกิดเหตุการณ์สร้างคำสั่งซื้อ ขณะที่ <code>data</code> มีรายละเอียดคำสั่งซื้อนั้น แยกหน้าที่กันชัดเจน: metadata อธิบาย event ส่วน payload คือข้อมูลที่แอปพลิเคชันต้องนำไปใช้ [1][3]</p>
<h2>จากมาตรฐาน v1.0 สู่โครงการ CNCF Graduated</h2>
<p>CloudEvents เริ่มจากความพยายามแก้ปัญหาที่แต่ละบริการและแพลตฟอร์มอธิบาย event ไม่เหมือนกัน โครงการค่อย ๆ พัฒนาจากข้อกำหนดกลางไปสู่เอกสาร format, protocol bindings และ SDK ที่ช่วยให้ระบบนำแนวคิดเดียวกันไปใช้ได้หลายภาษาและหลาย transport [6]</p>
<p>หมุดหมายสำคัญของโครงการมีดังนี้:</p>
<ul>
<li><strong>15 พฤษภาคม 2018:</strong> ได้รับการรับเข้าเป็น CNCF Sandbox project</li>
<li><strong>24 ตุลาคม 2019:</strong> เลื่อนเป็น CNCF Incubation project และเผยแพร่ core specification v1.0</li>
<li><strong>5 กุมภาพันธ์ 2022:</strong> เผยแพร่ specification v1.0.2 ซึ่งเพิ่มคำชี้แจงและปรับปรุงเอกสารที่เกี่ยวข้อง [5][6]</li>
<li><strong>25 มกราคม 2024:</strong> ได้รับสถานะ CNCF Graduated</li>
<li><strong>มิถุนายน–กรกฎาคม 2024:</strong> CESQL v1.0 ผ่านการอนุมัติในเดือนมิถุนายน และมีประกาศการเผยแพร่วันที่ 15 กรกฎาคม เป็นภาษา SQL-like สำหรับเขียนเงื่อนไขบน CloudEvents เช่น การกรอง event [6][7][8][9]</li>
</ul>
<p>สถานะ Graduated สะท้อนวุฒิภาวะของโครงการใน CNCF ไม่ได้หมายความว่า SDK, binding และข้อกำหนดเสริมทุกตัวจะมีสถานะหรือความสามารถเท่ากัน [6][8]</p>
<h2>JSON, HTTP และ SDK เป็นคนละชั้นกัน</h2>
<p>CloudEvents มักถูกพูดถึงพร้อม JSON หรือ HTTP จนอาจดูเหมือนเป็นสิ่งเดียวกัน แต่จริง ๆ แล้วเป็นคนละชั้น:</p>
<ol>
<li><strong>Event format</strong> กำหนดวิธีแปลง CloudEvent เป็นรูปแบบข้อมูล เช่น JSON format</li>
<li><strong>Protocol binding</strong> กำหนดวิธีส่ง event ผ่าน protocol เช่น HTTP binding</li>
<li><strong>SDK</strong> คือไลบรารีที่ช่วยให้โค้ดสร้าง อ่าน หรือ serialize CloudEvent ได้สะดวกขึ้น</li>
</ol>
<p>ตัวอย่างเช่น HTTP binding กำหนดสาม content modes ได้แก่ binary, structured และ batched: binary mode ส่ง context attributes ผ่าน HTTP headers และวาง event data ใน body; structured mode ส่ง CloudEvent ทั้งก้อนใน body ตาม event format ที่เลือกใช้; ส่วน batched mode ใช้ส่งหลาย event ใน batch เดียว [3][4]</p>
<p>คำว่า <strong>binary mode ไม่ได้แปลว่า payload ต้องเป็นข้อมูลไบนารี</strong> แต่หมายถึงการแยก metadata ไว้ใน headers และ payload ไว้ใน body ในโหมดนี้ HTTP <code>Content-Type</code> ระบุชนิดของ payload และไม่ควรส่ง <code>ce-datacontenttype</code> ซ้ำอีก ส่วนกรณี payload เป็นข้อมูลไบนารีใน JSON event format ให้ใช้ <code>data_base64</code> สำหรับค่า Base64 แทน <code>data</code> [3][4]</p>
<p>การเลือกใช้ SDK ไม่ได้เปลี่ยน CloudEvents ให้เป็น protocol หรือ message broker [5]</p>
<h3>Event เดียวกันใน HTTP สองรูปแบบ</h3>
<p>ทั้งสอง request ด้านล่างส่ง event เดียวกัน แต่จัดวางข้อมูลต่างกัน [4]</p>
<p><strong>Structured mode</strong> ใส่ metadata และ payload ไว้ใน body เดียว:</p>
<pre><code class="language-http">POST /events HTTP/1.1
Host: consumer.example
Content-Type: application/cloudevents+json

{
  &quot;specversion&quot;: &quot;1.0&quot;,
  &quot;id&quot;: &quot;evt-7842&quot;,
  &quot;source&quot;: &quot;urn:example:orders&quot;,
  &quot;type&quot;: &quot;com.example.order.created&quot;,
  &quot;subject&quot;: &quot;orders/7842&quot;,
  &quot;datacontenttype&quot;: &quot;application/json&quot;,
  &quot;data&quot;: { &quot;orderId&quot;: &quot;7842&quot;, &quot;total&quot;: 1250 }
}
</code></pre>
<p><strong>Binary mode</strong> ใส่ attributes ใน <code>ce-</code> headers และใส่เฉพาะ payload ใน body โดย <code>Content-Type</code> บอกชนิดของ payload:</p>
<pre><code class="language-http">POST /events HTTP/1.1
Host: consumer.example
ce-specversion: 1.0
ce-id: evt-7842
ce-source: urn:example:orders
ce-type: com.example.order.created
ce-subject: orders/7842
Content-Type: application/json

{ &quot;orderId&quot;: &quot;7842&quot;, &quot;total&quot;: 1250 }
</code></pre>
<p>consumer อ่าน <code>Content-Type</code> เพื่อเลือกวิธี decode ก่อนตรวจ <code>type</code> และ payload ตามสัญญาที่ตกลงกัน CloudEvents กำหนดวิธี map event เข้ากับ HTTP แต่ไม่ได้กำหนดขั้นตอนประมวลผลของแอปพลิเคชัน [4]</p>
<p>สำหรับ HTTP batched mode ผู้รับต้องร้องขอหรือยินยอมให้ใช้โหมดนี้ก่อน และ batch เป็นเพียงวิธีจัดส่งหลาย event ไม่ได้กำหนดลำดับหรือความหมายทางธุรกิจให้ event [2][4]</p>
<h2>Event เดินทางอย่างไร?</h2>
<p>โดยทั่วไป producer สร้าง event เมื่อมีสิ่งที่น่าสนใจเกิดขึ้น จากนั้นส่งผ่าน protocol ที่ระบบเลือกไว้ บางระบบมี broker หรือ router ช่วยกรองและส่งต่อ event ก่อนถึง consumer เมื่อได้รับ event แล้ว consumer ใช้ context และ payload เพื่อทำงานต่อ</p>
<p>ประโยชน์อย่างหนึ่งของ context attributes คือ middleware อาจกรองหรือ route event จาก <code>type</code> หรือ <code>source</code> ได้ โดยไม่ต้องเข้าใจรายละเอียดภายใน payload ทุกชนิด จึงช่วยลดการผูกติดระหว่างผู้ผลิตกับผู้รับ และทำให้เชื่อมระบบต่างแพลตฟอร์มได้สะดวกขึ้น [2]</p>
<p>อย่างไรก็ตาม การมี broker ไม่ใช่เงื่อนไขของ CloudEvents ระบบยังเลือกใช้รูปแบบการส่งและโครงสร้างพื้นฐานได้ตามต้องการ [1][2]</p>
<h2>สิ่งที่ CloudEvents ไม่ได้ทำ</h2>
<p>CloudEvents ไม่ได้เป็น message broker และไม่ได้กำหนดว่าจะส่ง event ไปยังปลายทางใด ค่า <code>source</code> บอกบริบทต้นทาง ไม่ใช่ที่อยู่ของ consumer นอกจากนี้ CloudEvents ไม่ได้กำหนดความหมายทางธุรกิจหรือ schema ของ <code>data</code> ให้ ทีมพัฒนายังคงต้องออกแบบสัญญาของ payload และวิธีเปลี่ยน schema ให้ผู้รับเข้าใจตรงกัน [1][2]</p>
<p>ข้อกำหนดนี้ยังไม่ได้รับประกันการส่งแบบ exactly-once, ลำดับการส่ง, การป้องกันข้อมูลซ้ำ หรือระบบ authorization และ encryption ให้โดยอัตโนมัติ <code>source</code> กับ <code>id</code> ช่วยระบุตัว event และนำไปใช้ประกอบการตรวจ event ซ้ำได้ แต่การรับประกันเหล่านั้นขึ้นกับระบบส่งข้อความและการประมวลผลที่นำมาใช้ [1][2] เช่นเดียวกัน extension อย่าง partition key อาจช่วยให้ broker เลือก partition ได้ตามที่ออกแบบ แต่ตัว extension เองไม่ได้รับประกันลำดับการประมวลผล</p>
<p>CloudEvents ยังมีข้อกำหนดที่เกี่ยวข้อง เช่น event formats สำหรับ serialization และ protocol bindings สำหรับการส่งผ่าน transport ต่าง ๆ ซึ่งเป็นคนละส่วนกับ core envelope ส่วน extension ใช้เพิ่ม context attributes แต่ไม่ได้ทำให้ broker บังคับใช้ authorization หรือลำดับ event โดยอัตโนมัติ ควรตรวจสถานะและความหมายของแต่ละข้อกำหนดหรือ extension จากเอกสารของส่วนนั้นโดยตรง [2][3][4]</p>
<h2>ออกแบบ event contract อย่างไร?</h2>
<p>สำหรับ <code>order.created</code> ลองเริ่มจากคำถามเหล่านี้:</p>
<ul>
<li><code>source: urn:example:orders</code> — บริบทใดเป็นเจ้าของเหตุการณ์นี้?</li>
<li><code>type: com.example.order.created</code> — ข้อเท็จจริงอะไรเกิดขึ้น?</li>
<li><code>id: evt-7842</code> — จะระบุ event นี้ไม่ให้สับสนกับ event อื่นอย่างไร แม้มีการส่งซ้ำ?</li>
<li><code>subject: orders/7842</code> — เหตุการณ์นี้เกี่ยวกับ entity ใด?</li>
<li><code>time</code> — ใช้กติกาเดียวกันอย่างไรในการระบุเวลาที่ occurrence เกิดขึ้น?</li>
<li><code>dataschema</code> — จะชี้ไปยัง schema ของ <code>data</code> ที่ใด ถ้าต้องการระบุ schema URI?</li>
</ul>
<p>เก็บข้อมูลที่ระบบต้องใช้ routing/filtering ใน context เท่าที่จำเป็น และเก็บรายละเอียดทางธุรกิจไว้ใน <code>data</code> ส่วนการเปลี่ยน payload ต้องมีสัญญาความเข้ากันได้: โดยทั่วไปให้คง <code>type</code> เดิมเมื่อเปลี่ยนแบบ backward-compatible และเปลี่ยน <code>type</code> เมื่อเป็น breaking change; หากใช้ <code>dataschema</code> ก็ควรชี้ไป URI ใหม่เมื่อ schema เปลี่ยนแบบ incompatible ทั้งหมดนี้เป็นแนวทาง ไม่ใช่การตรวจ schema อัตโนมัติจาก CloudEvents [1][2]</p>
<h2>CloudEvents ต่างจาก Kafka, AsyncAPI และ Schema Registry อย่างไร?</h2>
<table>
<thead>
<tr>
<th>สิ่งนี้</th>
<th>หน้าที่หลัก</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CloudEvents</strong></td>
<td>ซอง event และ context metadata ที่ใช้ระหว่างระบบ เช่น <code>id</code>, <code>source</code>, <code>type</code></td>
</tr>
<tr>
<td><strong>Kafka record</strong></td>
<td>กลไกขนส่ง/จัดเก็บที่มี key, value และ headers; Kafka binding วาง CloudEvents attributes ใน headers โดยใช้ prefix <code>ce_</code> และ event data ใน value (ต่างจาก HTTP ที่ใช้ <code>ce-</code>)</td>
</tr>
<tr>
<td><strong>AsyncAPI</strong></td>
<td>เอกสาร contract แบบ machine-readable ที่อธิบาย servers, channels, operations, messages และ schemas</td>
</tr>
<tr>
<td><strong>Schema Registry</strong></td>
<td>เก็บ schema versions และอาจตรวจ compatibility ตาม policy ที่ตั้งไว้; ใช้ดูแล schema ของ payload ไม่ได้แทน event envelope</td>
</tr>
</tbody>
</table>
<p>จึงใช้ร่วมกันได้ แต่ไม่จำเป็นต้องใช้ทุกอย่าง และ compatibility rules แตกต่างตาม registry กับ schema format [10][11][12]</p>
<h2>งานปฏิบัติการที่ทีมระบบต้องกำหนด</h2>
<p>CloudEvents ไม่ได้เลือก retry, acknowledgement, dead-letter, replay หรือ idempotency policy ให้ [1][2] ในการใช้งานจริงควร:</p>
<ul>
<li>ออกแบบ consumer ให้ทำซ้ำได้อย่างปลอดภัยเมื่อระบบส่ง event ซ้ำ และใช้ <code>(source, id)</code> เป็นหนึ่งในกุญแจ deduplication หากเหมาะกับระบบ</li>
<li>กำหนด retry/backoff, timeout, acknowledgement, dead-letter และวิธี replay event ที่ล้มเหลว</li>
<li>เขียนข้อกำหนดเรื่องลำดับการประมวลผลให้ชัดเจน รวมถึงพิจารณา partition/key และ concurrency ของ consumer; partition key ไม่ได้รับประกัน ordering ด้วยตัวเอง</li>
<li>ดูแล TLS, authentication/authorization, validation และข้อมูลอ่อนไหวที่ใส่ใน attributes หรือ payload ตามความต้องการของระบบ เพราะ CloudEvents ไม่ได้กำหนดมาตรการเหล่านี้ [2][4]</li>
</ul>
<h2>แล้ว CloudEvents กำลังมุ่งไปทางไหน?</h2>
<p>สิ่งที่พูดได้จากเอกสารโครงการคือ CloudEvents ยังขยายงานรอบ ๆ core envelope เช่น format, protocol bindings, SDK และข้อกำหนดสำหรับการกรองหรือจัดการ subscription โดยในสถานะ repository ที่ตรวจเมื่อ <strong>5 ตุลาคม 2026</strong> core specification รุ่นล่าสุดที่ระบุคือ v1.0.2; มี CESQL v1.0.0 และมีรายการ CESQL กับ Subscriptions ที่ยังเป็น work in progress ส่วน Registry และ Pagination ย้ายไปอยู่ใน repository ของ xRegistry แล้ว [6]</p>
<p>อย่างไรก็ตาม roadmap ไม่ได้ระบุวันหรือรับรองว่าจะมี CloudEvents v2 เมื่อใด โดยระบุว่าการออก release ถัดไปและช่วงเวลาจะพิจารณาจาก issue/PR ที่เหลือและการเปลี่ยนแปลงที่ได้รับอนุมัติ ดังนั้นควรมองรายการ WIP เป็นงานที่กำลังพัฒนา ไม่ใช่คำมั่นว่าจะออกใน release ถัดไป [6][7]</p>
<h2>สรุป</h2>
<p>CloudEvents คือ <strong>รูปแบบมาตรฐานสำหรับซองและ metadata ของ event</strong> ไม่ใช่ payload แบบเดียวหรือระบบส่งข้อความแบบใหม่ มันช่วยให้ producer, consumer และ middleware แลกเปลี่ยนบริบทของ event ด้วยคำศัพท์ร่วมกัน ขณะที่แต่ละทีมยังเลือก payload, protocol และโครงสร้างพื้นฐานของตนเองได้</p>
<p>หากกำลังออกแบบระบบ event-driven การเริ่มจาก CloudEvents ช่วยลดรูปแบบเฉพาะกิจที่แต่ละบริการสร้างขึ้นเองได้ แต่ยังต้องกำหนด <code>type</code>, schema ของ <code>data</code>, ความเข้ากันได้ย้อนหลัง และ delivery guarantees ให้ชัดเจนในระดับระบบด้วย</p>
<h2>แหล่งอ้างอิง</h2>
<ol>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/spec.md">CloudEvents Specification v1.0.2</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/primer.md">CloudEvents Primer v1.0.2</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/formats/json-format.md">JSON Event Format v1.0.2</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/http-protocol-binding.md">HTTP Protocol Binding v1.0.2</a></li>
<li><a href="https://cloudevents.io/">CloudEvents project site and SDKs</a></li>
<li><a href="https://github.com/cloudevents/spec">CloudEvents specification repository README and release/status table</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/main/docs/ROADMAP.md">CloudEvents project roadmap</a></li>
<li><a href="https://cloudevents.io/blog/2024-01-25/">CloudEvents has Graduated! (project announcement, 2024-01-25)</a></li>
<li><a href="https://cloudevents.io/blog/2024-07-15/">CloudEvents SQL Reached V1! (project announcement, 2024-07-15)</a></li>
<li><a href="https://github.com/cloudevents/spec/blob/v1.0.2/cloudevents/bindings/kafka-protocol-binding.md">CloudEvents Kafka Protocol Binding v1.0.2</a></li>
<li><a href="https://www.asyncapi.com/docs/concepts/asyncapi-document">AsyncAPI document concepts</a></li>
<li><a href="https://docs.confluent.io/platform/current/schema-registry/fundamentals/schema-evolution.html">Confluent Schema Registry: Schema Evolution and Compatibility</a></li>
</ol>
', 'PUBLISHED', '2026-10-05 00:00:00+00', '2026-10-05 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 43: Kafka
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (43, 1, FALSE, FALSE, '2026-01-28 00:00:00+00', '2026-01-28 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (43, 2) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    43, 43, 'en', 'kafka', 'Kafka', 'Technical notes and documentation from knowledge vault.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical notes and documentation from knowledge vault."}]}]}', '<h1>Kafka</h1>
<ul>
<li>Kafka is a distributed event streaming platform.</li>
<li>It is used for pub/sub, event-driven systems, and log processing.</li>
</ul>
', 'PUBLISHED', '2026-01-28 00:00:00+00', '2026-01-28 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 44: Kubernetes CPU Limit and Memory Limit: Why You Should Stop Limiting CPU and Always Match Memory
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (44, 1, FALSE, FALSE, '2026-09-23 00:00:00+00', '2026-09-23 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (44, 12) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (44, 17) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (44, 33) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (44, 34) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (44, 35) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    44, 44, 'th', 'kubernetes-cpu-limit-and-memory-limit', 'Kubernetes CPU Limit and Memory Limit: Why You Should Stop Limiting CPU and Always Match Memory', 'In Kubernetes manifests, CPU and Memory look identical, but treat them the same way at your own peril. Here is why CPU limits cause invisible latency spikes while missing memory limits cause brutal OO',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"In Kubernetes manifests, CPU and Memory look identical, but treat them the same way at your own peril. Here is why CPU limits cause invisible latency spikes while missing memory limits cause brutal OO"}]}]}', '<h1>ทำไมเราถึงไม่ควรตั้ง CPU Limit บน Kubernetes (แต่ต้องตั้ง Memory Limit == Request เสมอ)</h1>
<h1>Stop Setting CPU Limits on Kubernetes (And Why Memory Limits Must Equal Requests)</h1>
<blockquote>
<p><strong>Golden Rule จาก Tim Hockin (Kubernetes Co-creator @ Google):</strong><br />
<em>&quot;Always set memory limit == request. Never set CPU limit.&quot;</em><br />
<em>(สำหรับกรณีทั่วไป 95% ของ production workloads)</em></p>
</blockquote>
<hr />
<h2>สารบัญ / Table of Contents</h2>
<ol>
<li><a href="#1-บทนำ-ความสมมาตรที่หลอกตาใน-kubernetes-yaml">บทนำ: ความสมมาตรที่หลอกตาใน Kubernetes YAML</a></li>
<li><a href="#2-compressible-vs-incompressible-resources">Compressible vs Incompressible Resources</a></li>
<li><a href="#3-cpu-limit-ตัวการร้ายเบื้องหลัง-latency-spike-และ-cpu-throttling">CPU Limit: ตัวการร้ายเบื้องหลัง Latency Spike และ CPU Throttling</a></li>
<li><a href="#4-memory-limit-ทำไมต้อง-request--limit-pizza-party-analogy">Memory Limit: ทำไมต้อง Request == Limit (Pizza Party Analogy)</a></li>
<li><a href="#5-ถอดรหัส-qos-classes-ทำไม-burstable-ถึงเป็นจุดสมดุลที่ดีที่สุด">ถอดรหัส QoS Classes: ทำไม Burstable ถึงเป็นจุดสมดุลที่ดีที่สุด</a></li>
<li><a href="#6-ข้อยกเว้น-เมื่อไหร่ที่ยังจำเป็นต้องตั้ง-cpu-limit">ข้อยกเว้น: เมื่อไหร่ที่ยังจำเป็นต้องตั้ง CPU Limit?</a></li>
<li><a href="#7-ตัวอย่างคอนฟิก-anti-pattern-vs-best-practice">ตัวอย่างคอนฟิก: Anti-pattern vs Best Practice</a></li>
<li><a href="#8-เครื่องมือช่วยคำนวณและมอนิเตอร์">เครื่องมือช่วยคำนวณและมอนิเตอร์</a></li>
<li><a href="#english-version">English Version</a></li>
</ol>
<hr />
<h2>1. บทนำ: ความสมมาตรที่หลอกตาใน Kubernetes YAML</h2>
<p>เมื่อเราเริ่มเขียน Kubernetes Deployment หรือ Pod manifest ครั้งแรก สิ่งที่ทุกคนมักจะทำคือการก๊อบปี้ template การกำหนด resource ที่หน้าตาแบบนี้:</p>
<pre><code class="language-yaml">resources:
  requests:
    cpu: &quot;250m&quot;
    memory: &quot;256Mi&quot;
  limits:
    cpu: &quot;500m&quot;
    memory: &quot;512Mi&quot;
</code></pre>
<p>มองดูแวบแรก มันดูสมเหตุสมผลมาก:</p>
<ul>
<li>มี &quot;จุดเริ่มต้น&quot; (Requests) สำหรับจัดสรรพื้นที่</li>
<li>มี &quot;เพดานสูงสุด&quot; (Limits) สำหรับป้องกันไม่ให้ Pod กินทรัพยากรเกินตัวจนรบกวนเพื่อนบ้าน</li>
</ul>
<p>แต่ในความเป็นจริง <strong>นี่คือหนึ่งในการตั้งค่าที่เป็นต้นเหตุของปัญหา Production อันดับต้นๆ!</strong></p>
<p>ทำไม syntax ที่หน้าตาเหมือนกันเป๊ะของ CPU และ Memory ถึงไม่ควรถูกตั้งค่าเหมือนกัน? คำตอบอยู่ที่การทำงานระดับ Linux Kernel ด้านล่างที่ Kubernetes นำมาควบคุม Container</p>
<hr />
<h2>2. Compressible vs Incompressible Resources</h2>
<p>ความแตกต่างสำคัญที่สุดที่คุณต้องเข้าใจก่อนเปิดคลัสเตอร์ คือ <strong>ธรรมชาติของทรัพยากรทั้งสองชนิด</strong>:</p>
<table>
<thead>
<tr>
<th align="left">คุณสมบัติ</th>
<th align="left">CPU</th>
<th align="left">Memory (RAM)</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong>ประเภททรัพยากร</strong></td>
<td align="left"><strong>Compressible (บีบอัด/ยืดหยุ่นได้)</strong></td>
<td align="left"><strong>Incompressible (บีบไม่ได้)</strong></td>
</tr>
<tr>
<td align="left"><strong>หน่วยเวลา</strong></td>
<td align="left">คิดเป็นสัดส่วนของเวลา (Time-sliced per millisecond)</td>
<td align="left">คิดเป็นพื้นที่ใช้งานจริง (Allocated space)</td>
</tr>
<tr>
<td align="left"><strong>เมื่อทรัพยากรขาดแคลน</strong></td>
<td align="left">ชะลอการประมวลผล (Throttling / Queueing)</td>
<td align="left">ฆ่า Process ทิ้งทันที (OOM Killer / SIGKILL)</td>
</tr>
<tr>
<td align="left"><strong>การปล่อยคืน</strong></td>
<td align="left">คืนทันทีในมิลลิวินาทีถัดไปที่ idle</td>
<td align="left">ต้องรอแอพพลิเคชันสั่ง free หรือ OS ฆ่าทิ้ง</td>
</tr>
<tr>
<td align="left"><strong>กลไก Linux Kernel</strong></td>
<td align="left">CFS (Completely Fair Scheduler) shares &amp; quotas</td>
<td align="left">cgroup memory limits &amp; Kernel OOM Killer</td>
</tr>
</tbody>
</table>
<ul>
<li><strong>CPU เป็นทรัพยากรที่หมุนเวียนได้ (Renewable):</strong> ถ้าในวินาทีนี้ Node มี CPU ว่าง 60% แล้วมี Pod นึงอยากขอเบิสต์มาทำงานให้เสร็จเร็วขึ้น มันไม่มีผลเสียอะไรเลย เพราะพอวินาทีถัดไป Pod อื่นต้องการใช้ CPU ตัว Kernel ก็ดึงสัดส่วนกลับไปให้ Pod อื่นได้ทันทีโดยไม่ต้องฆ่าใคร</li>
<li><strong>Memory เป็นทรัพยากรที่ไม่สามารถยืดหดได้:</strong> เมื่อ Pod จอง RAM ไป 1 GB ข้อมูลนั้นจะค้างอยู่ใน physical memory จนกว่าจะถูกปล่อย ถ้า Node ไม่มี RAM เหลือแล้ว และมีใครขอเพิ่ม ทางออกเดียวของ Kernel คือ <strong>&quot;ต้องมีใครสักคนถูกสังเวย&quot;</strong></li>
</ul>
<hr />
<h2>3. CPU Limit: ตัวการร้ายเบื้องหลัง Latency Spike และ CPU Throttling</h2>
<h3>กลไก CFS Quota ทำงานอย่างไร?</h3>
<p>บน Linux คอนเทนเนอร์ถูกจำกัด CPU ผ่านกลไก <strong>CFS Quota</strong> โดยปกติมีช่วงรอบเวลา (Period) อยู่ที่ 100ms (<code>cfs_period_us = 100000</code>)</p>
<p>เมื่อคุณระบุ <code>limits.cpu: &quot;500m&quot;</code> (0.5 core) หมายความว่าในทุกๆ 100ms Pod ของคุณมีโควต้าประมวลผลได้ไม่เกิน <strong>50ms</strong></p>
<p>ลองนึกภาพ Application ยุคใหม่ (Node.js, Go, Java Virtual Machine, Python async):</p>
<ol>
<li>มี Request เข้ามา แอพรันหลาย threads พยายามคำนวณและ parse JSON ก้อนใหญ่</li>
<li>4 threads ทำงานพร้อมกัน กิน CPU รวม 50ms ภายในเวลาจริงเพียง <strong>12.5ms แรก</strong> ของรอบ</li>
<li><strong>ผลลัพธ์:</strong> โควต้า 50ms ของรอบนั้นหมดเกลี้ยง!</li>
<li><strong>Linux CFS จึงสั่ง Freeze (Throttle) Pod ทันทีเป็นเวลา 87.5ms ที่เหลือ!</strong></li>
</ol>
<p>แม้ว่าในขณะนั้น <strong>Node ทั้งเครื่องจะว่างถึง 80%</strong> ก็ตาม แต่ Pod ของคุณกลับถูกบังคับให้นิ่งสนิท ลูกค้าปลายทางจะเจอ P99 Latency พุ่งสูง, Connection Timeout หรือแม้แต่ Liveness Probe ขาดช่วงจน Pod ถูกสั่งรีสตาร์ตแบบหาสาเหตุไม่เจอ</p>
<h3>ไม่ตั้ง CPU Limit แล้ว Pod จะไม่แย่ง CPU กันจนพังหรือ?</h3>
<p>คำตอบคือ <strong>&quot;ไม่พัง&quot;</strong> หากคุณตั้ง <code>cpu.requests</code> ไว้อย่างถูกต้อง!</p>
<ul>
<li><code>cpu.requests</code> จะถูกแปลงเป็น <strong>CFS Shares</strong> (สัดส่วนน้ำหนักความสำคัญ)</li>
<li>เมื่อมี CPU ว่าง Pod ใดๆ สามารถนำไปใช้ได้ (Burst) งานเสร็จเร็วขึ้น ประหยัดเวลา</li>
<li>เมื่อระบบเริ่มตึงตัวและทุก Pod ต้องการ CPU พร้อมกัน Kernel จะกระจาย CPU ให้ตามสัดส่วน <code>requests</code> อย่างยุติธรรม ไม่มีใครแย่งสิทธิ์ของใครได้เกินกว่าโควต้า request ที่การันตีไว้</li>
</ul>
<hr />
<h2>4. Memory Limit: ทำไมต้อง Request == Limit (Pizza Party Analogy)</h2>
<p>ตรงกันข้ามกับ CPU ในส่วนของ Memory คำแนะนำคือ: <strong>ต้องตั้ง Limit เสมอ และต้องให้เท่ากับ Request (<code>memory.limit == memory.request</code>)</strong></p>
<p>เพื่ออธิบายเรื่องนี้ Robusta ได้ยกตัวอย่าง <strong>&quot;งานเลี้ยงพิซซ่า&quot;</strong>:</p>
<pre><code>🎉 สภาพการณ์: งานเลี้ยงพิซซ่า (Memory Request vs Limit)
- แขกทุกคนสั่งพิซซ่าคนละ 2 ชิ้น (Memory Request = 2)
- เจ้าภาพสั่งพิซซ่ามาวางบนโต๊ะตาม Request รวมของทุกคน
- แต่กติกากลับอนุญาตให้แขกแต่ละคนกินได้สูงสุดถึง 4 ชิ้น (Memory Limit = 4)
- เมื่อปาร์ตี้เริ่ม ทุกคนเห็นพิซซ่าเหลือก็เริ่มหยิบกินชิ้นที่ 3 และ 4 (Overcommit)
- ทันใดนั้น พิซซ่าบนโต๊ะเกลี้ยง! มีแขกคนหนึ่งกำลังจะหยิบชิ้นที่ 2 ของตัวเอง แต่ไม่มีเหลือแล้ว!
- การ์ดร่างยักษ์ &quot;OOM Killer&quot; โผล่มาถีบแขกคนหนึ่งกระเด็นออกจากงาน (Exit Code 137)
  เพื่อเอาพิซซ่าที่กินไปแล้วมาคืนให้คนอื่น!
</code></pre>
<h3>อันตรายของการตั้ง Memory Limit &gt; Memory Request</h3>
<ol>
<li><strong>Overcommit:</strong> Kubernetes Scheduler วาง Pod บน Node โดยดูจาก <strong>Requests เท่านั้น</strong> ถ้าคุณมี Node 8GB คุณสามารถวาง Pod ที่ request 2GB ได้ 4 ตัว แม้ว่า limit ของแต่ละตัวจะใส่ไว้ 4GB ก็ตาม</li>
<li><strong>Cascading OOMKills:</strong> ในวันที่ระบบมีโหลดสูง ทั้ง 4 Pod เริ่มขยับการใช้ Memory เกิน 2GB ไปหา 4GB พร้อมกัน... ทันใดนั้น RAM ของ Node จะหมดลงอย่างฉับพลัน</li>
<li><strong>ความไม่ยุติธรรมของ Linux OOM Killer:</strong> เมื่อ Memory หมด Kernel จะมองหา process ที่มีค่า <code>oom_score</code> สูงเพื่อสั่งฆ่า (<code>SIGKILL</code>, exit code 137) บ่อยครั้ง <strong>Pod ที่โดนฆ่ากลับเป็น Pod ข้างเคียงที่ประพฤติตัวดี</strong> แต่บังเอิญขอ Memory เพิ่มในจังหวะนั้นพอดี</li>
</ol>
<h3>ข้อดีของการตั้ง Memory Request == Limit</h3>
<ul>
<li>Node จะไม่เกิด Memory Overcommit (จุได้เท่าไหร่คือเท่านั้น)</li>
<li>หากเกิด Memory Leak ในตัวแอพ Pod นั้นจะชนเพดานตัวเองและถูก kill โดดเดี่ยวอย่างรวดเร็ว (Fail fast) โดยไม่มีทางลาก Node หรือ Pod เพื่อนบ้านให้พังไปด้วย</li>
</ul>
<hr />
<h2>5. ถอดรหัส QoS Classes: ทำไม Burstable ถึงเป็นจุดสมดุลที่ดีที่สุด</h2>
<p>Kubernetes แบ่ง Quality of Service (QoS) ออกเป็น 3 ระดับ:</p>
<ol>
<li><strong>Guaranteed:</strong> ทั้ง CPU และ Memory ต้องมี <code>requests == limits</code></li>
<li><strong>Burstable:</strong> มีการกำหนด requests แต่มี limit สูงกว่า หรือกำหนดแค่อย่างใดอย่างหนึ่ง</li>
<li><strong>BestEffort:</strong> ไม่กำหนด requests และ limits เลย</li>
</ol>
<p>หลายคนเชื่อว่าระบบของตนต้องเป็น <strong>Guaranteed</strong> เท่านั้นถึงจะดีที่สุด แต่เมื่อคุณบังคับใส่ CPU limit = CPU request คุณกำลังทำให้ Pod ของคุณเจอกับ CPU Throttling แบบถาวร</p>
<p><strong>สูตรแนะนำที่ดีที่สุดสำหรับ 95% ของ Microservices:</strong></p>
<ul>
<li><code>cpu.requests</code>: ตั้งตามการใช้งานจริง (เช่น P90/P95)</li>
<li><code>cpu.limits</code>: <strong>ไม่ต้องใส่ (Omit)</strong></li>
<li><code>memory.requests</code>: เท่ากับ limit</li>
<li><code>memory.limits</code>: เท่ากับ request</li>
</ul>
<p>ผลลัพธ์คือ Pod จะได้ QoS เป็น <strong>Burstable</strong> ซึ่งมอบสิ่งที่ดีที่สุดทั้ง 2 ฝั่ง:</p>
<ul>
<li><strong>Memory ปลอดภัย 100%</strong> เหมือน Guaranteed เพราะไม่มี Overcommit</li>
<li><strong>CPU ยืดหยุ่น 100%</strong> สามารถ Burst นำ CPU รอบที่ว่างมาใช้เร่งงานให้จบไว ไม่โดน CFS throttle</li>
</ul>
<hr />
<h2>6. ข้อยกเว้น: เมื่อไหร่ที่ยังจำเป็นต้องตั้ง CPU Limit?</h2>
<p>แน่นอนว่าคำว่า <em>&quot;Never set CPU limit&quot;</em> มีข้อยกเว้นในบางสถานการณ์วิศวกรรมเฉพาะทาง:</p>
<ol>
<li><strong>Multi-Tenant Clusters ที่ไม่ไว้วางใจผู้ใช้ (Untrusted Code):</strong> หากคุณให้บริการคลาวด์ หรือเปิดให้นักพัฒนารันโค้ดอะไรก็ได้ การมี CPU Limit จะช่วยป้องกันโค้ดประเภท infinite loop หรือ crypto-miner ไม่ให้แย่ง CPU จนกระทบภาพรวม</li>
<li><strong>การคิดค่าบริการตามแพ็กเกจ (Hard Quota/Billing):</strong> ระบบ SaaS ที่จำกัดว่า Tier นี้รันได้ไม่เกิน 1 Core เพื่อจุดประสงค์เชิงธุรกิจ</li>
<li><strong>Latency-Critical Applications ที่ใช้ CPU Pinning:</strong> สำหรับงานที่ต้องการ deterministic low latency ระดับ sub-millisecond (เช่น Trading engine, Data pipeline หนักๆ อย่าง Kafka/Trino) ซึ่งต้องใช้ Kubelet static policy (<code>--cpu-manager-policy=static</code>) ที่จำเป็นต้องเป็น QoS แบบ Guaranteed เท่านั้น</li>
</ol>
<hr />
<h2>7. ตัวอย่างคอนฟิก: Anti-pattern vs Best Practice</h2>
<h3>❌ แบบเดิมที่เป็น Anti-Pattern (เสี่ยง Throttling + OOM เสียหายทั้ง Node)</h3>
<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service-bad
spec:
  template:
    spec:
      containers:
      - name: app
        image: my-app:1.0.0
        resources:
          requests:
            cpu: &quot;200m&quot;
            memory: &quot;256Mi&quot;
          limits:
            cpu: &quot;1000m&quot;   # ⚠️ เสี่ยง CPU Throttling สูงมากเมื่อเกิด thread burst
            memory: &quot;1024Mi&quot; # ⚠️ Limit &gt; Request เกิด Overcommit เสี่ยงเพื่อนบ้านโดน OOMKill
</code></pre>
<h3>✅ แบบ Best Practice (ปลอดภัย นิ่ง และรีดประสิทธิภาพสูงสุด)</h3>
<pre><code class="language-yaml">apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service-good
spec:
  template:
    spec:
      containers:
      - name: app
        image: my-app:1.0.0
        resources:
          requests:
            cpu: &quot;300m&quot;     # กำหนด baseline ให้แม่นยำตามการใช้งานจริง
            memory: &quot;512Mi&quot;
          limits:
            # cpu limit: ไม่ต้องใส่! ให้ Kernel CFS shares จัดการตาม requests
            memory: &quot;512Mi&quot; # เท่ากับ request เป๊ะ ป้องกัน Overcommit และ OOM cascade
</code></pre>
<hr />
<h2>8. เครื่องมือช่วยคำนวณและมอนิเตอร์</h2>
<ol>
<li><strong>หาค่า Request ที่แม่นยำด้วย Robusta KRR (Kubernetes Resource Recommender):</strong>
<ul>
<li>KRR เป็น CLI open-source ที่ช่วยดึงข้อมูลย้อนหลังจาก Prometheus มาคำนวณว่า Pod ควรตั้ง CPU / Memory Request เท่าไหร่ตามค่า P95/P99</li>
<li>Command: <code>krr simple</code></li>
</ul>
</li>
<li><strong>Prometheus Alerts ที่ควรมี:</strong>
<ul>
<li><code>CPUThrottlingHigh</code>: เช็คว่า Pod โดน CFS throttle เกิน 20-25% หรือไม่ (ถ้าเอา CPU limit ออก Alert นี้จะหายไปทันที)</li>
<li><code>HostOomKillDetected</code> / <code>KubePodCrashLooping</code> (Exit code 137): มอนิเตอร์ว่าเกิด OOMKilled ที่ไหนบ้าง</li>
</ul>
</li>
</ol>
<hr />
<br/>
<h1>English Version</h1>
<h2>Stop Setting CPU Limits on Kubernetes (And Why Memory Limits Must Equal Requests)</h2>
<h3>The Symmetrical Trap of Kubernetes YAML</h3>
<p>In almost every tutorial or Helm chart, CPU and memory resource definitions are placed side by side:</p>
<pre><code class="language-yaml">resources:
  requests:
    cpu: &quot;250m&quot;
    memory: &quot;256Mi&quot;
  limits:
    cpu: &quot;500m&quot;
    memory: &quot;512Mi&quot;
</code></pre>
<p>Because the YAML grammar treats CPU and Memory identically, engineering intuition tells us to configure them the same way: a lower bound (request) and an upper bound (limit).</p>
<p>In production, <strong>this assumption leads directly to severe latency anomalies and mysterious pod crashes.</strong></p>
<h3>The Crucial Distinction: Compressible vs. Incompressible</h3>
<ul>
<li><strong>CPU is a Compressible Resource:</strong> It is renewed every millisecond. If a node has spare CPU, allowing a pod to burst consumes no permanent state. If another pod demands CPU later, the Linux Completely Fair Scheduler (CFS) redistributes compute time based on configured requests without terminating any workloads.</li>
<li><strong>Memory is an Incompressible Resource:</strong> Memory is physical space. Once allocated, it cannot be reclaimed until released by the runtime or purged by terminating processes. Overcommitting memory leads directly to the kernel invoking the Linux OOM Killer.</li>
</ul>
<h3>Why CPU Limits Cause Invisible Latency Spikes</h3>
<p>Kubernetes enforces CPU limits using CFS bandwidth quotas (typically over 100ms periods via <code>cfs_period_us</code>).</p>
<p>If a multi-threaded application (such as Go, Java, or Node.js) spawns several concurrent tasks to process an inbound burst, it can easily exhaust its allotted quota in the first 10-20ms of a 100ms window.</p>
<p>The consequence? <strong>The Linux kernel completely suspends (throttles) the container''s threads for the remaining 80ms</strong>, even if the underlying physical host is 80% idle. This behavior introduces erratic P99 latency spikes, probe timeouts, and client disconnects.</p>
<p>By omitting CPU limits while establishing accurate <code>cpu.requests</code>:</p>
<ol>
<li>Guaranteed CPU allocation is enforced via CFS shares during high contention.</li>
<li>Elastic burst capacity is granted whenever host cores are idle.</li>
</ol>
<h3>The Pizza Party: Why Memory Limit Must Equal Memory Request</h3>
<p>Consider a catered party where each guest orders 2 slices of pizza (Request = 2), but the host permits everyone to eat up to 4 slices (Limit = 4).</p>
<p>The host buys enough pizza to fulfill the initial requests. When guests inevitably begin consuming their 3rd and 4th slices, the pizza runs out mid-event. An Out-of-Pizza Killer enters and forcibly ejects guests from the room to reclaim slices for the others.</p>
<p>On Kubernetes:</p>
<ul>
<li>Setting <code>memory.limit &gt; memory.request</code> causes <strong>memory overcommit</strong>.</li>
<li>The Kubernetes scheduler binds pods purely based on <code>requests</code>.</li>
<li>Under heavy load, when multiple pods approach their limits, the node exhausts physical RAM.</li>
<li>The Linux OOM Killer triggers (Exit Code 137), frequently killing innocent neighboring pods.</li>
</ul>
<p>By setting <strong><code>memory.limit == memory.request</code></strong>:</p>
<ul>
<li>Overcommit is prevented at the node level.</li>
<li>Pods with memory leaks fail fast without compromising neighbor stability.</li>
</ul>
<h3>The Recommended Architecture</h3>
<p>For 95% of typical stateless and stateful microservices:</p>
<ol>
<li><strong>Set <code>cpu.requests</code> accurately</strong> based on observed P90/P95 usage.</li>
<li><strong>Omit <code>cpu.limits</code></strong> to eliminate CFS throttling.</li>
<li><strong>Set <code>memory.limits == memory.requests</code></strong> to guarantee predictability and eliminate overcommit cascades.</li>
</ol>
<pre><code class="language-yaml">resources:
  requests:
    cpu: &quot;250m&quot;
    memory: &quot;512Mi&quot;
  limits:
    memory: &quot;512Mi&quot;
</code></pre>
<hr />
<h2>References &amp; Further Reading</h2>
<ul>
<li><a href="https://home.robusta.dev/blog/kubernetes-memory-limit">Robusta: What Everyone Should Know About Kubernetes Memory Limits</a></li>
<li><a href="https://home.robusta.dev/blog/stop-using-cpu-limits">Robusta: For the Love of God, Stop Using CPU Limits on Kubernetes</a></li>
<li><a href="https://twitter.com/thockin/status/1134193838841401345">Tim Hockin on Kubernetes Limits and Requests</a></li>
<li><a href="https://github.com/robusta-dev/krr">Robusta KRR (Kubernetes Resource Recommender)</a></li>
</ul>
', 'PUBLISHED', '2026-09-23 00:00:00+00', '2026-09-23 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 45: Containers vs VMs
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (45, 1, FALSE, FALSE, '2026-06-06 00:00:00+00', '2026-06-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (45, 12) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    45, 45, 'en', 'containers-vs-vms', 'Containers vs VMs', 'Use containers when you want lightweight packaging and fast startup. Use VMs when you need a full OS boundary.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Use containers when you want lightweight packaging and fast startup. Use VMs when you need a full OS boundary."}]}]}', '<h1>Containers vs VMs</h1>
<ul>
<li>VMs virtualize hardware and boot a full guest operating system.</li>
<li>Containers share the host kernel and isolate processes.</li>
<li>Containers are lighter and start faster.</li>
<li>VMs are heavier but give stronger isolation.</li>
</ul>
<p>Use containers when you want lightweight packaging and fast startup. Use VMs when you need a full OS boundary.</p>
', 'PUBLISHED', '2026-06-06 00:00:00+00', '2026-06-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 46: Docker
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (46, 1, FALSE, FALSE, '2026-06-06 00:00:00+00', '2026-06-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (46, 12) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (46, 30) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    46, 46, 'en', 'docker', 'Docker', 'Docker is similar to a virtual machine in usage, but the concept is different.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Docker is similar to a virtual machine in usage, but the concept is different."}]}]}', '<h1>Docker</h1>
<p>Docker is similar to a virtual machine in usage, but the concept is different.</p>
<ul>
<li><strong>VMs</strong> virtualize hardware and run a full guest OS.</li>
<li><strong>Containers</strong> share the host OS kernel and isolate processes.</li>
</ul>
<h2>Core idea</h2>
<ul>
<li>Image = template</li>
<li>Container = running instance of an image</li>
<li>Docker = platform to build, run, and manage containers</li>
</ul>
<h2>Container commands</h2>
<pre><code>docker ps

</code></pre>
<ul>
<li>Check running containers.</li>
</ul>
<pre><code>docker ps -a

</code></pre>
<ul>
<li>Show all containers, including stopped ones.</li>
</ul>
<pre><code>docker inspect &lt;container_id&gt;

</code></pre>
<ul>
<li>Show detailed information about a container.</li>
</ul>
<pre><code>docker run -it &lt;image&gt; bash

</code></pre>
<ul>
<li>Run a container interactively and open <code>bash</code>.</li>
</ul>
<pre><code>docker run -itd &lt;image&gt; bash

</code></pre>
<ul>
<li>Run a container in detached mode and keep it running.</li>
</ul>
<pre><code>docker run &lt;image&gt;

</code></pre>
<ul>
<li>Basic container run command.</li>
</ul>
<pre><code>docker exec -it &lt;container_id&gt; /bin/bash

</code></pre>
<ul>
<li>Enter a running container and manage it.</li>
</ul>
<pre><code>docker run -d --name cat nginx

</code></pre>
<ul>
<li>Run an <code>nginx</code> container in detached mode with the name <code>cat</code>.</li>
</ul>
<pre><code>docker stop &lt;container_id&gt;

</code></pre>
<ul>
<li>Stop a running container.</li>
</ul>
<pre><code>docker kill &lt;container_id&gt;

</code></pre>
<ul>
<li>Force stop a container.</li>
</ul>
<h2>Images</h2>
<pre><code>docker images

</code></pre>
<ul>
<li>List local images.</li>
</ul>
<pre><code>docker build -t tiptop/api:latest .

</code></pre>
<ul>
<li>Build an image with a name and tag.</li>
</ul>
<h2>Docker Compose</h2>
<p>Docker Compose lets you run a set of containers as one application.</p>
<ul>
<li>Define services in <code>docker-compose.yml</code> or <code>docker-compose.yaml</code></li>
<li>Use it when the app needs multiple services together, like API + database + cache</li>
</ul>
<pre><code>docker-compose up

</code></pre>
<ul>
<li>Start the stack.</li>
</ul>
<pre><code>docker-compose up -d

</code></pre>
<ul>
<li>Start the stack in detached mode.</li>
</ul>
<pre><code>docker-compose down

</code></pre>
<ul>
<li>Stop and remove the stack.</li>
</ul>
<h2>Dockerfile</h2>
<p>Example flow for a Go app:</p>
<pre><code>go run server.go
go build server.go

</code></pre>
<p>Example Dockerfile idea:</p>
<pre><code>FROM ubuntu:latest
ADD server /app/server
ENTRYPOINT [&quot;/app/server&quot;]

</code></pre>
<p>Build for Linux before packaging into a container:</p>
<pre><code>env GOOS=linux GOARCH=amd64 go build server.go

</code></pre>
<p>Then build the image:</p>
<pre><code>docker build -t tiptop/api:latest .

</code></pre>
<p>Run the container:</p>
<pre><code>docker run tiptop/api:latest

</code></pre>
<h2>Useful notes</h2>
<ul>
<li><code>ENTRYPOINT</code> defines the main command that runs when the container starts.</li>
<li><code>-d</code> means detached mode.</li>
<li><code>-it</code> means interactive terminal.</li>
<li><code>-a</code> in <code>docker ps -a</code> means all containers.</li>
<li>Put <code>.dockerignore</code> in the project root to exclude files from the build context.</li>
<li>Expose ports with <code>-p host\_port:container\_port</code> when needed.</li>
<li>Use volumes to persist data outside the container.</li>
</ul>
<h2>Quick mental model</h2>
<ul>
<li>Container is for packaging and running an app.</li>
<li>Image is the artifact you build.</li>
<li>Compose is for running multiple related containers together.</li>
<li>Dockerfile is the recipe for building the image.</li>
</ul>
', 'PUBLISHED', '2026-06-06 00:00:00+00', '2026-06-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 47: ความผิดพลาดของวันเวลา: Incident ที่ไม่มีใครคาดคิดใน Production Incident
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (47, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (47, 12) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    47, 47, 'th', 'incident-production-incident', 'ความผิดพลาดของวันเวลา: Incident ที่ไม่มีใครคาดคิดใน Production Incident', 'เป็นหนึ่งในความท้าทายที่น่าสนใจที่สุดในสายงานซอฟต์แวร์ เพราะปัญหานี้อาจอยู่ใน production มานานโดยที่ไม่มีใครสังเกตเห็นหรือเกิดผลกระทบที่ร้ายแรงในทันที แต่กลับสร้างผลกระทบระยะยาวต่อระบบหรือผู...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"เป็นหนึ่งในความท้าทายที่น่าสนใจที่สุดในสายงานซอฟต์แวร์ เพราะปัญหานี้อาจอยู่ใน production มานานโดยที่ไม่มีใครสังเกตเห็นหรือเกิดผลกระทบที่ร้ายแรงในทันที แต่กลับสร้างผลกระทบระยะยาวต่อระบบหรือผู..."}]}]}', '<p>เป็นหนึ่งในความท้าทายที่น่าสนใจที่สุดในสายงานซอฟต์แวร์ เพราะปัญหานี้อาจอยู่ใน production มานานโดยที่ไม่มีใครสังเกตเห็นหรือเกิดผลกระทบที่ร้ายแรงในทันที แต่กลับสร้างผลกระทบระยะยาวต่อระบบหรือผู้ใช้โดยที่เรายังไม่รู้ตัว บทความนี้จะเล่าถึงประสบการณ์ที่ได้เจอกับ incident ที่เกิดขึ้นนานกว่าปีบน production โดยไม่มีใครจับสังเกตได้ Photo by Djim Loic on Unsplashความเป็นมา ทุกครั้งที่เรา release ฟีเจอร์ไปสู่ production เราเชื่อมั่นในกระบวนการ Test อย่างเข้มงวด ทั้งการทดสอบแบบ unit tests, integration tests และการ monitor ต่าง ๆ แต่ incident ครั้งนี้กลับพิสูจน์ให้เห็นว่า แม้แต่การทดสอบที่ละเอียดและเครื่องมือ monitoring ที่เราคิดว่าเพียงพอ ก็ยังไม่สามารถจับปัญหาที่เกิดขึ้นได้ ปัญหาที่ซ่อนอยู่ ปัญหานี้เกิดจากการคำนวณตัวเลขค่าเฉลี่ยของยอดเงินคงเหลือ (Average Daily Balance) ของลูกค้าในแต่ละวัน โดยต้องอาศัยสองปัจจัยหลักคือ:</p>
<ol>
<li>ความพร้อมของข้อมูล</li>
<li>วันที่และเวลา (Timezone) การคำนวณค่าเฉลี่ยโดยทั่วไปจะอาศัยผลรวมของยอดเงินคงเหลือในบัญชีลูกค้าในแต่ละวัน (Closing Balance) หารด้วยจำนวนวัน ตัวอย่างเช่น: • Closing balance วันที่ 1 คือ 10,000 • Closing balance วันที่ 2 คือ 10,000 ค่าเฉลี่ยของสองวันนี้จะเป็น (10,000 + 10,000) / 2 = 10,000 ปัญหา ความพร้อมของข้อมูล สิ่งที่เราเจอคือเมื่อ data ของวันที่ 3 ยังไม่พร้อมแต่เราต้องแสดงข้อมูลให้ลูกค้า เช่น • closing balance วันที่ 3 ยังไม่มี สิ่งที่เราพบคือ ( 10,000 + 10,000 + [ Not ready ] ) / 3 = 6,666.66 • closing balance วันที่ 3 คือ 10,000 ( 10,000 + 10,000 + [ 10,000 ] ) / 3 = 10,000 ปัญหา วันที่และเวลา (Timezone) ถ้าผมถามว่าวันนี้วันอะไรเราก็แค่หันไปดูวันที่บนจอก็ได้คำตอบ แต่ในระบบแล้วการที่เราไม่ระบุ timezone ให้ชัดเจนทำให้เกิดความผิดพลาดได้ง่ายมาก จะยกตัวอย่างใน timezone +7 ในระบบถ้าผมใช้งานระบบวันที่ 3 ของเดือนตอนเช้า 6:00 AM และผมเริ่มคำนวน ADB ตอน 6:00 am. ในระบบจะเห็นว่าผมต้องการคำนวน ADB ของวันที่ 2 ณ เวลา 11:00 pm. พอมาเข้าสูตรจะเห็นว่าควรจะเป็น ( 10,000 + 10,000 ) / 2 = 10,000 แต่ถ้าเราได้ closing balance ของวันที่ 3 แล้ว ( 10,000 + 10,000 + 10,000 ) / 2 = 15,000</li>
</ol>
<ul>
<li>จะเห็นว่าเงินเยอะกว่า closing balance แต่ละวัน แต่หลังจาก 7:00 am ตัวเลขก็จะกลับมาถูกต้องอีกครั้ง  ( 10,000 + 10,000 + 10,000 ) / 3 = 10,000 สิ่งที่แปลกคือมันไม่ก่อให้เกิดการล้มเหลวที่ชัดเจน แต่กลับแสดงผลลัพธ์ที่ผิดพลาดเพียงเล็กน้อยในบางกรณีเท่านั้น และเพราะผลลัพธ์ที่ผิดพลาดนี้ไม่ได้ส่งผลกระทบกับทุกคนในทันที ทีมจึงไม่ได้ตรวจพบ เมื่อเวลาผ่านไป ระบบเริ่มสะสมข้อมูลผิดพลาดทีละเล็กทีละน้อย และไม่มีใครสังเกตเห็นมันนานกว่าหนึ่งปี จนกระทั่งเกิดการร้องเรียนจากลูกค้าหลายรายเกี่ยวกับข้อมูลที่ไม่ถูกต้อง แต่ก็ถูกแก้ไขโดยไม่รู้สาเหตุ จนมาวันนึงทำให้เราต้องย้อนกลับไปตรวจสอบสาเหตุที่แท้จริงของปัญหา และนั่นคือตอนที่เราเจอปัญหาที่แท้จริง บทเรียนที่ได้รับ</li>
</ul>
<ol start="3">
<li>การ Test และ Monitoring ที่เจาะจงมากขึ้น: การมี monitoring ที่ครอบคลุมแต่ไม่ละเอียดพอ อาจทำให้พลาดปัญหาที่เกิดขึ้นเฉพาะกับบางกลุ่มข้อมูล</li>
<li>การ Test แบบ edge case: เราควรเพิ่มการทดสอบ edge case ที่หลากหลายมากขึ้น โดยเฉพาะกับฟีเจอร์ที่อาจมีการตั้งค่าหรือลูกเล่นที่ไม่เหมือนกัน</li>
<li>การทบทวน test case เป็นระยะ: การทำ review code หรือ review test case เป็นระยะ ๆ จะช่วยลดความเสี่ยงของปัญหาที่เกิดจากข้อผิดพลาด ซึ่งในกรณีนี้เป็นจุดเริ่มต้นของปัญหาทั้งหมด สรุป incident นี้สอนให้เราเข้าใจว่า แม้ปัญหาจะดูเล็กและไม่ได้ส่งผลกระทบในทันที แต่มันสามารถสะสมและสร้างความเสียหายระยะยาวได้ การทำงานกับ production จึงต้องการทั้งความละเอียดอ่อนและการปรับปรุงการตรวจสอบอย่างต่อเนื่อง</li>
</ol>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 48: New Ubuntu Server Setup Checklist
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (48, 1, FALSE, FALSE, '2026-06-24 00:00:00+00', '2026-06-24 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (48, 12) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    48, 48, 'en', 'new-ubuntu-server-setup-checklist', 'New Ubuntu Server Setup Checklist', 'Use this checklist when provisioning a fresh Ubuntu server. Command labels:',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Use this checklist when provisioning a fresh Ubuntu server. Command labels:"}]}]}', '<h1>New Ubuntu Server Setup Checklist</h1>
<p>Use this checklist when provisioning a fresh Ubuntu server.
Command labels:</p>
<ul>
<li><code>[local]</code> means run from your own computer.</li>
<li><code>[server]</code> means run inside the Ubuntu server after SSH login.</li>
<li>Keep the first root SSH session open until the new sudo user login is confirmed.</li>
</ul>
<h2>1. Before You Start</h2>
<p>Confirm:</p>
<ul>
<li>Server provider, region, Ubuntu version, public IP, private IP.</li>
<li>Hostname and domain names.</li>
<li>Who needs SSH access.</li>
<li>Which ports must be public.</li>
<li>Runtime needed: Docker, Node.js, Java, database client, etc.</li>
<li>Monitoring, backup, and alert destination.</li>
</ul>
<h2>2. First Login</h2>
<p>Run from your own machine:</p>
<pre><code># [local] Connect to the new server as root.
ssh root@SERVER_IP

</code></pre>
<p>Run inside the server:</p>
<pre><code># [server] Show Ubuntu version.
lsb_release -a

# [server] Show kernel and machine architecture.
uname -a

# [server] Show network interfaces and IP addresses.
ip addr

# [server] Show disk usage.
df -h

# [server] Show memory usage.
free -h

</code></pre>
<h2>3. Hostname, Timezone, and Updates</h2>
<pre><code># [server] Set a useful server hostname.
hostnamectl set-hostname app-01

# [server] Set server timezone. Change this if needed.
timedatectl set-timezone Asia/Bangkok

# [server] Refresh package lists from Ubuntu repositories.
apt update

# [server] Upgrade installed packages.
apt upgrade -y

# [server] Install common administration and security tools.
apt install -y curl wget git vim unzip htop jq ca-certificates gnupg lsb-release software-properties-common ufw fail2ban unattended-upgrades

# [server] Reboot after initial upgrades.
reboot

</code></pre>
<p>Reconnect after reboot:</p>
<pre><code># [local] Reconnect to the server.
ssh root@SERVER_IP

</code></pre>
<h2>4. Create Admin User</h2>
<p>Replace <code>toppy</code> with your username if different.</p>
<pre><code># [server] Create a normal Linux user.
adduser toppy

# [server] Allow the user to run sudo commands.
usermod -aG sudo toppy

# [server] Copy root''s SSH authorized keys to the new user.
rsync --archive --chown=toppy:toppy ~/.ssh /home/toppy

# [server] Lock down SSH directory permissions.
chmod 700 /home/toppy/.ssh

# [server] Lock down authorized_keys file permissions.
chmod 600 /home/toppy/.ssh/authorized_keys

# [server] Ensure the new user owns the copied SSH files.
chown -R toppy:toppy /home/toppy/.ssh

</code></pre>
<p>Test from your own machine in a new terminal:</p>
<pre><code># [local] Confirm SSH works as the new user.
ssh toppy@SERVER_IP

# [server] Confirm sudo works. Expected output: root
sudo whoami

</code></pre>
<p>Do not disable root login until this works.</p>
<h2>5. SSH Hardening</h2>
<pre><code># [server] Edit SSH server config.
sudo vim /etc/ssh/sshd_config

</code></pre>
<p>Recommended settings:</p>
<pre><code>PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
AllowUsers toppy

</code></pre>
<p>Apply safely:</p>
<pre><code># [server] Validate SSH config syntax before reload.
sudo sshd -t

# [server] Reload SSH without killing current sessions.
sudo systemctl reload ssh

</code></pre>
<p>Test again from a new local terminal:</p>
<pre><code># [local] Confirm the hardened SSH config still allows login.
ssh toppy@SERVER_IP

</code></pre>
<h2>6. Firewall</h2>
<pre><code># [server] Deny incoming traffic by default.
sudo ufw default deny incoming

# [server] Allow outgoing traffic by default.
sudo ufw default allow outgoing

# [server] Allow SSH so you do not lock yourself out.
sudo ufw allow OpenSSH

# [server] Allow HTTP if this server hosts websites or APIs.
sudo ufw allow 80/tcp

# [server] Allow HTTPS if this server hosts websites or APIs.
sudo ufw allow 443/tcp

# [server] Enable the firewall.
sudo ufw enable

# [server] Check active firewall rules.
sudo ufw status verbose

</code></pre>
<p>Only open ports that the server really needs.</p>
<h2>7. Automatic Security Updates</h2>
<pre><code># [server] Enable automatic security upgrades.
sudo dpkg-reconfigure --priority=low unattended-upgrades

# [server] Confirm the service status.
sudo systemctl status unattended-upgrades

</code></pre>
<p>Optional review:</p>
<pre><code># [server] Review package auto-upgrade rules.
sudo vim /etc/apt/apt.conf.d/50unattended-upgrades

# [server] Review auto-upgrade schedule.
sudo vim /etc/apt/apt.conf.d/20auto-upgrades

</code></pre>
<h2>8. Fail2ban</h2>
<pre><code># [server] Start Fail2ban and enable it at boot.
sudo systemctl enable --now fail2ban

# [server] Show Fail2ban global status.
sudo fail2ban-client status

# [server] Show SSH jail status.
sudo fail2ban-client status sshd

</code></pre>
<h2>9. DNS, Nginx, and TLS</h2>
<p>Create DNS records at your DNS provider:</p>
<ul>
<li><code>A</code> record points domain to server IPv4.</li>
<li><code>AAAA</code> record points domain to server IPv6, if used.</li>
</ul>
<p>Install Nginx and Certbot if this server serves HTTP traffic:</p>
<pre><code># [server] Install Nginx and Let''s Encrypt Certbot plugin.
sudo apt install -y nginx certbot python3-certbot-nginx

# [server] Validate Nginx config.
sudo nginx -t

# [server] Enable and start Nginx.
sudo systemctl enable --now nginx

# [server] Issue HTTPS certificate. Replace example.com.
sudo certbot --nginx -d example.com

# [server] Test automatic certificate renewal.
sudo certbot renew --dry-run

</code></pre>
<h2>10. Runtime Setup</h2>
<p>Install only what the application needs.</p>
<h3>Docker</h3>
<pre><code># [server] Create keyring directory for Docker repository key.
sudo install -m 0755 -d /etc/apt/keyrings

# [server] Download Docker GPG key.
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# [server] Make Docker GPG key readable by apt.
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# [server] Add Docker apt repository for this Ubuntu version.
echo &quot;deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release &amp;&amp; echo $VERSION_CODENAME) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null

# [server] Refresh package lists with Docker repository included.
sudo apt update

# [server] Install Docker Engine and Compose plugin.
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# [server] Allow toppy to run docker without sudo after next login.
sudo usermod -aG docker toppy

</code></pre>
<h3>Node.js</h3>
<pre><code># [server] Install nvm for the current user.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# [server] Install latest LTS Node.js.
nvm install --lts

# [server] Confirm versions.
node -v
npm -v

</code></pre>
<h3>Java</h3>
<pre><code># [server] Install Java 21 JDK.
sudo apt install -y openjdk-21-jdk

# [server] Confirm Java version.
java -version

</code></pre>
<h2>11. Application Layout</h2>
<p>Recommended paths:</p>
<pre><code>/opt/apps/&lt;app-name&gt;        app code or compose files
/var/log/&lt;app-name&gt;         app logs
/var/lib/&lt;app-name&gt;         app data
/etc/&lt;app-name&gt;             config and secrets

</code></pre>
<pre><code># [server] Create application directories.
sudo mkdir -p /opt/apps/my-app /var/log/my-app /var/lib/my-app /etc/my-app

# [server] Let app user manage app code, logs, and data.
sudo chown -R toppy:toppy /opt/apps/my-app /var/log/my-app /var/lib/my-app

# [server] Restrict config directory.
sudo chmod 750 /etc/my-app

# [server] Create environment file for secrets.
sudo touch /etc/my-app/.env

# [server] Make root own the env file but allow toppy group to read it.
sudo chown root:toppy /etc/my-app/.env

# [server] Restrict env file permissions.
sudo chmod 640 /etc/my-app/.env

</code></pre>
<h2>12. Systemd Service</h2>
<p>Create service file:</p>
<pre><code># [server] Create or edit service file.
sudo vim /etc/systemd/system/my-app.service

</code></pre>
<p>Example:</p>
<pre><code>[Unit]
Description=My App
After=network.target

[Service]
User=toppy
WorkingDirectory=/opt/apps/my-app
EnvironmentFile=/etc/my-app/.env
ExecStart=/usr/bin/java -jar app.jar
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target

</code></pre>
<p>Start service:</p>
<pre><code># [server] Reload systemd after adding/changing service files.
sudo systemctl daemon-reload

# [server] Enable service on boot and start now.
sudo systemctl enable --now my-app

# [server] Check service status.
sudo systemctl status my-app

# [server] Follow live service logs.
journalctl -u my-app -f

</code></pre>
<h2>13. Logs and Quick Checks</h2>
<pre><code># [server] Show failed systemd services.
systemctl --failed

# [server] Show listening network ports and processes.
sudo ss -tulpn

# [server] Show recent warnings and errors.
sudo journalctl -p warning -n 100

# [server] Follow Nginx access log.
sudo tail -f /var/log/nginx/access.log

# [server] Follow Nginx error log.
sudo tail -f /var/log/nginx/error.log

</code></pre>
<h2>14. Backup and Monitoring</h2>
<p>Before production traffic:</p>
<ul>
<li>Configure monitoring for CPU, RAM, disk, service health, HTTP health, TLS expiry.</li>
<li>Configure alerts to Slack, email, Telegram, or another channel.</li>
<li>Configure backups for database, uploads, config, and persistent volumes.</li>
<li>Test restore, not only backup creation.</li>
</ul>
<h2>15. Final Deployment Checklist</h2>
<ul>
<li>New sudo user login works.</li>
<li>Root SSH login disabled.</li>
<li>Password SSH disabled.</li>
<li>Firewall enabled.</li>
<li>Only required public ports are open.</li>
<li>Security updates enabled.</li>
<li>Fail2ban enabled.</li>
<li>DNS points to server.</li>
<li>TLS certificate issued.</li>
<li>App runtime installed.</li>
<li>Secrets stored outside git.</li>
<li>Monitoring enabled.</li>
<li>Backups configured and restore tested.</li>
<li>Rollback path documented.</li>
</ul>
', 'PUBLISHED', '2026-06-24 00:00:00+00', '2026-06-24 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 49: Personal Website — Deploy & Maintain
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (49, 1, FALSE, FALSE, '2026-07-06 00:00:00+00', '2026-07-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (49, 12) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    49, 49, 'en', 'personal-website-deploy-maintain', 'Personal Website — Deploy & Maintain', 'Project: TopToppy Personal Website (kananek.top) Type: Next.js personal site Status: Active',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Project: TopToppy Personal Website (kananek.top) Type: Next.js personal site Status: Active"}]}]}', '<h1>Personal Website — Deploy &amp; Maintain</h1>
<p><strong>Project:</strong> TopToppy Personal Website (kananek.top)
<strong>Type:</strong> Next.js personal site
<strong>Status:</strong> Active</p>
<blockquote>
<p>Single source of truth for deploying and maintaining the personal website.</p>
</blockquote>
<hr />
<h2>Quick Status</h2>
<ul>
<li><strong>Recommended deployment:</strong> Static files + Nginx (no Node on VPS)</li>
<li><strong>Current domain:</strong> <a href="https://kananek.top">https://kananek.top</a></li>
<li><strong>Alternative method:</strong> PM2 + <code>next start</code> (legacy)</li>
</ul>
<hr />
<h2>Deployment Methods</h2>
<h3>1. Static Export + Nginx (Recommended)</h3>
<p><strong>When to use:</strong> Always, unless you need server-side rendering.
<strong>Steps:</strong></p>
<ol>
<li>Enable static export in <code>next.config.ts</code>:
<pre><code>output: &quot;export&quot;,
images: { unoptimized: true },

</code></pre>
</li>
<li>Build:
<pre><code>npm run build

</code></pre>
→ produces <code>out/</code> folder.</li>
<li>First-time VPS setup (Ubuntu):
<pre><code>sudo apt install -y nginx certbot python3-certbot-nginx
sudo mkdir -p /var/www/kananek.top

</code></pre>
</li>
<li>Deploy (from your machine):
<pre><code>rsync -avz --delete ./out/ user@VPS_IP:/var/www/kananek.top/

</code></pre>
</li>
<li>Nginx config + SSL:
<ul>
<li>See <code>docs/how-to-deploy-to-vps.md</code> for full config.</li>
<li>Run: <code>sudo certbot --nginx -d kananek.top -d www.kananek.top</code></li>
</ul>
</li>
</ol>
<h2><strong>Pros:</strong> Fast, cheap, secure, no runtime Node needed.</h2>
<h3>2. PM2 + next start</h3>
<p>Use only if you later need SSR or API routes.
See full guide: <code>docs/deployment-update-guide.md</code>
Quick update on VPS:</p>
<pre><code>git pull &amp;&amp; npm ci &amp;&amp; npm run build &amp;&amp; pm2 restart personal-website

</code></pre>
<hr />
<h2>Maintenance Checklist</h2>
<p>Use this after every content/code change.</p>
<ul>
<li>[ ] Pull latest code (<code>git pull</code>)</li>
<li>[ ] Install deps (<code>npm ci</code>)</li>
<li>[ ] Run checks:
  - [ ] <code>npm run typecheck</code>
  - [ ] <code>npm run lint</code></li>
<li>[ ] Build (<code>npm run build</code>)</li>
<li>[ ] Deploy to VPS (rsync or PM2 restart)</li>
<li>[ ] Verify live site: <a href="https://kananek.top">https://kananek.top</a></li>
<li>[ ] Check logs if something looks wrong</li>
<li>[ ] (Optional) Update <code>docs/Personal-Website-Deploy-and-Maintain.md</code> if process changed</li>
</ul>
<hr />
<h2>Regular Tasks</h2>
<table>
<thead>
<tr>
<th align="left">Task   <br></th>
<th align="left">Frequency   <br></th>
<th align="left">Command / Action   <br></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Deploy new version   <br></td>
<td align="left">As needed   <br></td>
<td align="left"><code>npm run build &amp;&amp; rsync ...</code>   <br></td>
</tr>
<tr>
<td align="left">Renew SSL   <br></td>
<td align="left">Auto (90d)   <br></td>
<td align="left"><code>sudo certbot renew --dry-run</code>   <br></td>
</tr>
<tr>
<td align="left">Check Nginx   <br></td>
<td align="left">After deploy   <br></td>
<td align="left"><code>sudo nginx -t &amp;&amp; sudo systemctl reload nginx</code>   <br></td>
</tr>
<tr>
<td align="left">View logs   <br></td>
<td align="left">When issues   <br></td>
<td align="left"><code>sudo tail -f /var/log/nginx/error.log</code>   <br></td>
</tr>
<tr>
<td align="left">Check disk space   <br></td>
<td align="left">Monthly   <br></td>
<td align="left"><code>df -h</code>   <br></td>
</tr>
<tr>
<td align="left">Backup last builds   <br></td>
<td align="left">After major   <br></td>
<td align="left">Keep dated <code>out-YYYY-MM-DD</code> folders locally   <br></td>
</tr>
<tr>
<td align="left">Update docs   <br></td>
<td align="left">When process changes   <br></td>
<td align="left">Edit this page + related docs   <br></td>
</tr>
</tbody>
</table>
<hr />
<h2>Rollback</h2>
<h3>Static method</h3>
<pre><code># On VPS
cd /var/www/kananek.top
# rsync an older `out/` folder from your machine

</code></pre>
<h3>PM2 method</h3>
<pre><code>git checkout &lt;good-commit&gt;
npm ci
npm run build
pm2 restart personal-website

</code></pre>
<hr />
<h2>Useful Commands</h2>
<p><strong>One-liner deploy (static):</strong></p>
<pre><code>npm run build &amp;&amp; rsync -avz --delete ./out/ user@VPS:/var/www/kananek.top/

</code></pre>
<p><strong>Check health:</strong></p>
<pre><code>sudo nginx -t &amp;&amp; sudo systemctl status nginx

</code></pre>
<p><strong>Firewall:</strong></p>
<pre><code>sudo ufw allow ''Nginx Full''
sudo ufw status

</code></pre>
<hr />
<h2>Monitoring Recommendations</h2>
<ul>
<li>Uptime monitoring: UptimeRobot, BetterStack, or Pingdom (free tier)</li>
<li>SSL expiry: Let’s Encrypt auto-renews, but set a reminder every 60 days</li>
<li>Error logs: Check after every deploy</li>
</ul>
<hr />
<h2>Backup Strategy</h2>
<ul>
<li>Git = source of truth for code</li>
<li>Keep last 2–3 dated <code>out/</code> builds locally before big changes</li>
<li>tar -czf &quot;out-$(dat<code>e +</code>%F).tar.gz&quot; out/</li>
</ul>
<hr />
<h2>Future Improvements</h2>
<ul>
<li>[ ] Add GitHub Actions for automatic deploy on push to <code>main</code></li>
<li>[ ] Add health check endpoint (if moving away from pure static)</li>
<li>[ ] Set up log rotation for Nginx</li>
<li>[ ] Document exact PM2 ecosystem file if we keep using it</li>
</ul>
<hr />
<h2>Related Documents</h2>
<ul>
<li><code>docs/how-to-deploy-to-vps.md</code> — Detailed step-by-step (both methods)</li>
<li><code>docs/vps-deployment.md</code> — Short static-focused version</li>
<li><code>docs/deployment-update-guide.md</code> — Legacy PM2 update checklist</li>
<li><code>docs/ui-improvement-plan.md</code> — UI/asset improvements tracking</li>
</ul>
<hr />
<h2>Notes</h2>
<ul>
<li>No environment variables used</li>
<li>All images in <code>public/images/</code></li>
<li>Fully client-side (sections + anchor navigation)</li>
<li>Preferred production = Static files served by Nginx</li>
</ul>
<p><strong>Owner:</strong> TopToppy
<strong>Last updated:</strong> 2026-07-06</p>
', 'PUBLISHED', '2026-07-06 00:00:00+00', '2026-07-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 50: คู่มือตั้งค่า Ubuntu Server ใหม่
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (50, 1, FALSE, FALSE, '2026-06-24 00:00:00+00', '2026-06-24 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (50, 12) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    50, 50, 'th', 'ubuntu-server', 'คู่มือตั้งค่า Ubuntu Server ใหม่', 'ใช้เอกสารนี้ตอนเปิด Ubuntu server ใหม่ เช่น production, staging, CI, reverse proxy, worker หรือ server สำหรับ deploy application ความหมายของ label หน้า command:',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ใช้เอกสารนี้ตอนเปิด Ubuntu server ใหม่ เช่น production, staging, CI, reverse proxy, worker หรือ server สำหรับ deploy application ความหมายของ label หน้า command:"}]}]}', '<h1>คู่มือตั้งค่า Ubuntu Server ใหม่</h1>
<p>ใช้เอกสารนี้ตอนเปิด Ubuntu server ใหม่ เช่น production, staging, CI, reverse proxy, worker หรือ server สำหรับ deploy application
ความหมายของ label หน้า command:</p>
<ul>
<li><code>[local]</code> = รันจากเครื่องเราเอง เช่น laptop หรือ desktop</li>
<li><code>[server]</code> = รันใน Ubuntu server หลังจาก SSH เข้าไปแล้ว</li>
<li>อย่าปิด session root แรก จนกว่าจะ login ด้วย user ใหม่และใช้ <code>sudo</code> ได้แน่นอน</li>
</ul>
<h2>1. เช็กข้อมูลก่อนเริ่ม</h2>
<p>ควรรู้ข้อมูลเหล่านี้ก่อน setup:</p>
<ul>
<li>Provider และ region ของ server</li>
<li>Ubuntu version</li>
<li>Public IP และ private IP</li>
<li>Hostname ที่ต้องการใช้</li>
<li>Domain ที่จะชี้มา server นี้</li>
<li>ใครต้อง SSH เข้า server ได้บ้าง</li>
<li>Port ไหนต้องเปิด public เช่น 22, 80, 443</li>
<li>Application ต้องใช้ runtime อะไร เช่น Docker, Node.js, Java</li>
<li>จะ backup อะไร และเก็บ backup ที่ไหน</li>
<li>จะ monitor และ alert ผ่านช่องทางไหน</li>
</ul>
<h2>2. Login เข้า Server ครั้งแรก</h2>
<p>รันจากเครื่องเราเอง:</p>
<pre><code># [local] SSH เข้า server ด้วย root user ที่ provider ให้มา
ssh root@SERVER_IP

</code></pre>
<p>รันใน server:</p>
<pre><code># [server] ดู Ubuntu version
lsb_release -a

# [server] ดู kernel และ architecture ของเครื่อง
uname -a

# [server] ดู network interface และ IP address
ip addr

# [server] ดูพื้นที่ disk
df -h

# [server] ดู memory
free -h

</code></pre>
<p>คำอธิบาย:</p>
<ul>
<li><code>ssh root@SERVER\_IP</code> ใช้ remote เข้า server</li>
<li><code>lsb\_release -a</code> ใช้ดูว่าเป็น Ubuntu version อะไร</li>
<li><code>uname -a</code> ใช้ดู kernel และระบบเครื่อง</li>
<li><code>ip addr</code> ใช้ดู IP และ network interface</li>
<li><code>df -h</code> ใช้ดู disk แบบอ่านง่าย เช่น GB</li>
<li><code>free -h</code> ใช้ดู RAM แบบอ่านง่าย</li>
</ul>
<h2>3. ตั้ง Hostname, Timezone และ Update Package</h2>
<pre><code># [server] ตั้งชื่อ server ให้อ่านง่าย
hostnamectl set-hostname app-01

# [server] ตั้ง timezone เป็นไทย
 timedatectl set-timezone Asia/Bangkok

# [server] ดึงรายการ package ล่าสุดจาก repository
apt update

# [server] upgrade package ที่ติดตั้งอยู่แล้ว
apt upgrade -y

# [server] ติดตั้ง tool พื้นฐานสำหรับ admin และ security
apt install -y curl wget git vim unzip htop jq ca-certificates gnupg lsb-release software-properties-common ufw fail2ban unattended-upgrades

# [server] reboot หลัง update รอบแรก
reboot

</code></pre>
<p>คำอธิบาย:</p>
<ul>
<li><code>hostnamectl set-hostname app-01</code> ตั้งชื่อเครื่อง เช่น <code>app-01</code>, <code>api-prod-01</code></li>
<li><code>timedatectl set-timezone Asia/Bangkok</code> ตั้งเวลา server เป็น timezone ไทย</li>
<li><code>apt update</code> อัปเดตรายการ package แต่ยังไม่ติดตั้ง</li>
<li><code>apt upgrade -y</code> upgrade package ที่มี patch ใหม่</li>
<li><code>apt install -y ...</code> ติดตั้ง tool ที่ควรมี เช่น firewall, fail2ban, unzip, git</li>
<li><code>reboot</code> restart server เพื่อให้ kernel หรือ service ใหม่ทำงานครบ</li>
</ul>
<p>หลัง reboot ให้ต่อกลับเข้าไปใหม่:</p>
<pre><code># [local] SSH เข้า server อีกครั้ง
ssh root@SERVER_IP

</code></pre>
<h2>4. สร้าง User สำหรับใช้งานจริง</h2>
<p>ตัวอย่างนี้ใช้ user ชื่อ <code>toppy</code> ถ้าใช้ชื่ออื่นให้เปลี่ยนทุก command ให้ตรงกัน</p>
<pre><code># [server] สร้าง user ใหม่
adduser toppy

# [server] เพิ่ม user เข้า group sudo เพื่อให้รันคำสั่ง admin ได้
usermod -aG sudo toppy

# [server] copy SSH key จาก root ไปให้ user toppy
rsync --archive --chown=toppy:toppy ~/.ssh /home/toppy

# [server] ตั้ง permission ของ folder .ssh ให้ปลอดภัย
chmod 700 /home/toppy/.ssh

# [server] ตั้ง permission ของ authorized_keys ให้ปลอดภัย
chmod 600 /home/toppy/.ssh/authorized_keys

# [server] ยืนยันว่าไฟล์ SSH ทั้งหมดเป็นของ user toppy
chown -R toppy:toppy /home/toppy/.ssh

</code></pre>
<p>คำอธิบาย:</p>
<ul>
<li><code>adduser toppy</code> สร้าง Linux user ใหม่พร้อม home directory <code>/home/toppy</code></li>
<li><code>usermod -aG sudo toppy</code> ให้ user นี้ใช้ <code>sudo</code> ได้</li>
<li><code>rsync --archive --chown=toppy:toppy ~/.ssh /home/toppy</code> copy folder <code>.ssh</code> จาก root ไปที่ <code>/home/toppy/.ssh</code> และเปลี่ยน owner เป็น <code>toppy</code></li>
<li><code>chmod 700 /home/toppy/.ssh</code> ให้เฉพาะ owner เข้า folder <code>.ssh</code> ได้</li>
<li><code>chmod 600 /home/toppy/.ssh/authorized\_keys</code> ให้เฉพาะ owner อ่าน/เขียนไฟล์ key ได้</li>
<li><code>chown -R toppy:toppy ...</code> ตั้ง owner/group ให้ถูกต้องทั้ง folder</li>
</ul>
<p>ทดสอบจากเครื่องเราเอง โดยเปิด terminal ใหม่:</p>
<pre><code># [local] ทดสอบ login ด้วย user ใหม่
ssh toppy@SERVER_IP

# [server] ทดสอบว่าใช้ sudo ได้หรือไม่ ควรได้ output: root
sudo whoami

</code></pre>
<p>ถ้า <code>sudo whoami</code> ได้ผลลัพธ์เป็น <code>root</code> แปลว่า user พร้อมใช้งาน</p>
<h2>5. ปิด Root Login และ Password SSH</h2>
<p>แก้ config SSH:</p>
<pre><code># [server] เปิดไฟล์ config ของ SSH server
sudo vim /etc/ssh/sshd_config

</code></pre>
<p>ตั้งค่าที่แนะนำ:</p>
<pre><code>PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
X11Forwarding no
AllowUsers toppy

</code></pre>
<p>คำอธิบาย:</p>
<ul>
<li><code>PermitRootLogin no</code> ไม่ให้ SSH เข้า root โดยตรง</li>
<li><code>PasswordAuthentication no</code> ไม่ให้ login ด้วย password ต้องใช้ SSH key</li>
<li><code>PubkeyAuthentication yes</code> เปิดการ login ด้วย SSH key</li>
<li><code>X11Forwarding no</code> ปิด feature ที่ไม่จำเป็นใน server ส่วนใหญ่</li>
<li><code>AllowUsers toppy</code> อนุญาตเฉพาะ user <code>toppy</code> ให้ SSH เข้าได้</li>
</ul>
<p>ตรวจ config แล้ว reload:</p>
<pre><code># [server] ตรวจ syntax ของ sshd_config ถ้าผิดจะยังไม่ reload
sudo sshd -t

# [server] reload SSH service โดยไม่ตัด session ปัจจุบัน
sudo systemctl reload ssh

</code></pre>
<p>ทดสอบอีกครั้งจากเครื่องเราเอง:</p>
<pre><code># [local] ทดสอบว่า SSH ด้วย user toppy ยังเข้าได้
ssh toppy@SERVER_IP

</code></pre>
<p>ถ้าเข้าไม่ได้ ห้ามปิด root session เดิม ให้กลับไปแก้ config ก่อน</p>
<h2>6. ตั้ง Firewall ด้วย UFW</h2>
<pre><code># [server] ปิด incoming connection ทั้งหมดเป็นค่าเริ่มต้น
sudo ufw default deny incoming

# [server] อนุญาต outgoing connection ทั้งหมดเป็นค่าเริ่มต้น
sudo ufw default allow outgoing

# [server] เปิด SSH เพื่อไม่ให้ lock ตัวเองออกจาก server
sudo ufw allow OpenSSH

# [server] เปิด HTTP ถ้า server มีเว็บหรือ API
sudo ufw allow 80/tcp

# [server] เปิด HTTPS ถ้า server มีเว็บหรือ API
sudo ufw allow 443/tcp

# [server] เปิดใช้งาน firewall
sudo ufw enable

# [server] ดู rule firewall ที่ใช้อยู่
sudo ufw status verbose

</code></pre>
<p>หลักการคือเปิดเฉพาะ port ที่จำเป็นจริง ๆ เท่านั้น</p>
<h2>7. เปิด Automatic Security Updates</h2>
<pre><code># [server] เปิด unattended-upgrades สำหรับ security patch อัตโนมัติ
sudo dpkg-reconfigure --priority=low unattended-upgrades

# [server] เช็กสถานะ service
sudo systemctl status unattended-upgrades

</code></pre>
<p>คำอธิบาย:</p>
<ul>
<li><code>unattended-upgrades</code> ช่วยลง security update อัตโนมัติ</li>
<li>ลดความเสี่ยงจาก server ที่ลืม patch</li>
<li>ยังควรมี maintenance window และ monitoring อยู่ดี</li>
</ul>
<p>ถ้าต้องการดู config:</p>
<pre><code># [server] ดู rule ว่าจะ auto-upgrade package กลุ่มไหน
sudo vim /etc/apt/apt.conf.d/50unattended-upgrades

# [server] ดู schedule ของ auto update
sudo vim /etc/apt/apt.conf.d/20auto-upgrades

</code></pre>
<h2>8. เปิด Fail2ban</h2>
<pre><code># [server] เปิด Fail2ban และให้ start เองหลัง reboot
sudo systemctl enable --now fail2ban

# [server] ดูสถานะรวมของ Fail2ban
sudo fail2ban-client status

# [server] ดูสถานะ jail ของ SSH
sudo fail2ban-client status sshd

</code></pre>
<p>คำอธิบาย:</p>
<ul>
<li>Fail2ban ช่วย block IP ที่พยายาม login ผิดซ้ำ ๆ</li>
<li>เหมาะกับ server ที่เปิด SSH public</li>
<li>ไม่ได้แทนที่ SSH key และ firewall แต่เป็นชั้นป้องกันเพิ่ม</li>
</ul>
<h2>9. DNS, Nginx และ HTTPS</h2>
<p>ไปที่ DNS provider แล้วสร้าง record:</p>
<ul>
<li><code>A</code> record ชี้ domain ไปที่ IPv4 ของ server</li>
<li><code>AAAA</code> record ชี้ domain ไปที่ IPv6 ถ้าใช้งาน IPv6</li>
</ul>
<p>ถ้า server นี้ต้องรับ web traffic ให้ติดตั้ง Nginx และ Certbot:</p>
<pre><code># [server] ติดตั้ง Nginx และ Certbot plugin สำหรับ Nginx
sudo apt install -y nginx certbot python3-certbot-nginx

# [server] ตรวจ config Nginx
sudo nginx -t

# [server] เปิด Nginx และให้ start เองหลัง reboot
sudo systemctl enable --now nginx

# [server] ขอ SSL certificate จาก Let''s Encrypt เปลี่ยน example.com เป็น domain จริง
sudo certbot --nginx -d example.com

# [server] ทดสอบ auto-renew certificate
sudo certbot renew --dry-run

</code></pre>
<p>คำอธิบาย:</p>
<ul>
<li><code>nginx</code> ใช้เป็น web server หรือ reverse proxy</li>
<li><code>certbot --nginx</code> ขอ HTTPS certificate และช่วยแก้ config Nginx</li>
<li><code>renew --dry-run</code> ทดสอบว่าต่ออายุ certificate ได้จริง</li>
</ul>
<h2>10. ติดตั้ง Runtime ที่จำเป็น</h2>
<p>ติดตั้งเฉพาะสิ่งที่ application ต้องใช้ ไม่ต้องติดตั้งทุกอย่าง</p>
<h3>Docker</h3>
<pre><code># [server] สร้าง directory สำหรับเก็บ repository key
sudo install -m 0755 -d /etc/apt/keyrings

# [server] download Docker GPG key แล้วแปลงเป็น format ที่ apt ใช้ได้
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# [server] ให้ apt อ่าน key นี้ได้
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# [server] เพิ่ม Docker repository ตาม Ubuntu version ของเครื่องนี้
echo &quot;deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release &amp;&amp; echo $VERSION_CODENAME) stable&quot; | sudo tee /etc/apt/sources.list.d/docker.list &gt; /dev/null

# [server] refresh package list หลังเพิ่ม repository
sudo apt update

# [server] ติดตั้ง Docker Engine และ Docker Compose plugin
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# [server] ให้ user toppy ใช้ docker ได้โดยไม่ต้อง sudo หลัง login ใหม่
sudo usermod -aG docker toppy

</code></pre>
<p>หลังเพิ่ม group <code>docker</code> ให้ logout/login ใหม่ก่อนใช้ docker ด้วย user <code>toppy</code></p>
<h3>Node.js</h3>
<pre><code># [server] ติดตั้ง nvm สำหรับจัดการ Node.js version
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# [server] ติดตั้ง Node.js LTS
nvm install --lts

# [server] เช็ก version
node -v
npm -v

</code></pre>
<h3>Java</h3>
<pre><code># [server] ติดตั้ง Java 21 JDK
sudo apt install -y openjdk-21-jdk

# [server] เช็ก Java version
java -version

</code></pre>
<h2>11. โครงสร้าง Folder สำหรับ Application</h2>
<p>แนะนำให้แยก path แบบนี้:</p>
<pre><code>/opt/apps/&lt;app-name&gt;        code หรือ docker compose file
/var/log/&lt;app-name&gt;         log ของ application
/var/lib/&lt;app-name&gt;         data ที่ต้องอยู่ถาวร
/etc/&lt;app-name&gt;             config และ secret

</code></pre>
<p>สร้าง directory:</p>
<pre><code># [server] สร้าง folder หลักของ app
sudo mkdir -p /opt/apps/my-app /var/log/my-app /var/lib/my-app /etc/my-app

# [server] ให้ user toppy เป็นเจ้าของ folder ที่ app ต้องเขียนได้
sudo chown -R toppy:toppy /opt/apps/my-app /var/log/my-app /var/lib/my-app

# [server] จำกัดสิทธิ์ folder config
sudo chmod 750 /etc/my-app

# [server] สร้างไฟล์ .env สำหรับเก็บ config/secret
sudo touch /etc/my-app/.env

# [server] ให้ root เป็น owner และ group toppy อ่านได้
sudo chown root:toppy /etc/my-app/.env

# [server] จำกัดสิทธิ์ไฟล์ .env
sudo chmod 640 /etc/my-app/.env

</code></pre>
<p>หลักการ:</p>
<ul>
<li>code อยู่ที่ <code>/opt/apps</code></li>
<li>log อยู่ที่ <code>/var/log</code></li>
<li>data อยู่ที่ <code>/var/lib</code></li>
<li>secret อยู่ที่ <code>/etc</code> และไม่ commit เข้า git</li>
</ul>
<h2>12. สร้าง Systemd Service</h2>
<p>ถ้า app ไม่ได้รันด้วย Docker Compose อาจใช้ systemd เพื่อให้ app start เองหลัง reboot</p>
<pre><code># [server] สร้าง service file
sudo vim /etc/systemd/system/my-app.service

</code></pre>
<p>ตัวอย่าง service:</p>
<pre><code>[Unit]
Description=My App
After=network.target

[Service]
User=toppy
WorkingDirectory=/opt/apps/my-app
EnvironmentFile=/etc/my-app/.env
ExecStart=/usr/bin/java -jar app.jar
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target

</code></pre>
<p>คำอธิบาย:</p>
<ul>
<li><code>User=toppy</code> ให้ service รันด้วย user ปกติ ไม่ใช่ root</li>
<li><code>WorkingDirectory</code> คือ directory ที่ app ทำงาน</li>
<li><code>EnvironmentFile</code> โหลด environment variables จากไฟล์ <code>.env</code></li>
<li><code>ExecStart</code> คือ command สำหรับ start app</li>
<li><code>Restart=always</code> ให้ restart อัตโนมัติถ้า process ตาย</li>
</ul>
<p>เริ่มใช้งาน service:</p>
<pre><code># [server] reload systemd หลังเพิ่มหรือแก้ service file
sudo systemctl daemon-reload

# [server] enable service ตอน boot และ start ทันที
sudo systemctl enable --now my-app

# [server] ดู status ของ service
sudo systemctl status my-app

# [server] ดู log แบบ live
journalctl -u my-app -f

</code></pre>
<h2>13. คำสั่งตรวจสอบ Logs และ Health เบื้องต้น</h2>
<pre><code># [server] ดู service ที่ fail
systemctl --failed

# [server] ดู port ที่กำลัง listen และ process ที่ใช้ port นั้น
sudo ss -tulpn

# [server] ดู warning/error ล่าสุดจาก system journal
sudo journalctl -p warning -n 100

# [server] ดู access log ของ Nginx แบบ live
sudo tail -f /var/log/nginx/access.log

# [server] ดู error log ของ Nginx แบบ live
sudo tail -f /var/log/nginx/error.log

</code></pre>
<h2>14. Monitoring และ Backup</h2>
<p>ก่อนปล่อย production traffic ควรมีอย่างน้อย:</p>
<ul>
<li>Monitor CPU, RAM, disk</li>
<li>Monitor service health</li>
<li>Monitor HTTP health endpoint</li>
<li>Monitor TLS certificate expiry</li>
<li>Alert เมื่อ service down หรือ disk ใกล้เต็ม</li>
<li>Backup database</li>
<li>Backup uploaded files หรือ persistent volumes</li>
<li>Backup config สำคัญ</li>
<li>ทดสอบ restore จริง ไม่ใช่แค่สร้าง backup ได้</li>
</ul>
<h2>15. Checklist ก่อนใช้งานจริง</h2>
<ul>
<li>Login ด้วย user ใหม่ได้</li>
<li><code>sudo whoami</code> ได้ output เป็น <code>root</code></li>
<li>ปิด root SSH login แล้ว</li>
<li>ปิด password SSH แล้ว</li>
<li>เปิด firewall แล้ว</li>
<li>เปิดเฉพาะ port ที่จำเป็น</li>
<li>เปิด automatic security updates แล้ว</li>
<li>เปิด Fail2ban แล้ว</li>
<li>DNS ชี้มาที่ server แล้ว</li>
<li>HTTPS certificate ใช้งานได้</li>
<li>Runtime ที่ app ต้องใช้ติดตั้งแล้ว</li>
<li>Secret ไม่อยู่ใน git</li>
<li>Monitoring พร้อมแล้ว</li>
<li>Backup พร้อมแล้ว</li>
<li>ทดสอบ restore แล้ว</li>
<li>มี rollback plan แล้ว</li>
</ul>
<h2>16. Quick Audit Commands</h2>
<p>ใช้ชุดนี้ตรวจ server เร็ว ๆ:</p>
<pre><code># [server] ดู hostname, OS, kernel
hostnamectl
lsb_release -a
uname -a

# [server] ดู firewall
sudo ufw status verbose

# [server] ดู service ที่ fail
sudo systemctl --failed

# [server] ดู port ที่เปิดอยู่
sudo ss -tulpn

# [server] ดู disk และ memory
df -h
free -h

# [server] ดู Fail2ban
sudo fail2ban-client status
sudo fail2ban-client status sshd

# [server] ดู warning ล่าสุด
sudo journalctl -p warning -n 50

</code></pre>
', 'PUBLISHED', '2026-06-24 00:00:00+00', '2026-06-24 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 51: Windows port proxy
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (51, 1, FALSE, FALSE, '2026-06-25 00:00:00+00', '2026-06-25 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (51, 12) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (51, 36) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (51, 37) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    51, 51, 'en', 'windows-port-proxy', 'Windows port proxy', 'Goal Keep opencode + MCP in WSL, and expose Windows Anytype API to WSL. 1. Open PowerShell As Admin In Windows Start menu: Search PowerShell, right-click, choose Run as administrator. 2. Che...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Goal Keep opencode + MCP in WSL, and expose Windows Anytype API to WSL. 1. Open PowerShell As Admin In Windows Start menu: Search PowerShell, right-click, choose Run as administrator. 2. Che..."}]}]}', '<p>Goal
Keep opencode + MCP in WSL, and expose Windows Anytype API to WSL.</p>
<ol>
<li>Open PowerShell As Admin
In Windows Start menu:
Search PowerShell, right-click, choose Run as administrator.</li>
<li>Check Anytype API On Windows
Run this in PowerShell:
curl.exe <a href="http://127.0.0.1:31009">http://127.0.0.1:31009</a>
If it connects or returns JSON/error text, Anytype API is running.
If it fails, open Anytype and enable/start the API first.</li>
<li>Get Windows IP For WSL
In PowerShell, run:
ipconfig
Find your active adapter, usually vEthernet (WSL) or your Wi-Fi/Ethernet adapter.
You need the IPv4 address. Example:
IPv4 Address . . . . . . . . . . : 172.17.192.1
Your WSL already showed:
172.17.192.1</li>
<li>Add Windows Port Proxy
Run in Admin PowerShell:
netsh interface portproxy add v4tov4 listenaddress=172.17.192.1 listenport=31009 connectaddress=127.0.0.1 connectport=31009</li>
<li>Allow Firewall Port
Run in Admin PowerShell:
New-NetFirewallRule -DisplayName &quot;Anytype API for WSL&quot; -Direction Inbound -Action Allow -Protocol TCP -LocalPort 31009</li>
<li>Test From WSL
In WSL, run:
curl <a href="http://172.17.192.1:31009">http://172.17.192.1:31009</a>
If it no longer times out, the bridge works.</li>
<li>Confirm opencode Config
Your WSL opencode config already has:
&quot;ANYTYPE_API_BASE_URL&quot;: &quot;<a href="http://172.17.192.1:31009">http://172.17.192.1:31009</a>&quot;
File:
~/.config/opencode/opencode.jsonc</li>
<li>Restart opencode
Quit opencode fully and start it again from WSL.
If It Still Times Out
Run this in Admin PowerShell to inspect the proxy:
netsh interface portproxy show all
To remove and recreate it:
netsh interface portproxy delete v4tov4 listenaddress=172.17.192.1 listenport=31009
netsh interface portproxy add v4tov4 listenaddress=172.17.192.1 listenport=31009 connectaddress=127.0.0.1 connectport=31009</li>
</ol>
', 'PUBLISHED', '2026-06-25 00:00:00+00', '2026-06-25 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 52: Java BOM (Bill of Materials): จัดการเวอร์ชัน Dependency ให้เป็นชุดเดียวกัน
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (52, 1, FALSE, FALSE, '2026-11-04 00:00:00+00', '2026-11-04 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (52, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (52, 38) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (52, 39) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (52, 40) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    52, 52, 'th', 'java-bom-bill-of-materials', 'Java BOM (Bill of Materials): จัดการเวอร์ชัน Dependency ให้เป็นชุดเดียวกัน', 'เวลาพัฒนา Java application เรามักใช้ library หลายตัว และ library เหล่านั้นก็อาจเรียกใช้ library อื่นต่อเป็นทอด ๆ ปัญหาคือ dependency แต่ละตัวอาจร้องขอเวอร์ชันของ library ชุดเดียวกันคนละเวอร์...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"เวลาพัฒนา Java application เรามักใช้ library หลายตัว และ library เหล่านั้นก็อาจเรียกใช้ library อื่นต่อเป็นทอด ๆ ปัญหาคือ dependency แต่ละตัวอาจร้องขอเวอร์ชันของ library ชุดเดียวกันคนละเวอร์..."}]}]}', '<h1>Java BOM (Bill of Materials): จัดการเวอร์ชัน Dependency ให้เป็นชุดเดียวกัน</h1>
<p>เวลาพัฒนา Java application เรามักใช้ library หลายตัว และ library เหล่านั้นก็อาจเรียกใช้ library อื่นต่อเป็นทอด ๆ ปัญหาคือ dependency แต่ละตัวอาจร้องขอเวอร์ชันของ library ชุดเดียวกันคนละเวอร์ชัน จนเกิดความไม่เข้ากันตอนรันจริง</p>
<p><strong>BOM (Bill of Materials)</strong> ช่วยจัดการปัญหานี้ โดยประกาศชุดเวอร์ชันที่ควรใช้ร่วมกันไว้ในที่เดียว แล้วให้ build tool เช่น Maven นำเวอร์ชันเหล่านั้นไปใช้กับ dependency ที่เกี่ยวข้อง</p>
<blockquote>
<p>BOM ไม่ใช่ฟีเจอร์ของภาษา Java โดยตรง แต่เป็นแนวทางจัดการ dependency ใน Java ecosystem ผ่าน build tool และ metadata ของ library.</p>
</blockquote>
<h2>BOM คืออะไร</h2>
<p>BOM คือไฟล์ POM ที่ทำหน้าที่ระบุเวอร์ชันที่เข้ากันได้ของ library หลายตัวในกลุ่มเดียวกัน เช่น gRPC มีหลาย artifact ได้แก่ <code>grpc-api</code>, <code>grpc-core</code>, <code>grpc-stub</code> และ <code>grpc-netty-shaded</code> ซึ่งควรใช้เวอร์ชันที่สอดคล้องกัน</p>
<p>เมื่อ import BOM เข้ามา Maven จะนำรายการเวอร์ชันจาก BOM ไปใช้ในส่วน <code>dependencyManagement</code> ของโปรเจกต์ โดยทั่วไป BOM <strong>ไม่ได้เพิ่ม library ทั้งหมดเข้ามาในแอป</strong> แต่ช่วยจัดการเวอร์ชันให้ dependency ที่เราเลือกประกาศ หรือ dependency ที่ถูกดึงเข้ามาแบบ transitive</p>
<p>เปรียบเทียบง่าย ๆ: dependency คือรายการวัตถุดิบที่ต้องใช้ ส่วน BOM คือบัญชีรุ่น/สเปกที่รับรองว่าวัตถุดิบในชุดนั้นเข้ากันได้ BOM ไม่ได้สั่งให้ซื้อวัตถุดิบทุกชิ้นเอง</p>
<h2>ปัญหาที่ BOM ช่วยแก้</h2>
<h3>1. Version conflict หรือ version skew</h3>
<p>สมมติแอปใช้ <code>grpc-netty-shaded</code> เวอร์ชันใหม่ แต่ dependency ตัวอื่นดึง <code>grpc-core</code> และ <code>grpc-api</code> เวอร์ชันเก่ามา หากโมดูลหนึ่งเรียก class หรือ method ที่ไม่มีในอีกเวอร์ชัน อาจเกิดปัญหา linkage ตอน runtime เช่น <code>NoClassDefFoundError</code> หรือ <code>NoSuchMethodError</code></p>
<h3>2. การประกาศเวอร์ชันซ้ำและดูแลยาก</h3>
<p>ถ้าแต่ละ dependency ระบุเวอร์ชันแยกกัน การอัปเกรดต้องแก้หลายจุด และอาจพลาดบาง artifact ทำให้ชุด dependency ไม่สอดคล้องกัน BOM รวมกติกาเวอร์ชันไว้จุดเดียว ลดโอกาสเกิดความคลาดเคลื่อน</p>
<h3>3. Dependency แบบ transitive ที่มองไม่เห็นจากไฟล์หลัก</h3>
<p>การดูเฉพาะ dependency ที่เขียนไว้โดยตรงไม่เพียงพอ เพราะ library ที่เราใช้สามารถนำ dependency อื่นเข้ามาอีกชั้นหนึ่ง BOM ช่วยควบคุมเวอร์ชันที่ Maven เลือกใช้ใน dependency graph ได้ แต่ยังควรตรวจผลลัพธ์จริงด้วย <code>dependency:tree</code></p>
<h2>ตัวอย่างจากโปรเจกต์ <code>ms-duco</code></h2>
<p>ใน <code>ms-duco</code> มีการใช้ gRPC สำหรับการเชื่อมต่อกับ Ledger และ Temporal และยังมี Google Cloud Storage ที่นำ gRPC libraries เข้ามาใน dependency graph ด้วย</p>
<p>ก่อนจัดการเวอร์ชัน พบว่า dependency ที่ resolve ได้ไม่ตรงกัน:</p>
<table>
<thead>
<tr>
<th>Artifact</th>
<th>เวอร์ชันที่ resolve ได้ก่อนแก้</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>grpc-netty-shaded</code></td>
<td><code>1.84.3</code></td>
</tr>
<tr>
<td><code>grpc-core</code>, <code>grpc-api</code> และ gRPC บางตัว</td>
<td><code>1.67.1</code></td>
</tr>
</tbody>
</table>
<p>การเชื่อมต่อ Temporal จาก Java client ล้มเหลวด้วย <code>NoClassDefFoundError</code> ใน gRPC internals แม้ health check ของ Temporal server จะรายงานว่า <code>SERVING</code> ก็ตาม จุดนี้แสดงให้เห็นว่า server พร้อมให้บริการ ไม่ได้แปลว่า client ในแอปจะเชื่อมต่อและทำ RPC ได้สำเร็จ</p>
<h3>Import gRPC BOM ใน Maven</h3>
<p>กำหนดเวอร์ชันไว้ใน property และ import BOM ภายใน <code>&lt;dependencyManagement&gt;</code> ของ <code>pom.xml</code>:</p>
<pre><code class="language-xml">&lt;properties&gt;
    &lt;grpc.version&gt;1.84.3&lt;/grpc.version&gt;
&lt;/properties&gt;

&lt;dependencyManagement&gt;
    &lt;dependencies&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;io.grpc&lt;/groupId&gt;
            &lt;artifactId&gt;grpc-bom&lt;/artifactId&gt;
            &lt;version&gt;${grpc.version}&lt;/version&gt;
            &lt;type&gt;pom&lt;/type&gt;
            &lt;scope&gt;import&lt;/scope&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
&lt;/dependencyManagement&gt;
</code></pre>
<p>จากนั้นประกาศ dependency ที่ต้องการใช้โดยไม่ต้องระบุ <code>&lt;version&gt;</code> ซ้ำ:</p>
<pre><code class="language-xml">&lt;dependency&gt;
    &lt;groupId&gt;io.grpc&lt;/groupId&gt;
    &lt;artifactId&gt;grpc-netty-shaded&lt;/artifactId&gt;
&lt;/dependency&gt;
</code></pre>
<p>Maven จะใช้เวอร์ชันที่ BOM จัดการไว้กับ gRPC artifacts ที่อยู่ในขอบเขตของ BOM รวมถึง dependency ที่ถูกขอเข้ามาผ่าน library อื่น หากไม่มีการ override ด้วยการกำหนดเวอร์ชันหรือกติกาอื่นที่มีลำดับความสำคัญสูงกว่า</p>
<p>หลังแก้ <code>ms-duco</code> ตรวจ dependency tree แล้วพบว่า gRPC modules ที่เกี่ยวข้อง resolve เป็น <code>1.84.3</code> เหมือนกัน จากนั้น Temporal gRPC handshake ผ่าน และชุด focused tests ที่เกี่ยวข้องผ่านด้วย อย่างไรก็ตาม การยืนยันกับ environment จริงยังต้องทำแยกจากการทดสอบบนเครื่อง local</p>
<h2>วิธีตรวจสอบว่า BOM ทำงานจริง</h2>
<p>อย่าดูแค่เวอร์ชันใน <code>pom.xml</code> ให้ตรวจเวอร์ชันที่ Maven resolve แล้ว:</p>
<pre><code class="language-bash">./mvnw dependency:tree ''-Dincludes=io.grpc:*'' -Dverbose
</code></pre>
<p>สังเกตเวอร์ชันของ artifact หลายตัว เช่น <code>grpc-core</code>, <code>grpc-api</code>, <code>grpc-stub</code> และ <code>grpc-netty-shaded</code> ถ้าเห็นข้อความว่าเวอร์ชัน transitive ถูก “version managed from ...” โดย BOM ก็หมายถึง Maven เปลี่ยนคำขอเวอร์ชันเดิมให้เป็นเวอร์ชันที่ BOM กำหนด</p>
<p>จากนั้นทดสอบที่ boundary จริงด้วย ไม่ใช่ตรวจแค่ว่าแอป compile หรือ server ตอบ health check ได้ เช่น ลองเชื่อมต่อผ่าน Java client จริง และรัน test ที่เกี่ยวข้อง</p>
<h2>ทำไม BOM จึงสำคัญ</h2>
<ul>
<li><strong>ความเข้ากันได้:</strong> library ใน release family เดียวกันมีแนวโน้มทำงานร่วมกันได้ตามที่ผู้ผลิตตั้งใจ</li>
<li><strong>ลดความผิดพลาดจากการอัปเกรด:</strong> เปลี่ยนเวอร์ชันหลักจุดเดียว แทนการไล่แก้ทุก artifact</li>
<li><strong>ทำให้ build คาดเดาได้มากขึ้น:</strong> ลดความแตกต่างระหว่างเวอร์ชันที่ dependency แต่ละตัวร้องขอ</li>
<li><strong>ช่วยดูแลระบบระยะยาว:</strong> เห็นชัดว่ากลุ่ม library ใช้ release train ใด และตรวจสอบการอัปเกรดได้ง่ายขึ้น</li>
</ul>
<h2>ข้อควรระวัง</h2>
<ol>
<li><strong>BOM ไม่ได้แก้ dependency conflict ทุกชนิดโดยอัตโนมัติ</strong> ตรวจ dependency ที่ resolve จริง และดูว่ามี explicit version หรือ dependency management ชั้นอื่นมา override หรือไม่</li>
<li><strong>BOM ไม่ได้เพิ่ม dependency ให้แอป</strong> ต้องประกาศ library ที่ต้องการใช้อยู่ดี</li>
<li><strong>เลือก BOM ที่สอดคล้องกับ ecosystem และเวอร์ชันของแอป</strong> อย่าอัปเกรด BOM โดยไม่ดู compatibility, release notes และการทดสอบ</li>
<li><strong>อย่าสับสนระหว่าง BOM กับการ lock dependency</strong> BOM กำหนดแนวทางเวอร์ชันที่จัดการ ส่วนการทำ build ให้ reproducible ยังขึ้นกับการตรึงเวอร์ชันและการควบคุม build environment ด้วย</li>
<li><strong>ผลทดสอบ local ไม่เท่ากับผลทดสอบ deployment</strong> ต้องแยกหลักฐาน เช่น unit test, client handshake, integration test และ smoke test ใน environment เป้าหมาย</li>
</ol>
<h2>สรุป</h2>
<p>BOM เป็นวิธีรวมการจัดการเวอร์ชันของ library ที่ควรทำงานร่วมกันไว้เป็นชุดเดียว ตัวอย่าง <code>ms-duco</code> แสดงให้เห็นประโยชน์ชัดเจน: gRPC modules ที่ resolve คนละเวอร์ชันสัมพันธ์กับ client linkage failure; เมื่อ import gRPC BOM และตรวจ dependency tree จนทุก module ใช้เวอร์ชันที่สอดคล้องกัน การเชื่อมต่อ Temporal จาก client จึงผ่าน</p>
<p>หลักจำง่าย ๆ คือ <strong>ประกาศ dependency ที่ต้องใช้, ให้ BOM จัดการเวอร์ชันของชุดนั้น, ตรวจเวอร์ชันที่ resolve จริง และทดสอบการเชื่อมต่อที่ boundary จริง</strong></p>
<h2>อ้างอิงใน repository</h2>
<ul>
<li><code>ms-duco/pom.xml</code> — การ import gRPC BOM และ dependency declaration</li>
<li><code>ms-duco/docs/grpc-dependency-alignment-and-smoke-test-report.md</code> — ปัญหา version skew, ขั้นตอนตรวจสอบ และผลทดสอบ</li>
</ul>
', 'PUBLISHED', '2026-11-04 00:00:00+00', '2026-11-04 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 53: Kotlin Skill
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (53, 1, FALSE, FALSE, '2024-06-01 00:00:00+00', '2024-06-01 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (53, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    53, 53, 'en', 'kotlin-skill', 'Kotlin Skill', 'Technical notes and documentation from knowledge vault.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical notes and documentation from knowledge vault."}]}]}', '<ul>
<li>Kotlin Specialist: <a href="https://github.com/jeffallan/claude-skills">https://github.com/jeffallan/claude-skills</a></li>
<li>Kotlin Multiplatform: <a href="https://github.com/vitorpamplona/amethyst">https://github.com/vitorpamplona/amethyst</a></li>
<li>Kotlin API Design / expect/actual: <a href="https://github.com/chrisbanes/skills">https://github.com/chrisbanes/skills</a></li>
<li>Compose Multiplatform: <a href="https://github.com/athevon/genjutsu">https://github.com/athevon/genjutsu</a></li>
<li>Gradle Kotlin DSL Doctor: <a href="https://github.com/JetBrains/skills">https://github.com/JetBrains/skills</a></li>
</ul>
', 'PUBLISHED', '2024-06-01 00:00:00+00', '2024-06-01 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 54: ลองนึกภาพ: คุณกำลังเขียน API ที่ต้องดึงข้อมูลจากฐานข้อมูล 3 ตัว พร้อมกัน คุณจะทำยังไง?
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (54, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (54, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    54, 54, 'th', 'api-3', 'ลองนึกภาพ: คุณกำลังเขียน API ที่ต้องดึงข้อมูลจากฐานข้อมูล 3 ตัว พร้อมกัน คุณจะทำยังไง?', 'ใน Java: คุณต้องสร้าง threads หลายตัว (แพง! ใช้ memory มาก) หรือใช้ Callback hell (code ยุ่งเหยิง) ใน Kotlin: คุณใช้ Coroutines - lightweight threads ที่ทำให้ async code อ่านง่ายเหมือน synch...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ใน Java: คุณต้องสร้าง threads หลายตัว (แพง! ใช้ memory มาก) หรือใช้ Callback hell (code ยุ่งเหยิง) ใน Kotlin: คุณใช้ Coroutines - lightweight threads ที่ทำให้ async code อ่านง่ายเหมือน synch..."}]}]}', '<p>ใน Java: คุณต้องสร้าง threads หลายตัว (แพง! ใช้ memory มาก) หรือใช้ Callback hell (code ยุ่งเหยิง)
ใน Kotlin: คุณใช้ <strong>Coroutines</strong> - lightweight threads ที่ทำให้ async code อ่านง่ายเหมือน synchronous code!
นั่นคือพลังของ Coroutines - ทำให้ async programming ง่าย สะอาด และมีประสิทธิภาพสูง!</p>
<h2>ปัญหาเดิมกับ Threads</h2>
<p>มาเข้าใจปัญหาก่อน:</p>
<pre><code>// Thread approach - แพงและยุ่ง
val thread1 = Thread {
    val data1 = fetchFromDatabase1()  // Block thread นี้
    println(data1)
}
val thread2 = Thread {
    val data2 = fetchFromDatabase2()  // Block thread นี้
    println(data2)
}
thread1.start()
thread2.start()
thread1.join()  // รอให้ thread จบ
thread2.join()

</code></pre>
<p><strong>ปัญหา:</strong></p>
<ul>
<li>สร้าง thread ราคาแพง (ใช้ memory มาก)</li>
<li>Threads มีจำนวนจำกัด (~1000 threads)</li>
<li>Code ยุ่งเหยิง และ hard to debug</li>
</ul>
<h2>Coroutines คืออะไร?</h2>
<p>Coroutines คือ <strong>lightweight threads</strong> - มีน้ำหนักเบา สามารถสร้างได้หลายพันตัว โดยไม่กังวล!</p>
<pre><code>// Coroutines approach - เบา และสะอาด
launch {
    val data1 = fetchFromDatabase1()  // Suspend ไม่ block thread
    println(data1)
}
launch {
    val data2 = fetchFromDatabase2()  // Suspend ไม่ block thread
    println(data2)
}

</code></pre>
<p><strong>ข้อดี:</strong></p>
<ul>
<li>เบา - สามารถสร้างได้ 100,000+ coroutines</li>
<li>สะอาด - code อ่านเหมือน synchronous</li>
<li>ง่ายต่อ debug</li>
</ul>
<h2>ความเป็นมา: Suspend Functions</h2>
<p>Coroutines ใช้ <strong>suspend functions</strong> - ฟังก์ชันที่สามารถ &quot;หยุด&quot; ได้</p>
<pre><code>// ฟังก์ชัน suspend
suspend fun fetchUser(id: Int): User {
    // ฟังก์ชันนี้สามารถ suspend ได้
    return withContext(Dispatchers.IO) {
        // ดึงข้อมูลจากเน็ต (blocking operation)
        apiService.getUser(id)
    }
}
// ใช้งาน
launch {
    val user = fetchUser(1)  // Suspend ที่นี่
    println(user)  // ทำงานต่อเมื่อ fetchUser จบ
}

</code></pre>
<h2>ส่วนประกอบของ Coroutines</h2>
<h3>1. Scope</h3>
<p>Scope กำหนด <strong>lifetime</strong> ของ coroutine:</p>
<pre><code>// GlobalScope - ใช้ได้ตลอดชีวิตของ app (ไม่แนะนำ!)
GlobalScope.launch {
    println(&quot;This runs forever&quot;)
}
// LifecycleScope - ใช้ใน Android Activity/Fragment
lifecycleScope.launch {
    println(&quot;Dies when activity dies&quot;)
}
// runBlocking - รอให้ coroutine จบ (ใช้ใน main thread)
fun main() = runBlocking {
    println(&quot;Start&quot;)
    launch { delay(1000) }
    println(&quot;End&quot;)  // รอให้ launch จบ
}

</code></pre>
<h3>2. Builders</h3>
<p>Builders ใช้สร้าง coroutine:</p>
<pre><code>// launch - Fire and forget (ไม่คืนค่า)
launch {
    println(&quot;Do something&quot;)
}
// async - Return result (คืนค่า)
val result = async {
    return@async &quot;Hello&quot;
}
println(result.await())  // &quot;Hello&quot;
// runBlocking - Block thread ปัจจุบัน
runBlocking {
    delay(1000)
    println(&quot;Done&quot;)
}

</code></pre>
<h3>3. Dispatcher</h3>
<p>Dispatcher กำหนด <strong>thread</strong> ที่ coroutine จะรันบน:</p>
<pre><code>// Dispatchers.Main - UI thread (Android)
launch(Dispatchers.Main) {
    updateUI()
}
// Dispatchers.IO - I/O operations (Network, Database)
launch(Dispatchers.IO) {
    val data = fetchFromNetwork()  // ไม่ block main thread
}
// Dispatchers.Default - CPU-intensive tasks
launch(Dispatchers.Default) {
    val result = heavyComputation()
}
// Dispatchers.Unconfined - ไม่สำคัญว่า thread ไหน
launch(Dispatchers.Unconfined) {
    println(&quot;Anywhere&quot;)
}

</code></pre>
<h2>ตัวอย่างจริงๆ</h2>
<h3>ตัวอย่าง 1: Fetch Data จาก API</h3>
<pre><code>data class User(val id: Int, val name: String)
// Suspend function
suspend fun fetchUser(id: Int): User {
    return withContext(Dispatchers.IO) {
        // เสมือนว่าเรา block ที่นี่ แต่จริงๆ coroutine suspend
        Thread.sleep(1000)  // Simulate network call
        User(id, &quot;John&quot;)
    }
}
// ใช้งาน
launch {
    val user = fetchUser(1)
    println(&quot;User: ${user.name}&quot;)  // &quot;User: John&quot;
}

</code></pre>
<h3>ตัวอย่าง 2: Parallel Requests</h3>
<pre><code>suspend fun fetchMultipleUsers(ids: List&lt;Int&gt;): List&lt;User&gt; {
    return ids.map { id -&gt;
        async(Dispatchers.IO) {
            fetchUser(id)  // ทำพร้อมกัน
        }
    }.awaitAll()  // รอให้ทั้งหมดจบ
}
// ใช้งาน
launch {
    val users = fetchMultipleUsers(listOf(1, 2, 3))
    println(&quot;Got ${users.size} users&quot;)  // &quot;Got 3 users&quot;
}

</code></pre>
<h3>ตัวอย่าง 3: Timeout</h3>
<pre><code>launch {
    try {
        withTimeoutOrNull(5000) {  // 5 seconds timeout
            val data = fetchExpensiveData()
            println(&quot;Data: $data&quot;)
        }
    } catch (e: TimeoutCancellationException) {
        println(&quot;Request timed out&quot;)
    }
}

</code></pre>
<h2>Coroutine Scopes</h2>
<h3>LifecycleScope (Android)</h3>
<pre><code>class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        lifecycleScope.launch {
            // ยกเลิกอัตโนมัติเมื่อ activity ถูก destroy
            val user = fetchUser(1)
            updateUI(user)
        }
    }
}

</code></pre>
<h3>ViewModelScope (Android)</h3>
<pre><code>class UserViewModel : ViewModel() {
    fun loadUser(id: Int) {
        viewModelScope.launch {
            // ยกเลิกอัตโนมัติเมื่อ ViewModel cleared
            val user = fetchUser(id)
            _userLiveData.value = user
        }
    }
}

</code></pre>
<h3>Custom Scope</h3>
<pre><code>class MyRepository {
    private val coroutineScope = CoroutineScope(Dispatchers.Main + Job())
    fun fetchData() {
        coroutineScope.launch {
            val data = loadData()
            println(data)
        }
    }
    fun cleanup() {
        coroutineScope.cancel()  // ยกเลิกทั้งหมด
    }
}

</code></pre>
<h2>Error Handling</h2>
<pre><code>launch {
    try {
        val data = fetchData()
        println(data)
    } catch (e: Exception) {
        println(&quot;Error: ${e.message}&quot;)
    }
}
// หรือใช้ CoroutineExceptionHandler
val exceptionHandler = CoroutineExceptionHandler { _, exception -&gt;
    println(&quot;Caught: $exception&quot;)
}
launch(exceptionHandler) {
    throw Exception(&quot;Oops!&quot;)
}

</code></pre>
<h2>Cancellation</h2>
<pre><code>val job = launch {
    repeat(10) { i -&gt;
        println(&quot;Working $i&quot;)
        delay(1000)
    }
}
delay(3500)
job.cancel()  // ยกเลิก coroutine

</code></pre>
<h2>withContext</h2>
<p>ใช้เปลี่ยน dispatcher ภายใน suspend function:</p>
<pre><code>suspend fun loadUserWithPicture(id: Int): Pair&lt;User, Bitmap&gt; {
    // ทำงาน I/O บน IO dispatcher
    val user = withContext(Dispatchers.IO) {
        fetchUser(id)
    }
    // ทำงาน CPU-intensive บน Default dispatcher
    val picture = withContext(Dispatchers.Default) {
        downloadAndProcessPicture(user.pictureUrl)
    }
    return Pair(user, picture)
}

</code></pre>
<h2>Ktor + Coroutines (Real Example)</h2>
<pre><code>// Ktor route ที่ใช้ coroutines
routing {
    get(&quot;/users/{id}&quot;) {
        val id = call.parameters[&quot;id&quot;]?.toInt() ?: return@get
        try {
            val user = withContext(Dispatchers.IO) {
                database.getUserById(id)
            }
            call.respond(user)
        } catch (e: Exception) {
            call.respond(HttpStatusCode.NotFound)
        }
    }
}

</code></pre>
<h2>Best Practices</h2>
<h3>✅ ทำแบบนี้</h3>
<pre><code>// ใช้ structured concurrency
lifecycleScope.launch {
    val data = fetchData()  // Suspend ไม่ block
    updateUI(data)
}
// ใช้ withContext เพื่อเปลี่ยน dispatcher
suspend fun fetchData(): Data = withContext(Dispatchers.IO) {
    // ทำงาน I/O ที่นี่
}
// Handle exceptions
launch {
    try {
        val data = fetchData()
    } catch (e: Exception) {
        showError(e)
    }
}

</code></pre>
<h3>❌ หลีกเลี่ยงแบบนี้</h3>
<pre><code>// อย่าใช้ GlobalScope
GlobalScope.launch {
    // Memory leak!
}
// อย่า block main thread
runBlocking {
    val data = fetchData()  // ใช้เฉพาะ main function
}
// อย่า ignore exceptions
launch {
    fetchData()  // Exception ไป ไหนแล้ว?
}

</code></pre>
<h2>สรุป</h2>
<p><strong>Coroutines</strong> ทำให้ async programming เป็นเรื่องง่าย:</p>
<ul>
<li>Lightweight - สามารถสร้างได้หลายพัน</li>
<li>Readable - code อ่านเหมือน synchronous</li>
<li>Safe - structured concurrency ป้องกัน memory leaks</li>
</ul>
<p>นี่คือเหตุผลที่ Kotlin coroutines เป็นหนึ่งในฟีเจอร์ที่ดีที่สุดของ Kotlin และเหมาะสำหรับการสร้าง high-performance APIs!</p>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 55: DSL (Domain Sepacific Language)
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (55, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (55, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    55, 55, 'th', 'dsl-domain-sepacific-language', 'DSL (Domain Sepacific Language)', 'ได้เลย ผมจะอธิบาย DSL ในบริบทที่คุณกำลังคุยอยู่ (Arrow / Kotlin / effect) แบบ ตรงจุด ไม่วิชาการเกิน และผูกกับสิ่งที่คนในบทสนทนารู้สึกจริง ๆ ---',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ได้เลย ผมจะอธิบาย DSL ในบริบทที่คุณกำลังคุยอยู่ (Arrow / Kotlin / effect) แบบ ตรงจุด ไม่วิชาการเกิน และผูกกับสิ่งที่คนในบทสนทนารู้สึกจริง ๆ ---"}]}]}', '<h2>ได้เลย ผมจะอธิบาย <strong>DSL</strong> ในบริบทที่คุณกำลังคุยอยู่ (Arrow / Kotlin / effect) แบบ <strong>ตรงจุด ไม่วิชาการเกิน</strong> และผูกกับสิ่งที่คนในบทสนทนารู้สึกจริง ๆ</h2>
<h2>DSL คืออะไร (แบบใช้งานจริง)</h2>
<h2><strong>DSL – Domain Specific Language</strong>
คือ “ภาษาย่อย” ที่ถูกออกแบบมาให้ <strong>เขียนโค้ดเหมือนกำลังเขียนความคิดในหัวเรา</strong>
ไม่ใช่ภาษาใหม่
แต่เป็น <strong>syntax + abstraction</strong> ที่ซ่อนรายละเอียดบางอย่างไว้</h2>
<h2>DSL ใน Kotlin / Arrow คืออะไร</h2>
<p>ตัวอย่างที่คุณใช้:</p>
<pre><code>either {
  val xml = fetchRss(url).bind()
  val titles = parse(xml).bind()
  write(titles).bind()
}

</code></pre>
<p>สิ่งที่ DSL ทำให้คุณ <strong>ไม่ต้องคิดเอง</strong>:</p>
<ul>
<li>flatMap / map</li>
<li>error propagation</li>
<li>short-circuit</li>
<li>context passing</li>
</ul>
<p>คุณแค่เขียน:</p>
<blockquote>
<p>ทำ A → B → C</p>
</blockquote>
<h2>➡️ <strong>นี่คือพลังของ DSL</strong></h2>
<h2>แล้ว “magic” ของ DSL มาจากไหน</h2>
<p>ใน Arrow effect DSL:</p>
<ul>
<li>bind() = จุดที่ DSL “แทรก logic” เข้าไป</li>
<li>compiler + context receivers ทำงานร่วมกัน</li>
<li>runtime คอยจัดการ control flow</li>
</ul>
<p>สิ่งที่เกิดขึ้นจริง ๆ เบื้องหลังคือ:</p>
<ul>
<li>stack ของ computation</li>
<li>exception-like short-circuit</li>
<li>typeclass simulation</li>
</ul>
<h2>แต่ทั้งหมดถูก <strong>ซ่อน</strong> ไว้</h2>
<h2>ทำไม DSL ถึง “น่ากลัว” เมื่อเริ่มซับซ้อน</h2>
<p>นี่คือจุดที่คนในบทสนทนาคุณพูดถึงถูกต้องมาก</p>
<h3>1️⃣ abstraction รั่ว (leaky abstraction)</h3>
<p>ตอน happy path:</p>
<pre><code>val x = foo().bind()

</code></pre>
<p>ดูง่ายมาก
แต่พอ type ไม่ตรง:</p>
<ul>
<li>error ไม่ชี้มาที่ domain code</li>
<li>เด้งไปที่:
<ul>
<li>RestrictedSuspendEffect</li>
<li>Raise</li>
<li>EffectScope</li>
</ul>
</li>
</ul>
<blockquote>
<p>error มาจาก “ภาษา DSL” ไม่ใช่จาก “โค้ดเรา”</p>
</blockquote>
<hr />
<h3>2️⃣ compose ข้าม monad = DSL เริ่มพัง</h3>
<p>ตัวอย่างสถานการณ์อันตราย:</p>
<ul>
<li>Either + Effect</li>
<li>Either + Option</li>
<li>IO + Resource</li>
</ul>
<p>ใน Scala:</p>
<ul>
<li>compiler บอกชัดว่า type ไหนไม่ match</li>
</ul>
<p>ใน Kotlin DSL:</p>
<ul>
<li>compiler error ยาว</li>
<li>mental model ต้องเข้าใจ DSL implementation</li>
</ul>
<h2>➡️ <strong>DSL ซ่อน complexity แต่ไม่ได้ลบมัน</strong></h2>
<h3>3️⃣ Debug mindset เปลี่ยน</h3>
<p>ปกติ Kotlin:</p>
<ul>
<li>error = type mismatch ตรงจุด</li>
</ul>
<p>DSL-heavy:</p>
<ul>
<li>error = violation ของ rule ภายใน DSL</li>
</ul>
<p>คนที่ไม่รู้ DSL ลึกพอจะรู้สึกว่า:</p>
<blockquote>
<p>“โค้ดไม่ได้พัง แต่ DSL งอแง”</p>
</blockquote>
<hr />
<h2>ทำไม Kotlin ถึงเลือก DSL แบบนี้</h2>
<p>เพราะ Kotlin:</p>
<ul>
<li>ไม่มี Higher-Kinded Types</li>
<li>type system ไม่ expressive เท่า Scala</li>
</ul>
<p>Arrow เลยต้อง:</p>
<ul>
<li>สร้าง “ภาษาย่อย” มาช่วย</li>
<li>optimize DX มากกว่า type purity</li>
</ul>
<blockquote>
<p>Kotlin DSL = pragmatic compromise</p>
</blockquote>
<hr />
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 56: Extension Functions ใน Kotlin
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (56, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (56, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    56, 56, 'th', 'extension-functions-kotlin', 'Extension Functions ใน Kotlin', 'ลองนึกภาพ: คุณกำลังใช้ String class ที่ถูกสร้างมาตั้งแต่ Java 1.0 และคุณต้องการเพิ่มฟังก์ชันใหม่ให้มัน ใน Java: คุณต้องสร้าง utility class และเรียกใช้แบบ StringUtils.reverse("hello") ใน Kotl...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ลองนึกภาพ: คุณกำลังใช้ String class ที่ถูกสร้างมาตั้งแต่ Java 1.0 และคุณต้องการเพิ่มฟังก์ชันใหม่ให้มัน ใน Java: คุณต้องสร้าง utility class และเรียกใช้แบบ StringUtils.reverse(\"hello\") ใน Kotl..."}]}]}', '<p>ลองนึกภาพ: คุณกำลังใช้ String class ที่ถูกสร้างมาตั้งแต่ Java 1.0 และคุณต้องการเพิ่มฟังก์ชันใหม่ให้มัน
<strong>ใน Java:</strong> คุณต้องสร้าง utility class และเรียกใช้แบบ <code>StringUtils.reverse(&quot;hello&quot;)</code>
<strong>ใน Kotlin:</strong> คุณสามารถเพิ่มฟังก์ชันโดยตรง <code>&quot;hello&quot;.reverse()</code> - ดูสะอาดและเป็นธรรมชาติมากกว่า
นั่นคือ <strong>Extension Functions</strong> - หนึ่งในฟีเจอร์ที่ทรงพลังที่สุดของ Kotlin!</p>
<h2>ความเป็นมา</h2>
<p>Extension Functions ช่วยให้คุณสามารถ <strong>เพิ่มเมธอดใหม่ให้กับ class ที่มีอยู่</strong> โดยไม่ต้องสืบทอด (inherit) หรือสร้าง wrapper class</p>
<h2>ไวยากรณ์พื้นฐาน</h2>
<pre><code>fun ReceiverType.extensionFunctionName(parameter: Type): ReturnType {
    // this หมายถึง instance ของ ReceiverType
    return result
}

</code></pre>
<p><strong>ตัวอย่างง่ายๆ:</strong></p>
<pre><code>// เพิ่มฟังก์ชัน reverse ให้ String
fun String.reverse(): String {
    return this.reversed()
}
// ใช้งาน
val text = &quot;hello&quot;
println(text.reverse())  // &quot;olleh&quot;

</code></pre>
<h2>ตัวอย่างจริงๆ</h2>
<h3>1. Extension Function สำหรับ String</h3>
<pre><code>// ตรวจสอบว่า String เป็น email ที่ถูกต้องหรือไม่
fun String.isValidEmail(): Boolean {
    return this.contains(&quot;@&quot;) &amp;&amp; this.contains(&quot;.&quot;)
}
// ใช้งาน
val email = &quot;john@example.com&quot;
if (email.isValidEmail()) {
    println(&quot;Valid email&quot;)
}
// ไม่ต้องเขียน StringUtils.isValidEmail(email)

</code></pre>
<h3>2. Extension Function สำหรับ List</h3>
<pre><code>// หาค่า average ของ List&lt;Int&gt;
fun List&lt;Int&gt;.average(): Double {
    if (this.isEmpty()) return 0.0
    return this.sum().toDouble() / this.size
}
// ใช้งาน
val numbers = listOf(1, 2, 3, 4, 5)
println(numbers.average())  // 3.0

</code></pre>
<h3>3. Extension Function สำหรับ Int</h3>
<pre><code>// ทำซ้ำสิ่งใดสิ่งหนึ่ง n ครั้ง
fun Int.times(action: () -&gt; Unit) {
    for (i in 0 until this) {
        action()
    }
}
// ใช้งาน
3.times {
    println(&quot;Hello!&quot;)
}
// Output:
// Hello!
// Hello!
// Hello!

</code></pre>
<h3>4. Extension Function สำหรับ Any</h3>
<pre><code>// Print object พร้อมชื่อประเภท
fun Any.printWithType() {
    println(&quot;⟦LATEX_INLINE_0⟧this&quot;)
}
// ใช้งาน
val text = &quot;Hello&quot;
val number = 42
val list = listOf(1, 2, 3)
text.printWithType()  // String: Hello
number.printWithType()  // Int: 42
list.printWithType()  // ArrayList: [1, 2, 3]

</code></pre>
<h2>Extension Functions กับ Receiver Type</h2>
<pre><code>// Receiver type คือ String
fun String.addExclamation(): String {
    return this + &quot;!&quot;
}
val greeting = &quot;Hello&quot;
println(greeting.addExclamation())  // &quot;Hello!&quot;
// ในตัวอย่างนี้ this หมายถึง &quot;Hello&quot;

</code></pre>
<h2>Extension Properties</h2>
<p>นอกจาก extension functions คุณยังสามารถเพิ่ม properties ได้:</p>
<pre><code>// เพิ่ม property ให้ String
val String.wordCount: Int
    get() = this.split(&quot; &quot;).size
// ใช้งาน
val text = &quot;Hello world from Kotlin&quot;
println(text.wordCount)  // 4

</code></pre>
<h2>Extension Functions กับ Nullable Types</h2>
<pre><code>// Extension function สำหรับ nullable String
fun String?.isNullOrEmpty(): Boolean {
    return this == null || this.isEmpty()
}
// ใช้งาน
val text: String? = null
println(text.isNullOrEmpty())  // true
val text2: String? = &quot;Hello&quot;
println(text2.isNullOrEmpty())  // false

</code></pre>
<h2>Scope ของ Extension Functions</h2>
<p>Extension functions มี scope - หมายความว่าคุณสามารถเลือกว่าจะให้มันใช้ได้ที่ไหน</p>
<h3>1. Top-level Extension Functions</h3>
<pre><code>// ในไฟล์ StringExtensions.kt
fun String.isValidEmail(): Boolean {
    return this.contains(&quot;@&quot;)
}
// ใช้ได้ทุกที่ที่ import ไฟล์นี้
import com.example.StringExtensions.isValidEmail
val email = &quot;john@example.com&quot;
email.isValidEmail()

</code></pre>
<h3>2. Extension Functions ใน Class</h3>
<pre><code>class User(val name: String, val email: String) {
    // Extension function สำหรับ String ที่ใช้ได้เฉพาะใน class นี้
    fun String.isValidEmail(): Boolean {
        return this.contains(&quot;@&quot;) &amp;&amp; this.contains(&quot;.&quot;)
    }
    fun validateEmail() {
        if (email.isValidEmail()) {
            println(&quot;Email valid&quot;)
        }
    }
}
// ใช้ได้เฉพาะใน User class
val user = User(&quot;John&quot;, &quot;john@example.com&quot;)
// user.email.isValidEmail()  // ERROR! ไม่มี scope
user.validateEmail()  // OK

</code></pre>
<h2>Extension Functions vs Method Overriding</h2>
<p>Extension functions <strong>ไม่สามารถ override</strong> method ของ class ได้:</p>
<pre><code>open class Animal {
    fun sound() {
        println(&quot;Some sound&quot;)
    }
}
class Dog : Animal() {
    override fun sound() {
        println(&quot;Woof!&quot;)
    }
}
// Extension function ไม่ override method ของ class
fun Animal.sound() {
    println(&quot;Extension sound&quot;)
}
val dog: Dog = Dog()
dog.sound()  // &quot;Woof!&quot; (method ของ class ชนะ extension function)
val animal: Animal = dog
animal.sound()  // &quot;Extension sound&quot; (เรียก extension function)

</code></pre>
<h2>Extension Functions ทั่วไปที่มีประโยชน์</h2>
<h3>1. JSON Parsing Helper</h3>
<pre><code>fun &lt;T&gt; String.parseJson(clazz: Class&lt;T&gt;): T {
    // ใช้ JSON library เช่น Gson
    return Gson().fromJson(this, clazz)
}
// ใช้งาน
val json = &quot;&quot;&quot;{&quot;name&quot;:&quot;John&quot;,&quot;age&quot;:30}&quot;&quot;&quot;
val user: User = json.parseJson(User::class.java)

</code></pre>
<h3>2. View Extensions (สำหรับ Android)</h3>
<pre><code>fun View.show() {
    this.visibility = View.VISIBLE
}
fun View.hide() {
    this.visibility = View.GONE
}
// ใช้งาน
myButton.show()
myTextView.hide()

</code></pre>
<h3>3. Collection Extensions</h3>
<pre><code>// หา element ที่มากที่สุด
fun &lt;T : Comparable&lt;T&gt;&gt; List&lt;T&gt;.findMax(): T? {
    return this.maxOrNull()
}
// ใช้งาน
val numbers = listOf(5, 2, 8, 1, 9)
println(numbers.findMax())  // 9

</code></pre>
<h3>4. String Formatting</h3>
<pre><code>fun String.capitalizeWords(): String {
    return this.split(&quot; &quot;)
        .joinToString(&quot; &quot;) { it.capitalize() }
}
// ใช้งาน
val text = &quot;hello world from kotlin&quot;
println(text.capitalizeWords())  // &quot;Hello World From Kotlin&quot;

</code></pre>
<h2>Lambda Receivers</h2>
<p>Extension functions สามารถมี lambda ที่มี receiver ได้:</p>
<pre><code>fun &lt;T&gt; T.apply(block: T.() -&gt; Unit): T {
    block()
    return this
}
// ใช้งาน
val user = User(&quot;John&quot;, &quot;john@example.com&quot;).apply {
    println(name)
    println(email)
}

</code></pre>
<h2>Extension Functions vs Member Functions</h2>
<pre><code>class Calculator {
    // Member function
    fun add(a: Int, b: Int): Int {
        return a + b
    }
}
// Extension function
fun Calculator.subtract(a: Int, b: Int): Int {
    return a - b
}
val calc = Calculator()
calc.add(5, 3)  // 8 - member function
calc.subtract(5, 3)  // 2 - extension function

</code></pre>
<p><strong>ความแตกต่าง:</strong></p>
<ul>
<li><strong>Member functions</strong>: เป็นส่วนของ class definition</li>
<li><strong>Extension functions</strong>: เพิ่มเข้ามาจากภายนอก</li>
</ul>
<h2>Best Practices</h2>
<h3>✅ ทำแบบนี้</h3>
<pre><code>// ชื่อที่มีความหมาย
fun String.isValidEmail(): Boolean = this.contains(&quot;@&quot;)
// ใช้ extension functions สำหรับ utility
fun &lt;T&gt; List&lt;T&gt;.second(): T = this[1]
// จัดกลุ่ม extension functions ที่เกี่ยวข้อง
fun String.isValidEmail(): Boolean = ...
fun String.isValidPhone(): Boolean = ...
fun String.isValidUrl(): Boolean = ...

</code></pre>
<h3>❌ หลีกเลี่ยงแบบนี้</h3>
<pre><code>// ชื่อที่สับสน
fun String.process(): String = ...  // process อะไร?
// Extension functions ที่เปลี่ยนแปลง state
fun String.append(text: String) {
    this = this + text  // ERROR! String immutable
}
// Extension functions ที่ทำสิ่งที่ไม่คาดคิด
fun Int.print() {
    println(&quot;The number is: $this&quot;)
}
// ผู้ใช้ไม่คาดหวังว่า 5.print() จะ print สิ่งอะไร

</code></pre>
<h2>Extension Functions ใน Real Projects</h2>
<h3>API Response Helper</h3>
<pre><code>data class ApiResponse&lt;T&gt;(
    val data: T?,
    val error: String?
)
fun &lt;T&gt; ApiResponse&lt;T&gt;.getOrNull(): T? = this.data
fun &lt;T&gt; ApiResponse&lt;T&gt;.getOrThrow(): T {
    return this.data ?: throw Exception(this.error ?: &quot;Unknown error&quot;)
}
// ใช้งาน
val response: ApiResponse&lt;User&gt; = fetchUser()
val user = response.getOrNull()  // null-safe

</code></pre>
<h3>Database Query Helper</h3>
<pre><code>fun &lt;T&gt; List&lt;T&gt;.paginate(page: Int, pageSize: Int): List&lt;T&gt; {
    val start = (page - 1) * pageSize
    val end = minOf(start + pageSize, this.size)
    return this.subList(start, end)
}
// ใช้งาน
val users = listOf(user1, user2, user3, user4, user5)
val page1 = users.paginate(1, 2)  // [user1, user2]
val page2 = users.paginate(2, 2)  // [user3, user4]

</code></pre>
<h2>สรุป</h2>
<table>
<thead>
<tr>
<th align="left">ลักษณะ   <br></th>
<th align="left">คำอธิบาย   <br></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong>ไวยากรณ์</strong>   <br></td>
<td align="left"><code>fun ReceiverType.functionName() { }</code>   <br></td>
</tr>
<tr>
<td align="left"><strong>ใช้ได้กับ</strong>   <br></td>
<td align="left">Classes, Interfaces, Built-in Types   <br></td>
</tr>
<tr>
<td align="left"><strong>Receiver</strong>   <br></td>
<td align="left"><code>this</code> หมายถึง instance ของ receiver type   <br></td>
</tr>
<tr>
<td align="left"><strong>Scope</strong>   <br></td>
<td align="left">Top-level หรือ Class-level   <br></td>
</tr>
<tr>
<td align="left"><strong>Override</strong>   <br></td>
<td align="left">ไม่สามารถ override member functions   <br></td>
</tr>
<tr>
<td align="left"><strong>Nullable</strong>   <br></td>
<td align="left">สามารถสร้าง extension สำหรับ nullable types   <br></td>
</tr>
<tr>
<td align="left"><strong>Generic</strong>   <br></td>
<td align="left">สามารถใช้ generic types ได้   <br></td>
</tr>
</tbody>
</table>
<p><strong>ข้อสำคัญ:</strong> Extension Functions เป็นวิธีที่ดีในการขยายฟังก์ชันของ class ที่มีอยู่โดยไม่ต้องสืบทอด ทำให้ code อ่านง่ายและเป็นธรรมชาติมากขึ้น
มันเป็นหนึ่งในเหตุผลที่ทำให้ Kotlin code สะอาดและง่ายต่อการอ่านกว่า Java code!</p>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 57: Kotlin Collections Advanced - Sequences, Lazy Evaluation
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (57, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (57, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    57, 57, 'en', 'kotlin-collections-advanced-sequences-lazy-evaluation', 'Kotlin Collections Advanced - Sequences, Lazy Evaluation', 'Draft article about sequences and lazy evaluation in Kotlin collections.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Draft article about sequences and lazy evaluation in Kotlin collections."}]}]}', '<h1>Kotlin Collections Advanced - Sequences, Lazy Evaluation</h1>
<p>Draft article about sequences and lazy evaluation in Kotlin collections.</p>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 58: Kotlin: Null Safety ใน Kotlin - ความปลอดภัยจาก Null Pointer Exception
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (58, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (58, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    58, 58, 'th', 'kotlin-null-safety-kotlin-null-pointer-exception', 'Kotlin: Null Safety ใน Kotlin - ความปลอดภัยจาก Null Pointer Exception', 'ถ้าคุณเคยทำงานกับ Java มาก่อน คุณอาจเคยประสบกับ NullPointerException (NPE) ซึ่งเป็นข้อผิดพลาดที่เกิดขึ้นเมื่อคุณพยายามเรียกใช้เมธอดหรือเข้าถึงคุณสมบัติของอ็อบเจกต์ที่เป็น null ข่าวดีคือ: Kot...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ถ้าคุณเคยทำงานกับ Java มาก่อน คุณอาจเคยประสบกับ NullPointerException (NPE) ซึ่งเป็นข้อผิดพลาดที่เกิดขึ้นเมื่อคุณพยายามเรียกใช้เมธอดหรือเข้าถึงคุณสมบัติของอ็อบเจกต์ที่เป็น null ข่าวดีคือ: Kot..."}]}]}', '<p>ถ้าคุณเคยทำงานกับ Java มาก่อน คุณอาจเคยประสบกับ <strong>NullPointerException (NPE)</strong> ซึ่งเป็นข้อผิดพลาดที่เกิดขึ้นเมื่อคุณพยายามเรียกใช้เมธอดหรือเข้าถึงคุณสมบัติของอ็อบเจกต์ที่เป็น <code>null</code>
ข่าวดีคือ: <strong>Kotlin ได้แก้ปัญหานี้ไปแล้ว!</strong> ด้วยระบบ <strong>Null Safety</strong> ที่เป็นส่วนหนึ่งของภาษา ไม่ใช่เพียงแค่ library</p>
<h2>ปัญหาใน Java</h2>
<p>มาดูปัญหาใน Java ก่อน:</p>
<pre><code>String name = &quot;John&quot;;
int length = name.length(); // OK - ทำงานได้
String nullName = null;
int nullLength = nullName.length(); // CRASH! NullPointerException

</code></pre>
<p>ปัญหาคือ:</p>
<ul>
<li><strong>Java ไม่บังคับให้คุณจัดการกับ null</strong> - คุณสามารถกำหนด <code>null</code> ให้กับตัวแปรใดๆ ได้</li>
<li><strong>ข้อผิดพลาด null จะถูกค้นพบที่ runtime</strong> - ไม่ใช่ที่ compile time</li>
<li><strong>ต้องตรวจสอบด้วยตนเอง</strong> - ทุกครั้งที่คุณต้องการใช้ตัวแปร</li>
</ul>
<h2>วิธี Kotlin แก้ไข</h2>
<p>Kotlin ใช้ <strong>type system</strong> ที่แตกต่างกัน: ตัวแปรสามารถเป็น <strong>nullable</strong> หรือ <strong>non-nullable</strong></p>
<h3>1. Non-nullable Types (ห้ามเป็น null)</h3>
<pre><code>var name: String = &quot;John&quot;  // ประเภท String ปกติ
name = null  // ERROR! ไม่สามารถกำหนด null ได้
val length = name.length  // ปลอดภัย - ไม่ต้องตรวจสอบ null

</code></pre>
<p><strong>ข้อดี:</strong></p>
<ul>
<li>Kotlin รับประกันว่า <code>name</code> ไม่เป็น null</li>
<li>คุณสามารถเรียกใช้เมธอดได้โดยไม่ต้องตรวจสอบ</li>
</ul>
<h3>2. Nullable Types (อนุญาตให้เป็น null)</h3>
<p>ถ้าคุณต้องการให้ตัวแปรเป็น null ได้ ต้องบอกชัดๆ ด้วย <code>?</code>:</p>
<pre><code>var nullName: String? = null  // ประเภท String? - อนุญาตให้เป็น null
nullName = &quot;John&quot;  // OK
nullName = null  // OK
val length = nullName.length  // ERROR! ต้องตรวจสอบ null ก่อน

</code></pre>
<p><strong>ข้อดี:</strong></p>
<ul>
<li>ชัดเจนว่าตัวแปรนี้อาจเป็น null</li>
<li>Kotlin บังคับให้คุณจัดการกับความเป็น null</li>
</ul>
<h2>วิธีจัดการกับ Nullable Types</h2>
<h3>1. Safe Call Operator (?.)</h3>
<pre><code>val nullName: String? = null
val length = nullName?.length  // ถ้า null ก็จะเป็น null ไม่ crash
println(length)  // null

</code></pre>
<p><strong>ทำงานแบบนี้:</strong></p>
<ul>
<li>ถ้า <code>nullName</code> ไม่เป็น null → เรียก <code>length</code></li>
<li>ถ้า <code>nullName</code> เป็น null → ส่งกลับ null (ไม่ crash)</li>
</ul>
<p><strong>ตัวอย่างจริง:</strong></p>
<pre><code>data class User(val name: String, val email: String?)
val user = User(&quot;John&quot;, null)
val emailLength = user.email?.length  // null (ปลอดภัย)
val user2 = User(&quot;Jane&quot;, &quot;jane@example.com&quot;)
val emailLength2 = user2.email?.length  // 18 (ทำงานได้ปกติ)

</code></pre>
<h3>2. Elvis Operator (?:)</h3>
<p>ให้ค่า default ถ้า null:</p>
<pre><code>val nullName: String? = null
val name = nullName ?: &quot;Unknown&quot;  // &quot;Unknown&quot;
val realName: String? = &quot;John&quot;
val name2 = realName ?: &quot;Unknown&quot;  // &quot;John&quot;

</code></pre>
<p><strong>ทำงานแบบนี้:</strong></p>
<ul>
<li>ถ้าด้านซ้าย ไม่เป็น null → ใช้ค่านั้น</li>
<li>ถ้าด้านซ้าย เป็น null → ใช้ค่าด้านขวา</li>
</ul>
<p><strong>ตัวอย่างจริง:</strong></p>
<pre><code>fun getUserName(user: User?): String {
    return user?.name ?: &quot;Guest&quot;
}
println(getUserName(null))  // &quot;Guest&quot;
println(getUserName(User(&quot;John&quot;, null)))  // &quot;John&quot;

</code></pre>
<h3>3. Not-null Assertion (!!)</h3>
<p>บังคับให้ Kotlin เชื่อว่าไม่เป็น null:</p>
<pre><code>val nullName: String? = &quot;John&quot;
val length = nullName!!.length  // 4

</code></pre>
<p><strong>⚠️ ใช้อย่างระมัดระวัง!</strong></p>
<ul>
<li>ถ้า <code>nullName</code> เป็น null → จะ crash</li>
<li>ใช้เฉพาะเมื่อคุณ <strong>แน่ใจ 100%</strong> ว่าไม่เป็น null</li>
</ul>
<pre><code>val nullName: String? = null
val length = nullName!!.length  // CRASH! NullPointerException

</code></pre>
<h3>4. If-let Pattern (Smart Casting)</h3>
<pre><code>val nullName: String? = &quot;John&quot;
if (nullName != null) {
    println(nullName.length)  // Kotlin รู้ว่า nullName ไม่เป็น null ในบล็อกนี้
}

</code></pre>
<p>Kotlin <strong>อัตโนมัติ cast</strong> ให้เป็น non-nullable type เมื่อคุณตรวจสอบ null
<strong>ตัวอย่างที่ซับซ้อนกว่า:</strong></p>
<pre><code>fun processUser(user: User?) {
    if (user != null) {
        // ที่นี่ user เป็น non-nullable
        println(user.name)  // OK
        println(user.email?.length)  // ยังต้องตรวจสอบ email
    }
}

</code></pre>
<h2>Nullable Collections</h2>
<pre><code>// List ที่มี nullable elements
val nullableList: List&lt;String?&gt; = listOf(&quot;John&quot;, null, &quot;Jane&quot;)
nullableList.forEach { name -&gt;
    println(name?.length)  // ต้องใช้ safe call
}
// Nullable list
val nullableListRef: List&lt;String&gt;? = null
val size = nullableListRef?.size  // null

</code></pre>
<h2>Function Return Types</h2>
<pre><code>// Function ที่อาจคืน null
fun findUser(id: Int): User? {
    return if (id == 1) User(&quot;John&quot;, &quot;john@example.com&quot;) else null
}
// ต้องจัดการกับ null
val user = findUser(1)
val name = user?.name ?: &quot;Not found&quot;  // &quot;John&quot;
val user2 = findUser(999)
val name2 = user2?.name ?: &quot;Not found&quot;  // &quot;Not found&quot;

</code></pre>
<h2>Function Parameters</h2>
<pre><code>// Parameter ที่ต้องไม่เป็น null
fun greet(name: String) {
    println(&quot;Hello, $name&quot;)
}
greet(&quot;John&quot;)  // OK
greet(null)  // ERROR! compile error
// Parameter ที่อาจเป็น null
fun greetOptional(name: String?) {
    println(&quot;Hello, ${name ?: &quot;Guest&quot;}&quot;)
}
greetOptional(&quot;John&quot;)  // &quot;Hello, John&quot;
greetOptional(null)  // &quot;Hello, Guest&quot;

</code></pre>
<h2>Let Block (Functional Style)</h2>
<pre><code>val user: User? = findUser(1)
// Traditional way
if (user != null) {
    println(user.name)
    println(user.email)
}
// Functional way - let block
user?.let { u -&gt;
    println(u.name)
    println(u.email)
}
// Even shorter
user?.let {
    println(it.name)
    println(it.email)
}

</code></pre>
<h2>Null Coalescing (Chain Safe Calls)</h2>
<pre><code>val user: User? = findUser(1)
val emailLength: Int? = user?.email?.length
// ถ้า user เป็น null → emailLength เป็น null
// ถ้า user.email เป็น null → emailLength เป็น null
// ถ้าทั้งสองไม่เป็น null → emailLength เป็นความยาว
// ใช้ elvis operator เพื่อให้ค่า default
val emailLengthWithDefault = user?.email?.length ?: 0

</code></pre>
<h2>When Expression กับ Nullable</h2>
<pre><code>fun describeUser(user: User?) {
    when (user) {
        null -&gt; println(&quot;No user&quot;)
        else -&gt; {
            println(&quot;User: ${user.name}&quot;)
            when (user.email) {
                null -&gt; println(&quot;No email&quot;)
                else -&gt; println(&quot;Email: ${user.email}&quot;)
            }
        }
    }
}
describeUser(null)  // &quot;No user&quot;
describeUser(User(&quot;John&quot;, null))  // &quot;User: John&quot; + &quot;No email&quot;
describeUser(User(&quot;Jane&quot;, &quot;jane@example.com&quot;))  // &quot;User: Jane&quot; + &quot;Email: jane@example.com&quot;

</code></pre>
<h2>Platform Types (Java Interop)</h2>
<p>เมื่อคุณใช้ Java libraries ใน Kotlin:</p>
<pre><code>// Java code
public class JavaClass {
    public String getName() {
        return null;  // อาจคืน null
    }
}
// Kotlin code
val javaObj = JavaClass()
val name = javaObj.name  // ประเภท String! (platform type)
val length = name.length  // อาจ crash ถ้า name เป็น null

</code></pre>
<p>Platform types (<code>String!</code>) หมายถึง &quot;อาจเป็น null หรือไม่ก็ได้&quot; - Kotlin ไม่บังคับให้ตรวจสอบ</p>
<h2>Best Practices</h2>
<h3>✅ ทำแบบนี้</h3>
<pre><code>// ชัดเจนว่าอาจเป็น null
fun findUser(id: Int): User? = null
// ใช้ safe call
val name = user?.name
// ใช้ elvis operator สำหรับ default
val displayName = user?.name ?: &quot;Unknown&quot;
// ใช้ let block สำหรับ operations
user?.let { u -&gt;
    println(u.name)
}

</code></pre>
<h3>❌ หลีกเลี่ยงแบบนี้</h3>
<pre><code>// ไม่ชัดเจน - อาจเป็น null หรือไม่
fun findUser(id: Int): User = null  // ERROR!
// ใช้ !! โดยไม่มีเหตุผล
val length = user!!.name!!.length  // อันตราย
// ซ้ำซ้อน
if (user != null) {
    if (user.email != null) {
        println(user.email.length)
    }
}

</code></pre>
<h2>สรุป</h2>
<table>
<thead>
<tr>
<th align="left">ลักษณะ   <br></th>
<th align="left">Java   <br></th>
<th align="left">Kotlin   <br></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong>Null Safety</strong>   <br></td>
<td align="left">ไม่มี   <br></td>
<td align="left">มีในตัว   <br></td>
</tr>
<tr>
<td align="left"><strong>Type System</strong>   <br></td>
<td align="left">String (อาจเป็น null)   <br></td>
<td align="left">String (ไม่เป็น null) หรือ String? (อาจเป็น null)   <br></td>
</tr>
<tr>
<td align="left"><strong>Null Checking</strong>   <br></td>
<td align="left">Manual (if statements)   <br></td>
<td align="left">Automatic (compiler checks)   <br></td>
</tr>
<tr>
<td align="left"><strong>Safe Call</strong>   <br></td>
<td align="left">ไม่มี   <br></td>
<td align="left"><code>?.</code> operator   <br></td>
</tr>
<tr>
<td align="left"><strong>Elvis Operator</strong>   <br></td>
<td align="left">ไม่มี   <br></td>
<td align="left"><code>?:</code> operator   <br></td>
</tr>
<tr>
<td align="left"><strong>Error Detection</strong>   <br></td>
<td align="left">Runtime (NPE)   <br></td>
<td align="left">Compile time   <br></td>
</tr>
</tbody>
</table>
<p><strong>ข้อสำคัญ:</strong> Kotlin ไม่ได้กำจัด null ไปเลย แต่ทำให้ safe และชัดเจน ด้วยการบังคับให้คุณบอกว่า &quot;ตัวแปรนี้อาจเป็น null&quot; ผ่าน <code>?</code> operator
นี่คือหนึ่งในฟีเจอร์ที่ทำให้ Kotlin code ปลอดภัยกว่า Java code มากมาย!</p>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 59: Kotlin: Scope Function ใน Kotlin [Let, With, Run, Apply, Also]
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (59, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (59, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    59, 59, 'th', 'kotlin-scope-function-kotlin-let-with-run-apply-also', 'Kotlin: Scope Function ใน Kotlin [Let, With, Run, Apply, Also]', 'ทุกๆ Type ใน Kotlin จะถูกประกาศ extension function ที่กำหนดให้คุณสามารถเรียก execute code ภายใต้ context ของ object นั้นๆ ได้ โดยเมื่อคุณทำการเรียกใช้จะมีการกำหนด scope ชั่วคราว โดยคุณสามารถ...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ทุกๆ Type ใน Kotlin จะถูกประกาศ extension function ที่กำหนดให้คุณสามารถเรียก execute code ภายใต้ context ของ object นั้นๆ ได้ โดยเมื่อคุณทำการเรียกใช้จะมีการกำหนด scope ชั่วคราว โดยคุณสามารถ..."}]}]}', '<p>ทุกๆ Type ใน Kotlin จะถูกประกาศ extension function ที่กำหนดให้คุณสามารถเรียก execute code ภายใต้ context ของ object นั้นๆ ได้ โดยเมื่อคุณทำการเรียกใช้จะมีการกำหนด scope ชั่วคราว โดยคุณสามารถเข้าถึง object โดยไม่ต้องกำหนดชื่อ เราเรียก function ดังกล่าวว่า Scope Function โดยประกอบไปด้วย Let, With, Run, Apply, Also</p>
<h3>Let</h3>
<p>เรียกใช้เพื่อทำการ Invoke 1 function หรือมากกว่า โดย return result จะถูก chain กันต่อไปเรื่อย ๆ</p>
<pre><code>val scopeFunction = mutableListOf(&quot;let&quot;, &quot;with&quot;, &quot;run&quot;, &quot;apply&quot;, &quot;also&quot;)
scopeFunction
    .let{ println(&quot;let() called on $it&quot;) }
//let() called on [let, with, run, apply, also]

</code></pre>
<p>let ยังใช้เพื่อ check null ได้อีกด้วย โดยเมื่อ nullable type เรียกใช้ let หากพบว่าเป็น null จะทำให้ let ไม่ถูกเรียกใช้</p>
<pre><code>val str: String? = &quot;Scope Function&quot;
str?.let {
    println(&quot;let() called on $it&quot;)    // let() called on Scope Function
}

</code></pre>
<h3>With</h3>
<p>เรียกใช้เพื่อทำการส่ง object เข้ามาทำงานภายใต้ context โดยไม่มีการ return result หรือจะจำการทำงานได้ว่าว่า “ with this object do following ”</p>
<pre><code>val scopeFunction = mutableListOf(&quot;let&quot;, &quot;with&quot;, &quot;run&quot;, &quot;apply&quot;, &quot;also&quot;)
with(scopeFunction) {
    println(&quot;with() is called with argument $this&quot;)
    println(&quot;It contains $size elements&quot;)
}
//run() is called with argument [let, with, run, apply, also]
//It contains 5 elements

</code></pre>
<h3>Run</h3>
<p>ลักษณะการทำงานคล้ายกับ with เพียงแต่เป็นการเรียกใช้ผ่าน dot notation และ run สามารถเรียกแบบ non-extension function ได้</p>
<pre><code>val scopeFunction = mutableListOf(&quot;let&quot;, &quot;with&quot;, &quot;run&quot;, &quot;apply&quot;)
scopeFunction.run {
    println(&quot;run() is called with argument $this&quot;)
    println(&quot;It contains $size elements&quot;)
    add(&quot;also&quot;)
    println(&quot;run() is called with argument $this&quot;)
    println(&quot;It contains $size elements&quot;)
}
//run() is called with argument [let, with, run, apply]
//It contains 4 elements
//run() is called with argument [let, with, run, apply, also]
//It contains 5 elements

</code></pre>
<p>run ยังสามารถเรียกแบบ non-extension function ได้ด้วย ตัวอย่างใช้เพื่อทำการสร้าง regex ก่อนนำไปใช้</p>
<pre><code>val hexNumberRegex = run {
    val digits = &quot;0-9&quot;
    val hexDigits = &quot;A-Fa-f&quot;
    val sign = &quot;+-&quot;
    Regex(&quot;[$sign]?[$digits$hexDigits]+&quot;)
}
for (match in hexNumberRegex.findAll(&quot;+123 -FFFF !%*&amp; 88 XYZ&quot;)) {
    println(match.value)
}

</code></pre>
<h3>Apply</h3>
<p>เรียกใช้เพื่อปรับปลี่ยน object ตัวเดิมตามค่าที่กำหนดและ return object ตัวเดิม มักถูกใช้ในการทำ object configuration หรือจะจำง่ายว่า “ Apply the following assignment to this object ”</p>
<pre><code>data class Person(var name: String, var tutorial : String)
var person = Person(&quot;Anupam&quot;, &quot;Java&quot;)         // Person(&quot;Anupam&quot;, &quot;Java&quot;)
person.apply { this.tutorial = &quot;Kotlin&quot; }     // Person(&quot;Anupam&quot;, &quot;Kotlin&quot;)

</code></pre>
<h3>Also</h3>
<p>เรียกใช้เมื่อต้องการใช้งาน object และ return object ตัวเดิมออกมาก โดยเรียกเป็นประโยคได้ว่า “ and also do this following with the object ”</p>
<pre><code>val pets = mutableListOf(&quot;cat&quot;, &quot;dog&quot;)
pets
    .also { println(&quot;pets: $it&quot;) }   // pets: [cat, dog]
    .also { it.add(&quot;bird&quot;) }
    .also { println(&quot;pets: $it&quot;) }   // pets: [cat, dog, bird]

</code></pre>
<p>ทั้ง 5 อย่างสามารถนำไปประยุกต์ใช้ได้หลากหลาย หวังว่าจะเป็นประโยชน์กับหลายๆคนได้บ้างครับ</p>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 60: Kotlin vs Java - เปรียบเทียบ Kotlin กับ Java (ทำไมต้องเลือก Kotlin)
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (60, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (60, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    60, 60, 'th', 'kotlin-vs-java-kotlin-java-kotlin', 'Kotlin vs Java - เปรียบเทียบ Kotlin กับ Java (ทำไมต้องเลือก Kotlin)', 'ถ้าคุณเป็นนักพัฒนา Java มาสักพักแล้ว คุณอาจสงสัยว่า "ทำไมต้องเปลี่ยนไปใช้ Kotlin?" หรือถ้าคุณเพิ่งเริ่มต้น คุณอาจสับสนว่าควรเลือกภาษาไหน ข่าวดีคือ: Kotlin ไม่ได้มาเพื่อแข่งขันกับ Java เพื่อใ...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ถ้าคุณเป็นนักพัฒนา Java มาสักพักแล้ว คุณอาจสงสัยว่า \"ทำไมต้องเปลี่ยนไปใช้ Kotlin?\" หรือถ้าคุณเพิ่งเริ่มต้น คุณอาจสับสนว่าควรเลือกภาษาไหน ข่าวดีคือ: Kotlin ไม่ได้มาเพื่อแข่งขันกับ Java เพื่อใ..."}]}]}', '<p>ถ้าคุณเป็นนักพัฒนา Java มาสักพักแล้ว คุณอาจสงสัยว่า &quot;ทำไมต้องเปลี่ยนไปใช้ Kotlin?&quot; หรือถ้าคุณเพิ่งเริ่มต้น คุณอาจสับสนว่าควรเลือกภาษาไหน
ข่าวดีคือ: <strong>Kotlin ไม่ได้มาเพื่อแข่งขันกับ Java เพื่อให้เป็นภาษาที่ดีกว่า มันถูกออกแบบมาเพื่อแก้ปัญหาที่ Java มีมาตั้งแต่เริ่มต้น</strong> และมันทำงานได้อย่างลงตัวกับ Java ecosystem
มาดูกันว่าพวกมันแตกต่างกันอย่างไร และเหตุใดจึงควรใจเย็นๆ เลือก Kotlin สำหรับโปรเจกต์ถัดไปของคุณ</p>
<h2>ความสัมพันธ์ระหว่าง Kotlin และ Java</h2>
<p>ก่อนอื่น ลองเข้าใจความสัมพันธ์กันก่อน:</p>
<ul>
<li><strong>Java</strong>: ภาษาโปรแกรมที่มีอายุกว่า 30 ปี ทำงานบน Java Virtual Machine (JVM)</li>
<li><strong>Kotlin</strong>: ภาษาโปรแกรมที่สร้างโดย JetBrains (บริษัทที่สร้าง IntelliJ) ยังคงทำงานบน JVM เช่นกัน</li>
</ul>
<p>สิ่งที่สำคัญคือ: <strong>Kotlin code จะถูก compile เป็น Java bytecode</strong> ซึ่งหมายความว่า:</p>
<ul>
<li>คุณสามารถใช้ Kotlin libraries ทั้งหมดที่มีอยู่สำหรับ Java</li>
<li>คุณสามารถใช้ Java libraries ใน Kotlin code</li>
<li>ทั้งสองภาษาสามารถทำงานในโปรเจกต์เดียวกันได้</li>
</ul>
<h2>ปัญหาที่ Kotlin แก้ไข</h2>
<h3>1. Null Pointer Exception (NPE) - ศัตรูหมายเลข 1 ของ Java</h3>
<p><strong>ปัญหาใน Java:</strong></p>
<pre><code>String name = &quot;John&quot;;
int length = name.length(); // ทำงานได้ดี
String nullName = null;
int nullLength = nullName.length(); // CRASH! NullPointerException

</code></pre>
<p><strong>วิธี Java ต่อสู้กับปัญหา:</strong></p>
<pre><code>String nullName = null;
if (nullName != null) {
    int length = nullName.length();
}

</code></pre>
<p>ถ้าคุณลืม null check ไปแม้แต่ครั้งเดียว ก็จะได้ crash ที่ runtime
<strong>วิธี Kotlin แก้ไข:</strong></p>
<pre><code>// ถ้าต้องการให้ null ได้ ต้องบอกชัดๆ ด้วย ?
var name: String = &quot;John&quot;  // ห้ามเป็น null
var nullName: String? = null  // อนุญาตให้เป็น null
// Kotlin บังคับให้คุณจัดการกับ null
val length = nullName?.length  // ถ้า null ก็จะเป็น null ไม่ crash

</code></pre>
<p><strong>ประโยชน์:</strong></p>
<ul>
<li>ข้อผิดพลาด null จะถูกจับที่ compile time ไม่ใช่ runtime</li>
<li>โค้ดปลอดภัยกว่าโดยอัตโนมัติ</li>
</ul>
<h3>2. Verbosity (โค้ดยาวเหยิ่ง)</h3>
<p><strong>Java - ต้องเขียนเยอะ:</strong></p>
<pre><code>public class Person {
    private String name;
    private int age;
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    @Override
    public String toString() {
        return &quot;Person{&quot; +
                &quot;name=''&quot; + name + ''\'''' +
                &quot;, age=&quot; + age +
                ''}'';
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Person person = (Person) o;
        return age == person.age &amp;&amp;
                Objects.equals(name, person.name);
    }
    @Override
    public int hashCode() {
        return Objects.hash(name, age);
    }
}

</code></pre>
<p><strong>Kotlin - สั้นกว่า:</strong></p>
<pre><code>data class Person(val name: String, val age: Int)

</code></pre>
<p>ว้าว! บรรทัดเดียวเท่านั้น! Kotlin auto-generates:</p>
<ul>
<li>Constructor</li>
<li>Getters/Setters</li>
<li>toString()</li>
<li>equals()</li>
<li>hashCode()</li>
</ul>
<h3>3. Extension Functions</h3>
<p><strong>Java ไม่มีวิธีนี้:</strong></p>
<pre><code>// ถ้าต้องการเพิ่มฟังก์ชันให้ String class
// ต้องสร้าง utility class
StringUtils.reverse(&quot;hello&quot;); // ห่วย

</code></pre>
<p><strong>Kotlin - ง่ายมาก:</strong></p>
<pre><code>// เพิ่มฟังก์ชันให้ String class ได้เลย
fun String.reverse(): String {
    return this.reversed()
}
&quot;hello&quot;.reverse() // ดีกว่าเยอะ

</code></pre>
<h3>4. Functional Programming</h3>
<p><strong>Java (ค่อนข้างยุ่งเหยิง):</strong></p>
<pre><code>List&lt;Integer&gt; numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.stream()
    .filter(n -&gt; n % 2 == 0)
    .map(n -&gt; n * n)
    .forEach(System.out::println);

</code></pre>
<p><strong>Kotlin (สะอาดกว่า):</strong></p>
<pre><code>val numbers = listOf(1, 2, 3, 4, 5)
numbers
    .filter { it % 2 == 0 }
    .map { it * it }
    .forEach { println(it) }

</code></pre>
<h3>5. Smart Casts</h3>
<p><strong>Java:</strong></p>
<pre><code>Object obj = &quot;hello&quot;;
if (obj instanceof String) {
    String str = (String) obj; // ต้อง cast อีกครั้ง
    System.out.println(str.length());
}

</code></pre>
<p><strong>Kotlin:</strong></p>
<pre><code>val obj: Any = &quot;hello&quot;
if (obj is String) {
    println(obj.length) // อัตโนมัติ cast แล้ว
}

</code></pre>
<h2>ตารางเปรียบเทียบ</h2>
<table>
<thead>
<tr>
<th align="left">ฟีเจอร์   <br></th>
<th align="left">Java   <br></th>
<th align="left">Kotlin   <br></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Null Safety   <br></td>
<td align="left">ไม่มี (NPE ทั่วไป)   <br></td>
<td align="left">มีในตัว   <br></td>
</tr>
<tr>
<td align="left">Data Classes   <br></td>
<td align="left">ต้องเขียนเองเยอะ   <br></td>
<td align="left">Auto-generated   <br></td>
</tr>
<tr>
<td align="left">Extension Functions   <br></td>
<td align="left">ไม่มี   <br></td>
<td align="left">มี   <br></td>
</tr>
<tr>
<td align="left">Coroutines   <br></td>
<td align="left">ต้อง libraries   <br></td>
<td align="left">มีในตัว   <br></td>
</tr>
<tr>
<td align="left">Syntax   <br></td>
<td align="left">Verbose   <br></td>
<td align="left">Concise   <br></td>
</tr>
<tr>
<td align="left">Type Inference   <br></td>
<td align="left">จำกัด   <br></td>
<td align="left">ดีกว่า   <br></td>
</tr>
<tr>
<td align="left">Interoperability   <br></td>
<td align="left">N/A   <br></td>
<td align="left">100% compatible with Java   <br></td>
</tr>
</tbody>
</table>
<h2>Java ยังมีข้อดี</h2>
<p>อย่างไรก็ตาม Java ยังคงมีข้อดี:</p>
<ol>
<li><strong>Ecosystem ใหญ่กว่า</strong>: มี libraries มากมายสำหรับทุกอย่าง</li>
<li><strong>Community ใหญ่</strong>: หา tutorial, stack overflow answers ได้ง่าย</li>
<li><strong>Job market</strong>: ยังมีงาน Java เยอะมาก</li>
<li><strong>Maturity</strong>: Java เสถียรและ battle-tested</li>
<li><strong>Performance</strong>: Java มี optimizations มากมายหลังจากปีต่อ ปี</li>
</ol>
<h2>เมื่อไหร่ควรเลือก Kotlin?</h2>
<p><strong>เลือก Kotlin ถ้า:</strong></p>
<ul>
<li>คุณเริ่มโปรเจกต์ใหม่</li>
<li>คุณต้องการเขียน code ที่ปลอดภัยและสะอาด</li>
<li>คุณทำงาน Android (Google officially recommends Kotlin)</li>
<li>คุณต้อง async programming (Coroutines ใน Kotlin ดีมาก)</li>
<li>คุณต้องการ productivity สูง</li>
</ul>
<p><strong>ยังคง Java ถ้า:</strong></p>
<ul>
<li>คุณมี legacy codebase ที่ใหญ่</li>
<li>คุณต้องการ maximum library support</li>
<li>คุณต้อง extremely strict type checking (Java generics เข้มงวดกว่า)</li>
<li>ทีมของคุณยังไม่คุ้นเคย Kotlin</li>
</ul>
<h2>ข่าวดี: ไม่ต้องเลือก!</h2>
<p>จริง ๆ แล้วคุณไม่ต้องเลือกเลย! คุณสามารถ:</p>
<pre><code>// Kotlin file
fun kotlinFunction(): String {
    return &quot;Hello from Kotlin&quot;
}

</code></pre>
<pre><code>// Java file - ใช้ Kotlin function ได้เลย
public class JavaClass {
    public static void main(String[] args) {
        String result = ExampleKt.kotlinFunction();
        System.out.println(result);
    }
}

</code></pre>
<h2>สรุป</h2>
<table>
<thead>
<tr>
<th align="left">ด้าน   <br></th>
<th align="left">ผลลัพธ์   <br></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong>Null Safety</strong>   <br></td>
<td align="left">Kotlin ชนะ   <br></td>
</tr>
<tr>
<td align="left"><strong>Code Length</strong>   <br></td>
<td align="left">Kotlin ชนะ   <br></td>
</tr>
<tr>
<td align="left"><strong>Readability</strong>   <br></td>
<td align="left">Kotlin ชนะ   <br></td>
</tr>
<tr>
<td align="left"><strong>Ecosystem</strong>   <br></td>
<td align="left">Java ชนะ   <br></td>
</tr>
<tr>
<td align="left"><strong>Community</strong>   <br></td>
<td align="left">Java ชนะ   <br></td>
</tr>
<tr>
<td align="left"><strong>Learning Curve</strong>   <br></td>
<td align="left">Java ง่ายกว่า (เล็กน้อย)   <br></td>
</tr>
<tr>
<td align="left"><strong>Productivity</strong>   <br></td>
<td align="left">Kotlin ชนะ   <br></td>
</tr>
<tr>
<td align="left"><strong>Interoperability</strong>   <br></td>
<td align="left">Kotlin ชนะ (compatible 100%)   <br></td>
</tr>
</tbody>
</table>
<p><strong>คำแนะนำสุดท้าย</strong>: ถ้าคุณเพิ่งเริ่มต้น หรือสร้างโปรเจกต์ใหม่ <strong>ลองใช้ Kotlin ดูสิ</strong>. คุณจะพบว่ามันช่วยให้คุณเขียน code ที่ปลอดภัยและสะอาดกว่า และยังคงได้ประโยชน์จากทั้งหมดที่ Java ecosystem นำเสนอ
ข้อเดียวที่ต้องเตือน: Kotlin ไม่ใช่ &quot;Java ที่ดีกว่า&quot; มันเป็น &quot;Java ที่ได้รับการปรับปรุง&quot; สำหรับปัญหาที่เราพบในการเขียน Java code</p>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 61: Kotlin คืออะไร?
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (61, 1, TRUE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (61, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    61, 61, 'th', 'kotlin', 'Kotlin คืออะไร?', 'เคยได้ยินเกี่ยวกับ Kotlin บ้างไหม? มันคือภาษาโปรแกรมมิ่งที่สร้างขึ้นโดย JetBrains (บริษัทที่สร้าง IntelliJ IDEA) ครับ Kotlin ออกแบบมาเพื่อแก้ปัญหาของ Java โดยให้ความสะดวกสบายมากขึ้น ตัวอักษร...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"เคยได้ยินเกี่ยวกับ Kotlin บ้างไหม? มันคือภาษาโปรแกรมมิ่งที่สร้างขึ้นโดย JetBrains (บริษัทที่สร้าง IntelliJ IDEA) ครับ Kotlin ออกแบบมาเพื่อแก้ปัญหาของ Java โดยให้ความสะดวกสบายมากขึ้น ตัวอักษร..."}]}]}', '<p>เคยได้ยินเกี่ยวกับ <strong>Kotlin</strong> บ้างไหม? มันคือภาษาโปรแกรมมิ่งที่สร้างขึ้นโดย <strong>JetBrains</strong> (บริษัทที่สร้าง IntelliJ IDEA) ครับ
Kotlin ออกแบบมาเพื่อแก้ปัญหาของ Java โดยให้ความสะดวกสบายมากขึ้น ตัวอักษรน้อยลง แต่ทำได้มากขึ้น ถ้า Java เป็นรถยนต์ที่ต้องใช้เวลาหลายนาทีในการสตาร์ท Kotlin ก็เหมือนรถที่กดปุ่มแล้วออกได้เลย</p>
<h3>ทำไมต้องเรียน Kotlin?</h3>
<ul>
<li>🎯 ง**่ายกว่า Java **- โค้ดสั้นกว่า เข้าใจง่ายกว่า</li>
<li>🛡️ ป**ลอดภัยกว่า **- ช่วยลดข้อผิดพลาด (null pointer exceptions)</li>
<li>🚀 ใ**ช้ได้กับ Java **- สามารถใช้ Java libraries ได้ทั้งหมด</li>
<li>📱 ใ**ช้ในการพัฒนา Android **- Google แนะนำให้ใช้ Kotlin สำหรับ Android</li>
<li>💼 ใ**ช้ในงานจริง **- บริษัทใหญ่ๆ เช่น Google, Netflix, Uber ใช้ Kotlin</li>
</ul>
<h3>บทความนี้จะครอบคลุมอะไร?</h3>
<p>ในบทความนี้ เราจะเรียนรู้:</p>
<ol>
<li><strong>Variables &amp; Data Types</strong> - ตัวแปรและประเภทข้อมูล</li>
<li><strong>Basic Operations</strong> - การคำนวณพื้นฐาน</li>
<li><strong>Functions</strong> - การสร้างฟังก์ชัน</li>
<li><strong>Control Flow</strong> - if-else, when, loops</li>
<li><strong>Collections</strong> - Lists, Maps, Sets</li>
<li><strong>Classes &amp; Objects</strong> - การสร้างคลาส</li>
</ol>
<h2>เราจะเรียนทีละหน่วย พร้อมตัวอย่างโค้ดจริงๆ ที่คุณสามารถลองเล่นได้เลย</h2>
<h2>1️⃣ Variables &amp; Data Types (ตัวแปรและประเภทข้อมูล)</h2>
<h3>ตัวแปร (Variables)</h3>
<p>ตัวแปร คือกล่องเก็บข้อมูล ใน Kotlin มี 2 ประเภท:
<strong>var</strong> - ตัวแปรที่เปลี่ยนแปลงได้</p>
<pre><code>var name = &quot;สมชาย&quot;
name = &quot;สมหญิง&quot;  // เปลี่ยนค่าได้

</code></pre>
<p><strong>val</strong> - ตัวแปรที่ไม่เปลี่ยนแปลง (final)</p>
<pre><code>val age = 25
age = 26  // ❌ ERROR! ไม่สามารถเปลี่ยนค่าได้

</code></pre>
<h3>ประเภทข้อมูล (Data Types)</h3>
<p>Kotlin มีประเภทข้อมูลพื้นฐาน ดังนี้:
<strong>Numbers - ตัวเลข</strong></p>
<pre><code>val intNumber: Int = 42
val longNumber: Long = 1000L
val floatNumber: Float = 3.14f
val doubleNumber: Double = 3.14159

</code></pre>
<p><strong>Strings - ข้อความ</strong></p>
<pre><code>val greeting = &quot;สวัสดี Kotlin&quot;
val name = &quot;สมชาย&quot;
val message = &quot;สวัสดี $name&quot;  // String interpolation

</code></pre>
<p><strong>Boolean - จริง/เท็จ</strong></p>
<pre><code>val isStudent = true
val isWorking = false

</code></pre>
<h3>Type Inference (การสรุปประเภทข้อมูล)</h3>
<p>Kotlin สามารถสรุปประเภทข้อมูลได้เอง คุณไม่ต้องเขียนประเภทข้อมูลทุกครั้ง:</p>
<pre><code>val number = 10  // Kotlin รู้ว่านี่คือ Int
val price = 99.99  // Kotlin รู้ว่านี่คือ Double
val name = &quot;Kotlin&quot;  // Kotlin รู้ว่านี่คือ String

</code></pre>
<h3>Nullable Types (ตัวแปรที่อาจเป็น null)</h3>
<p>ใน Kotlin คุณต้องบอกให้ชัดเจนว่าตัวแปรอาจเป็น null ได้หรือไม่:</p>
<pre><code>val name: String = &quot;สมชาย&quot;  // ไม่สามารถเป็น null
val nickname: String? = null // สามารถเป็น null ได้
// ต้องตรวจสอบก่อนใช้
if (nickname != null) {
    println(nickname.length)
}
// หรือใช้ safe call operator
println(nickname?.length)  // ปลอดภัย

</code></pre>
<hr />
<h2>2️⃣ Functions (ฟังก์ชัน)</h2>
<h3>ฟังก์ชันคืออะไร?</h3>
<p>ฟังก์ชัน คือชุดคำสั่งที่ทำงานเฉพาะอย่าง เมื่อคุณเรียกมันขึ้นมา มันจะทำงานตามที่เขียนไว้</p>
<h3>ฟังก์ชันง่ายๆ</h3>
<pre><code>fun greet() {
    println(&quot;สวัสดี Kotlin!&quot;)
}
// เรียกใช้
greet()  // Output: สวัสดี Kotlin!

</code></pre>
<h3>ฟังก์ชันที่มีพารามิเตอร์</h3>
<pre><code>fun greet(name: String) {
    println(&quot;สวัสดี $name!&quot;)
}
greet(&quot;สมชาย&quot;)  // Output: สวัสดี สมชาย!
greet(&quot;สมหญิง&quot;)  // Output: สวัสดี สมหญิง!

</code></pre>
<h3>ฟังก์ชันที่คืนค่า</h3>
<pre><code>fun add(a: Int, b: Int): Int {
    return a + b
}
val result = add(5, 3)
println(result)  // Output: 8

</code></pre>
<h3>ฟังก์ชันแบบสั้น</h3>
<p>ถ้าฟังก์ชันมีแค่บรรทัดเดียว คุณสามารถเขียนแบบนี้ได้:</p>
<pre><code>fun add(a: Int, b: Int) = a + b
val result = add(5, 3)  // 8

</code></pre>
<h3>ฟังก์ชันที่มีค่าเริ่มต้น</h3>
<pre><code>fun greet(name: String = &quot;ผู้ใช้&quot;) {
    println(&quot;สวัสดี $name!&quot;)
}
greet()  // Output: สวัสดี ผู้ใช้!
greet(&quot;สมชาย&quot;)  // Output: สวัสดี สมชาย!

</code></pre>
<h3>ฟังก์ชันที่มีหลายพารามิเตอร์</h3>
<pre><code>fun calculatePrice(quantity: Int, price: Double, discount: Double = 0.0): Double {
    val total = quantity * price
    return total - (total * discount)
}
val price1 = calculatePrice(10, 50.0)  // 500.0
val price2 = calculatePrice(10, 50.0, 0.1)  // 450.0 (10% discount)

</code></pre>
<hr />
<h2>3️⃣ Control Flow (การควบคุมการไหลของโปรแกรม)</h2>
<h3>If-Else Statement</h3>
<pre><code>val age = 20
if (age &gt;= 18) {
    println(&quot;คุณเป็นผู้ใหญ่&quot;)
} else {
    println(&quot;คุณยังเป็นเด็ก&quot;)
}

</code></pre>
<h3>If-Else เป็นนิพจน์ (Expression)</h3>
<p>ใน Kotlin คุณสามารถใช้ if-else เป็นค่าได้:</p>
<pre><code>val age = 20
val status = if (age &gt;= 18) &quot;ผู้ใหญ่&quot; else &quot;เด็ก&quot;
println(status)  // Output: ผู้ใหญ่

</code></pre>
<h3>When Statement (คล้ายกับ Switch)</h3>
<pre><code>val day = 3
val dayName = when (day) {
    1 -&gt; &quot;จันทร์&quot;
    2 -&gt; &quot;อังคาร&quot;
    3 -&gt; &quot;พุธ&quot;
    4 -&gt; &quot;พฤหัสบดี&quot;
    5 -&gt; &quot;ศุกร์&quot;
    6 -&gt; &quot;เสาร์&quot;
    7 -&gt; &quot;อาทิตย์&quot;
    else -&gt; &quot;ไม่รู้&quot;
}
println(dayName)  // Output: พุธ

</code></pre>
<h3>Loops - For Loop</h3>
<pre><code>// วนซ้ำจาก 1 ถึง 5
for (i in 1..5) {
    println(i)
}
// วนซ้ำใน List
val fruits = listOf(&quot;แอปเปิล&quot;, &quot;กล้วย&quot;, &quot;ส้ม&quot;)
for (fruit in fruits) {
    println(fruit)
}

</code></pre>
<h3>Loops - While Loop</h3>
<pre><code>var count = 0
while (count &lt; 5) {
    println(count)
    count++
}

</code></pre>
<h3>Loops - Do-While Loop</h3>
<pre><code>var count = 0
do {
    println(count)
    count++
} while (count &lt; 5)

</code></pre>
<h3>Break และ Continue</h3>
<pre><code>for (i in 1..10) {
    if (i == 5) {
        break  // ออกจากลูป
    }
    println(i)
}
for (i in 1..10) {
    if (i == 5) {
        continue  // ข้ามการทำงานในรอบนี้
    }
    println(i)
}

</code></pre>
<hr />
<h2>4️⃣ Collections (คอลเลกชัน)</h2>
<h3>Lists - รายการข้อมูล</h3>
<pre><code>// สร้าง List ที่ไม่สามารถเปลี่ยนแปลงได้
val fruits = listOf(&quot;แอปเปิล&quot;, &quot;กล้วย&quot;, &quot;ส้ม&quot;)
println(fruits[0])  // Output: แอปเปิล
println(fruits.size)  // Output: 3
// สร้าง List ที่สามารถเปลี่ยนแปลงได้
val numbers = mutableListOf(1, 2, 3)
numbers.add(4)
numbers.remove(1)
println(numbers)  // Output: [2, 3, 4]

</code></pre>
<h3>Maps - คู่ key-value</h3>
<pre><code>// สร้าง Map
val person = mapOf(
    &quot;name&quot; to &quot;สมชาย&quot;,
    &quot;age&quot; to 25,
    &quot;city&quot; to &quot;กรุงเทพ&quot;
)
println(person[&quot;name&quot;])  // Output: สมชาย
println(person[&quot;age&quot;])  // Output: 25
// Map ที่สามารถเปลี่ยนแปลงได้
val settings = mutableMapOf(&quot;theme&quot; to &quot;dark&quot;, &quot;language&quot; to &quot;th&quot;)
settings[&quot;fontSize&quot;] = &quot;large&quot;
println(settings)  // Output: {theme=dark, language=th, fontSize=large}

</code></pre>
<h3>Sets - เซตข้อมูล (ไม่มีค่าซ้ำ)</h3>
<pre><code>val colors = setOf(&quot;แดง&quot;, &quot;เขียว&quot;, &quot;น้ำเงิน&quot;)
println(colors.size)  // Output: 3
// Set ที่สามารถเปลี่ยนแปลงได้
val tags = mutableSetOf(&quot;kotlin&quot;, &quot;android&quot;, &quot;java&quot;)
tags.add(&quot;spring&quot;)
tags.add(&quot;kotlin&quot;)  // ไม่เพิ่มเพราะซ้ำ
println(tags)  // Output: [kotlin, android, java, spring]

</code></pre>
<h3>Iteration (วนซ้ำใน Collections)</h3>
<pre><code>val fruits = listOf(&quot;แอปเปิล&quot;, &quot;กล้วย&quot;, &quot;ส้ม&quot;)
// for loop
for (fruit in fruits) {
    println(fruit)
}
// forEach
fruits.forEach { fruit -&gt;
    println(fruit)
}
// map - แปลงค่า
val upperFruits = fruits.map { it.uppercase() }
println(upperFruits)  // Output: [แอปเปิล, กล้วย, ส้ม]
// filter - กรองค่า
val numbers = listOf(1, 2, 3, 4, 5)
val evenNumbers = numbers.filter { it % 2 == 0 }
println(evenNumbers)  // Output: [2, 4]

</code></pre>
<hr />
<h2>5️⃣ Classes &amp; Objects (คลาสและอบเจกต์)</h2>
<h3>คลาส (Class) คืออะไร?</h3>
<p>คลาส คือแบบแผนสำหรับสร้างอบเจกต์ มันเหมือนแบบสิ่งก่อสร้าง ที่ใช้สร้างบ้าน</p>
<h3>คลาสง่ายๆ</h3>
<pre><code>class Person {
    var name = &quot;สมชาย&quot;
    var age = 25
    fun greet() {
        println(&quot;สวัสดี ฉันชื่อ $name&quot;)
    }
}
// สร้างอบเจกต์
val person = Person()
println(person.name)  // Output: สมชาย
person.greet()  // Output: สวัสดี ฉันชื่อ สมชาย

</code></pre>
<h3>Constructor (ตัวสร้าง)</h3>
<pre><code>class Person(val name: String, val age: Int) {
    fun greet() {
        println(&quot;สวัสดี ฉันชื่อ $name อายุ $age ปี&quot;)
    }
}
val person = Person(&quot;สมชาย&quot;, 25)
person.greet()  // Output: สวัสดี ฉันชื่อ สมชาย อายุ 25 ปี

class Person(val name: String, val age: Int) {
    fun greet() {
        println(&quot;สวัสดี ฉันชื่อ ⟦LATEX_INLINE_0⟧age ปี&quot;)
    }
}
val person = Person(&quot;สมชาย&quot;, 25)
person.greet()  // Output: สวัสดี ฉันชื่อ สมชาย อายุ 25 ปี

</code></pre>
<h3>Properties และ Methods</h3>
<pre><code>class Student(val name: String, val grade: Int) {
    // Property
    val isPassingGrade: Boolean
        get() = grade &gt;= 60
    // Method
    fun displayInfo() {
        println(&quot;ชื่อ: $name, เกรด: $grade&quot;)
    }
}
val student = Student(&quot;สมหญิง&quot;, 85)
println(student.isPassingGrade)  // Output: true
student.displayInfo()  // Output: ชื่อ: สมหญิง, เกรด: 85

class Student(val name: String, val grade: Int) {
    // Property
    val isPassingGrade: Boolean
        get() = grade &gt;= 60
    // Method
    fun displayInfo() {
        println(&quot;ชื่อ: ⟦LATEX_INLINE_1⟧grade&quot;)
    }
}
val student = Student(&quot;สมหญิง&quot;, 85)
println(student.isPassingGrade)  // Output: true
student.displayInfo()  // Output: ชื่อ: สมหญิง, เกรด: 85

</code></pre>
<h3>Data Class (คลาสข้อมูล)</h3>
<p>Data class ออกแบบมาสำหรับเก็บข้อมูล:</p>
<pre><code>data class User(val id: Int, val name: String, val email: String)
val user1 = User(1, &quot;สมชาย&quot;, &quot;somchai@example.com&quot;)
val user2 = User(1, &quot;สมชาย&quot;, &quot;somchai@example.com&quot;)
println(user1 == user2)  // Output: true (เปรียบเทียบค่า)
println(user1)  // Output: User(id=1, name=สมชาย, email=somchai@example.com)

</code></pre>
<h3>Inheritance (การสืบทอด)</h3>
<pre><code>open class Animal(val name: String) {
    open fun sound() {
        println(&quot;$name ส่งเสียง&quot;)
    }
}
class Dog(name: String) : Animal(name) {
    override fun sound() {
        println(&quot;$name: เห่า!&quot;)
    }
}
val dog = Dog(&quot;หมา&quot;)
dog.sound()  // Output: หมา: เห่า!

</code></pre>
<h3>Interface (อินเตอร์เฟส)</h3>
<pre><code>interface Drawable {
    fun draw()
}
class Circle : Drawable {
    override fun draw() {
        println(&quot;วาดวงกลม&quot;)
    }
}
val circle = Circle()
circle.draw()  // Output: วาดวงกลม

</code></pre>
<hr />
<h2>🎯 สรุป: คุณเรียนรู้อะไรไปแล้ว?</h2>
<h2>ยินดีด้วย! คุณได้เรียนรู้พื้นฐานของ Kotlin แล้ว ซึ่งรวมถึง:
✅ <strong>Variables &amp; Data Types</strong> - การสร้างตัวแปรและประเภทข้อมูล ✅ <strong>Functions</strong> - การสร้างฟังก์ชันและการใช้งาน ✅ <strong>Control Flow</strong> - if-else, when, และ loops ✅ <strong>Collections</strong> - Lists, Maps, Sets ✅ <strong>Classes &amp; Objects</strong> - การสร้างคลาสและอบเจกต์</h2>
<h2>💡 เคล็ดลับสำหรับผู้เริ่มต้น</h2>
<h3>1. ฝึกโค้ดจริงๆ</h3>
<p>อย่าเพียงแค่อ่าน ให้ลองเขียนโค้ดเองบ้าง ลองเล่นกับตัวอักษร เปลี่ยนค่า ดูว่าเกิดอะไรขึ้น</p>
<h3>2. ใช้ Kotlin Playground</h3>
<p>ไปที่ <a href="https://play.kotlinlang.org">https://play.kotlinlang.org</a> เพื่อเขียนและรันโค้ด Kotlin ได้เลยในเบราว์เซอร์</p>
<h3>3. อ่านเอกสารอย่างเป็นทางการ</h3>
<p><a href="https://kotlinlang.org/docs">https://kotlinlang.org/docs</a> มีเอกสารดีๆ ที่อธิบายอย่างละเอียด</p>
<h3>4. เข้าร่วม Community</h3>
<p>มี Discord, Reddit, Stack Overflow ที่เต็มไปด้วยคนที่ยินดีช่วยเหลือ</p>
<h3>5. สร้างโปรเจกต์เล็กๆ</h3>
<p>เมื่อคุณรู้พื้นฐาน ลองสร้างโปรเจกต์เล็กๆ เช่น:</p>
<ul>
<li>Todo List Application</li>
<li>Calculator</li>
<li>Simple Game</li>
</ul>
<hr />
<h2>🚀 ขั้นต่อไป</h2>
<p>เมื่อคุณสบายใจกับพื้นฐาน ลองศึกษา:</p>
<ul>
<li><strong>Extension Functions</strong> - ฟังก์ชันขยายเพิ่มเติม</li>
<li><strong>Coroutines</strong> - การทำงานแบบ asynchronous</li>
<li><strong>Ktor</strong> - สำหรับสร้าง API และ Web Server</li>
<li><strong>Android Development</strong> - สร้างแอปพลิเคชัน</li>
</ul>
<hr />
<h2>✨ สุดท้าย</h2>
<h2>Kotlin เป็นภาษาที่สนุกและทรงพลัง ยิ่งคุณฝึกมากขึ้น คุณจะชอบมันมากขึ้น
**ขอให้สนุกกับการเรียนรู้ Kotlin! 🎉</h2>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 62: Ktor: Basic
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (62, 1, TRUE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (62, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (62, 24) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    62, 62, 'th', 'ktor-basic', 'Ktor: Basic', 'Technical notes and documentation from knowledge vault.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical notes and documentation from knowledge vault."}]}]}', '<hr />
<h2>type: Page</h2>
<p>title: ''Ktor: Basic''
aliases: null
description: null
icon: null
createdAt: ''2026-02-04T15:13:21.847Z''
creationDate: 2026-02-04 22:13
modificationDate: 2026-02-05 13:50
tags: [Tools, Draft, Kotlin]
coverImage: null
Ktor คืออะไร?
หลังจากที่คุณเรียนรู้พื้นฐาน Kotlin แล้ว ตอนนี้ถึงเวลาที่จะสร้างอะไรที่ใช้งานได้จริง! Ktor คือ framework ที่ช่วยให้คุณสร้าง Web Server, API, และ Web Applications ได้อย่างง่ายดาย
Ktor ออกแบบมาให้เบา, เร็ว, และใช้งานง่าย ไม่ต้องมี boilerplate code มากมายเหมือน Java frameworks อื่นๆ
ทำไมต้องใช้ Ktor?
🚀 เบาและเร็ว - ไม่มี overhead ที่ไม่จำเป็น
📝 โค้ดสั้น - ใช้ฟีเจอร์ของ Kotlin เต็มที่
🔧 ยืดหยุ่น - ใช้ได้กับ HTTP server, WebSocket, Microservices
🛠️ ติดตั้งง่าย - ไม่ต้องซับซ้อนเหมือน Spring
📱 ใช้ได้ทั่วไป - JVM, Native, JavaScriptKtor vs Spring Bootฟีเจอร์KtorSpring Bootขนาดเบาหนักความเร็วเร็วช้ากว่าLearning Curveง่ายยากCommunityเล็กใหญ่Production Ready✅✅การตั้งค่า Ktorขั้นที่ 1: สร้าง Gradle Projectสร้างไฟล์ build.gradle.kts ในโปรเจกต์ของคุณ:</p>
<pre><code>plugins {
  kotlin(&quot;jvm&quot;) version &quot;1.9.20&quot;
  application
}
group = &quot;com.example&quot;
version = &quot;1.0&quot;

repositories {
  mavenCentral()
}

dependencies {
  implementation(&quot;io.ktor:ktor-server-core:2.3.0&quot;)
  implementation(&quot;io.ktor:ktor-server-netty:2.3.0&quot;)
  implementation(&quot;ch.qos.logback:logback-classic:1.4.8&quot;)
}

application {
  mainClass.set(&quot;com.example.ApplicationKt&quot;)
}

</code></pre>
<p>ขั้นที่ 2: สร้าง Main Function
สร้างไฟล์ Application.kt:</p>
<pre><code>package com.example

import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun main() {
  embeddedServer(Netty, port = 8080) {
    routing {
      get(&quot;/&quot;) {
        call.respondText(&quot;สวัสดี Ktor!&quot;)
       }
     }
  }.start(wait = true)
}


</code></pre>
<p>ขั้นที่ 3: รัน Server./gradlew runเปิดเบราว์เซอร์และไปที่ <a href="http://localhost:8080">http://localhost:8080</a>
คุณจะเห็น &quot;สวัสดี Ktor!&quot;
Routing &amp; HTTP Methods (เส้นทางและเมธอด HTTP)HTTP Methods พื้นฐาน
HTTP มี 4 เมธอดหลัก:GET - ดึงข้อมูลPOST - สร้างข้อมูลPUT - อัปเดตข้อมูลDELETE - ลบข้อมูลตัวอย่าง</p>
<pre><code>Routingfun main() {
    embeddedServer(Netty, port = 8080) {
      routing {
        // GET request
        get(&quot;/&quot;) {
            call.respondText(&quot;สวัสดี Ktor!&quot;)
        }

        // GET with path parameter
        get(&quot;/users/{id}&quot;) {
            val id = call.parameters[&quot;id&quot;]
            call.respondText(&quot;ผู้ใช้ ID: $id&quot;)
        }
        // POST request
        post(&quot;/users&quot;) {
            call.respondText(&quot;สร้างผู้ใช้ใหม่&quot;)
        }
        // PUT request
        put(&quot;/users/{id}&quot;) {
            val id = call.parameters[&quot;id&quot;]
            call.respondText(&quot;อัปเดตผู้ใช้ ID: $id&quot;)
        }
        // DELETE request
        delete(&quot;/users/{id}&quot;) {
            val id = call.parameters[&quot;id&quot;]
            call.respondText(&quot;ลบผู้ใช้ ID: $id&quot;)
        }
    }
}.start(wait = true)

</code></pre>
<p>}Query Parametersrouting {
get(&quot;/search&quot;) {
val query = call.request.queryParameters[&quot;q&quot;]
val limit = call.request.queryParameters[&quot;limit&quot;] ?: &quot;10&quot;
call.respondText(&quot;ค้นหา: ⟦LATEX_INLINE_0⟧limit&quot;)
}
}
// เรียกใช้: <a href="http://localhost:8080/search?q=kotlin&amp;limit=20Response">http://localhost:8080/search?q=kotlin&amp;limit=20Response</a> Typesrouting {
get(&quot;/text&quot;) {
call.respondText(&quot;ข้อความ&quot;)
}</p>
<pre><code>get(&quot;/json&quot;) {
    call.respondText(&quot;&quot;&quot;{&quot;name&quot;: &quot;สมชาย&quot;, &quot;age&quot;: 25}&quot;&quot;&quot;, contentType = ContentType.Application.Json)
}
get(&quot;/html&quot;) {
    call.respondText(&quot;&quot;&quot;&lt;h1&gt;สวัสดี&lt;/h1&gt;&quot;&quot;&quot;, contentType = ContentType.Text.Html)
}

</code></pre>
<p>}2️⃣ JSON &amp; Serialization (JSON และการแปลงข้อมูล)เพิ่ม Serialization Libraryอัปเดต build.gradle.kts:dependencies {
implementation(&quot;io.ktor:ktor-server-core:2.3.0&quot;)
implementation(&quot;io.ktor:ktor-server-netty:2.3.0&quot;)
implementation(&quot;io.ktor:ktor-serialization-kotlinx-json:2.3.0&quot;)
implementation(&quot;io.ktor:ktor-server-content-negotiation:2.3.0&quot;)
implementation(&quot;ch.qos.logback:logback-classic:1.4.8&quot;)
}สร้าง Data Classimport kotlinx.serialization.Serializable
@Serializable
data class User(
val id: Int,
val name: String,
val email: String
)ตั้งค่า Content Negotiationfun main() {
embeddedServer(Netty, port = 8080) {
install(ContentNegotiation) {
json()
}</p>
<pre><code>routing {
        // ส่ง JSON
        get(&quot;/users/{id}&quot;) {
            val id = call.parameters[&quot;id&quot;]?.toIntOrNull() ?: return@get
            val user = User(id, &quot;สมชาย&quot;, &quot;somchai@example.com&quot;)
            call.respond(user)
        }
        // รับ JSON
        post(&quot;/users&quot;) {
            val user = call.receive&lt;User&gt;()
            call.respond(mapOf(&quot;message&quot; to &quot;สร้างผู้ใช้สำเร็จ&quot;, &quot;user&quot; to user))
        }
    }
}.start(wait = true)

</code></pre>
<p>}ทดสอบด้วย cURL# GET
curl <a href="http://localhost:8080/users/1">http://localhost:8080/users/1</a></p>
<h1>POST</h1>
<p>curl -X POST <a href="http://localhost:8080/users">http://localhost:8080/users</a> -H &quot;Content-Type: application/json&quot; -d ''{&quot;id&quot;:2,&quot;name&quot;:&quot;สมหญิง&quot;,&quot;email&quot;:&quot;<a href="mailto:somying@example.com">somying@example.com</a>&quot;}''3️⃣ Status Codes &amp; Error Handling (รหัสสถานะและการจัดการข้อผิดพลาด)HTTP Status CodesStatus codes ใช้บอกสถานะของ request:200 OK - สำเร็จ201 Created - สร้างสำเร็จ400 Bad Request - ข้อมูลไม่ถูกต้อง404 Not Found - ไม่พบข้อมูล500 Internal Server Error - เกิดข้อผิดพลาดตัวอย่าง Status Codesrouting {
get(&quot;/users/{id}&quot;) {
val id = call.parameters[&quot;id&quot;]?.toIntOrNull()</p>
<pre><code>if (id == null) {
        call.respond(HttpStatusCode.BadRequest, mapOf(&quot;error&quot; to &quot;ID ต้องเป็นตัวเลข&quot;))
        return@get
    }
    // สมมติว่าหาผู้ใช้ไม่เจอ
    if (id &gt; 100) {
        call.respond(HttpStatusCode.NotFound, mapOf(&quot;error&quot; to &quot;ไม่พบผู้ใช้&quot;))
        return@get
    }
    val user = User(id, &quot;สมชาย&quot;, &quot;somchai@example.com&quot;)
    call.respond(HttpStatusCode.OK, user)
}
post(&quot;/users&quot;) {
    try {
        val user = call.receive&lt;User&gt;()
        call.respond(HttpStatusCode.Created, mapOf(&quot;message&quot; to &quot;สร้างผู้ใช้สำเร็จ&quot;))
    } catch (e: Exception) {
        call.respond(HttpStatusCode.BadRequest, mapOf(&quot;error&quot; to &quot;ข้อมูลไม่ถูกต้อง&quot;))
    }
}

</code></pre>
<p>}Global Exception Handlingfun main() {
embeddedServer(Netty, port = 8080) {
install(StatusPages) {
exception { call, cause -&gt;
call.respond(
HttpStatusCode.InternalServerError,
mapOf(&quot;error&quot; to cause.message)
)
}
}</p>
<pre><code>routing {
        // routes...
    }
}.start(wait = true)

</code></pre>
<p>}4️⃣ Middleware &amp; Plugins (มิดเดิลแวร์และปลั๊กอิน)Middleware คืออะไร?Middleware คือฟังก์ชันที่ทำงานก่อนหรือหลัง request/response ใช้สำหรับ:LoggingAuthenticationCORSCompressionตัวอย่าง Logging Middlewarefun main() {
embeddedServer(Netty, port = 8080) {
install(CallLogging) {
level = Level.INFO
filter { call -&gt; call.request.path().startsWith(&quot;/&quot;) }
}</p>
<pre><code>routing {
        get(&quot;/&quot;) {
            call.respondText(&quot;สวัสดี&quot;)
        }
    }
}.start(wait = true)

</code></pre>
<p>}CORS (Cross-Origin Resource Sharing)fun main() {
embeddedServer(Netty, port = 8080) {
install(CORS) {
allowMethod(HttpMethod.Get)
allowMethod(HttpMethod.Post)
allowMethod(HttpMethod.Put)
allowMethod(HttpMethod.Delete)
allowHeader(HttpHeaders.ContentType)
allowHeader(HttpHeaders.Authorization)
allowCredentials = true
anyHost() // สำหรับ development เท่านั้น
}</p>
<pre><code>routing {
        get(&quot;/api/data&quot;) {
            call.respondText(&quot;ข้อมูล&quot;)
        }
    }
}.start(wait = true)

</code></pre>
<p>}Custom Middlewarefun main() {
embeddedServer(Netty, port = 8080) {
intercept(ApplicationCallPipeline.Monitoring) {
val startTime = System.currentTimeMillis()
proceed()
val duration = System.currentTimeMillis() - startTime
println(&quot;Request ใช้เวลา: ${duration}ms&quot;)
}</p>
<pre><code>routing {
        get(&quot;/&quot;) {
            call.respondText(&quot;สวัสดี&quot;)
        }
    }
}.start(wait = true)

</code></pre>
<p>}5️⃣ ตัวอย่างจริง: Todo API (Practical Example)โปรเจกต์ที่สมบูรณ์มาสร้าง Todo API ที่มี CRUD operations (Create, Read, Update, Delete):package com.example
import io.ktor.server.application.*
import io.ktor.server.engine.*
import io.ktor.server.netty.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import io.ktor.server.request.*
import io.ktor.http.*
import io.ktor.serialization.kotlinx.json.*
import io.ktor.server.plugins.contentnegotiation.*
import kotlinx.serialization.Serializable
@Serializable
data class Todo(
val id: Int,
val title: String,
val completed: Boolean = false
)
// ใช้ mutable list เป็นฐานข้อมูลชั่วคราว
val todos = mutableListOf(
Todo(1, &quot;เรียน Kotlin&quot;, true),
Todo(2, &quot;สร้าง API ด้วย Ktor&quot;, false)
)
fun main() {
embeddedServer(Netty, port = 8080) {
install(ContentNegotiation) {
json()
}</p>
<pre><code>routing {
        // GET ทุก todos
        get(&quot;/todos&quot;) {
            call.respond(todos)
        }
        // GET todo ตาม ID
        get(&quot;/todos/{id}&quot;) {
            val id = call.parameters[&quot;id&quot;]?.toIntOrNull()
            val todo = todos.find { it.id == id }
            if (todo == null) {
                call.respond(HttpStatusCode.NotFound, mapOf(&quot;error&quot; to &quot;ไม่พบ Todo&quot;))
            } else {
                call.respond(todo)
            }
        }
        // POST สร้าง todo ใหม่
        post(&quot;/todos&quot;) {
            val newTodo = call.receive&lt;Todo&gt;()
            todos.add(newTodo)
            call.respond(HttpStatusCode.Created, newTodo)
        }
        // PUT อัปเดต todo
        put(&quot;/todos/{id}&quot;) {
            val id = call.parameters[&quot;id&quot;]?.toIntOrNull()
            val updatedTodo = call.receive&lt;Todo&gt;()
            val index = todos.indexOfFirst { it.id == id }
            if (index == -1) {
                call.respond(HttpStatusCode.NotFound, mapOf(&quot;error&quot; to &quot;ไม่พบ Todo&quot;))
            } else {
                todos[index] = updatedTodo
                call.respond(updatedTodo)
            }
        }
        // DELETE ลบ todo
        delete(&quot;/todos/{id}&quot;) {
            val id = call.parameters[&quot;id&quot;]?.toIntOrNull()
            val removed = todos.removeIf { it.id == id }
            if (!removed) {
                call.respond(HttpStatusCode.NotFound, mapOf(&quot;error&quot; to &quot;ไม่พบ Todo&quot;))
            } else {
                call.respond(HttpStatusCode.NoContent)
            }
        }
    }
}.start(wait = true)

</code></pre>
<p>}ทดสอบ API# GET ทุก todos
curl <a href="http://localhost:8080/todos">http://localhost:8080/todos</a></p>
<h1>GET todo ตาม ID</h1>
<p>curl <a href="http://localhost:8080/todos/1">http://localhost:8080/todos/1</a></p>
<h1>POST สร้าง todo ใหม่</h1>
<p>curl -X POST <a href="http://localhost:8080/todos">http://localhost:8080/todos</a> -H &quot;Content-Type: application/json&quot; -d ''{&quot;id&quot;:3,&quot;title&quot;:&quot;ทดสอบ API&quot;,&quot;completed&quot;:false}''</p>
<h1>PUT อัปเดต todo</h1>
<p>curl -X PUT <a href="http://localhost:8080/todos/1">http://localhost:8080/todos/1</a> -H &quot;Content-Type: application/json&quot; -d ''{&quot;id&quot;:1,&quot;title&quot;:&quot;เรียน Kotlin&quot;,&quot;completed&quot;:true}''</p>
<h1>DELETE ลบ todo</h1>
<p>curl -X DELETE <a href="http://localhost:8080/todos/1%F0%9F%8E%AF">http://localhost:8080/todos/1🎯 </a>สรุป: คุณเรียนรู้อะไรไปแล้ว?ยินดีด้วย! คุณได้เรียนรู้พื้นฐานของ Ktor แล้ว ซึ่งรวมถึง:✅ Setup &amp; Configuration - การตั้งค่า Ktor project
✅ Routing &amp; HTTP Methods - GET, POST, PUT, DELETE
✅ JSON &amp; Serialization - การทำงานกับ JSON
✅ Status Codes &amp; Error Handling - การจัดการข้อผิดพลาด
✅ Middleware &amp; Plugins - Logging, CORS, Custom middleware
✅ Practical Example - สร้าง Todo API ที่ใช้งานได้จริง💡 เคล็ดลับสำหรับผู้เริ่มต้น1. เริ่มจากง่ายๆอย่าพยายามสร้าง API ที่ซับซ้อนในครั้งแรก เริ่มจากการสร้างเส้นทาง GET ง่ายๆ ก่อน2. ใช้ Postman หรือ Insomniaใช้เครื่องมือ API testing เพื่อทดสอบ endpoints ของคุณแทน cURL3. อ่านเอกสาร <a href="Ktorhttps://ktor.io/docs">Ktorhttps://ktor.io/docs</a> มีตัวอย่างและเอกสารที่ครบถ้วน4. สร้างโปรเจกต์เล็กๆSimple Blog APIWeather APIE-commerce API5. เข้าร่วม CommunityKtor มี Slack, Discord, และ GitHub discussions ที่ใช้งานอยู่🚀 ขั้นต่อไปเมื่อคุณสบายใจกับพื้นฐาน ลองศึกษา:Database Integration - เชื่อมต่อกับ PostgreSQL, MongoDBAuthentication &amp; Authorization - JWT, OAuth2WebSocket - Real-time communicationTesting - Unit tests, Integration testsDeployment - Deploy ไปที่ Heroku, AWS, Docker✨ สุดท้ายKtor เป็น framework ที่ยอดเยี่ยมสำหรับสร้าง API ที่เร็ว และสะอาด ยิ่งคุณฝึกมากขึ้น คุณจะชอบมันมากขึ้นขอให้สนุกกับการสร้าง API ด้วย Ktor! 🚀📚 Resource ที่มีประโยชน์Ktor Official Docs: https<a href="https://ktor.io/docsKotlin">://ktor.io/docsKotlin Offi</a>cial Docs: https<a href="https://kotlinlang.org/docsKtor">://kotlinlang.org/docsKtor Samp</a>les: https<a href="https://github.com/ktorio/ktor/tree/main/samplesYouTube">://github.com/ktorio/ktor/tree/main/samplesYouTube Tuto</a>rials: ค้นหา &quot;Ktor Tutorial&quot; บน YouTube</p>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 63: Git Basics & Setup
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (63, 1, FALSE, FALSE, '2026-06-06 00:00:00+00', '2026-06-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (63, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (63, 30) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (63, 19) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (63, 41) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    63, 63, 'en', 'git-basics', 'Git Basics & Setup', 'A quick reference for initial Git configuration, creating and cloning repositories, basic branch management, and fundamental file operations.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"A quick reference for initial Git configuration, creating and cloning repositories, basic branch management, and fundamental file operations."}]}]}', '<h1>Git Basics &amp; Setup Reference</h1>
<p>A quick reference for initial Git configuration, creating and cloning repositories, basic branch management, and fundamental file operations.</p>
<blockquote>
<p><strong>TIP</strong>: &gt; For day-to-day engineering workflows, rebase strategies, multi-module staging, safe force-pushing, and production incident recovery, see <a href="/posts/git-real-life-engineering">Git in Real-Life Engineering</a>.</p>
</blockquote>
<hr />
<h2>1. Global Setup</h2>
<p>Configure your default identity for all local Git commits:</p>
<pre><code class="language-bash">git config --global user.name &quot;kananek mongkolsawat&quot;
git config --global user.email &quot;kananek.m@odds.team&quot;

# Optional: configure default branch name
git config --global init.defaultBranch main
</code></pre>
<hr />
<h2>2. Starting a Repository</h2>
<h3>Clone a remote repository</h3>
<pre><code class="language-bash">git clone &lt;repository-url&gt;
cd &lt;project-folder&gt;
</code></pre>
<h3>Initialize a new repository locally</h3>
<pre><code class="language-bash">mkdir my-project
cd my-project
git init
git branch -M main

touch README.md
git add README.md
git commit -m &quot;Initial commit&quot;

# Link to remote origin and push
git remote add origin &lt;repository-url&gt;
git push -u origin main
</code></pre>
<h3>Connect an existing local project</h3>
<pre><code class="language-bash">cd existing_folder
git init
git remote add origin &lt;repository-url&gt;
git add .
git commit -m &quot;Initial commit&quot;
git push -u origin master
</code></pre>
<h3>Switch remote URL</h3>
<pre><code class="language-bash"># Check current remotes
git remote -v

# Rename old origin
git remote rename origin old-origin

# Set new origin
git remote add origin &lt;repository-url&gt;
git push -u origin --all
git push -u origin --tags
</code></pre>
<hr />
<h2>3. Basic Branching &amp; Navigation</h2>
<pre><code class="language-bash"># List branches
git branch

# Modern branch switching (recommended)
git switch main
git switch -c feature/my-feature

# Classic checkout syntax
git checkout master
git checkout -b feature/my-feature
</code></pre>
<hr />
<h2>4. Basic File Operations &amp; <code>.gitignore</code></h2>
<h3>Deleting tracked files</h3>
<pre><code class="language-bash"># Remove file from disk and stage the deletion
git rm file.txt

# Remove folder recursively
git rm -r folder_name/

# Remove from Git tracking but keep local file on disk
git rm --cached file.txt
</code></pre>
<h3>Ignoring untracked files</h3>
<p>Add a <code>.gitignore</code> file to the root of your project:</p>
<pre><code class="language-gitignore"># Build outputs
/build/
/target/
*.class

# Environment secrets &amp; local config
.env
local.properties

# OS &amp; IDE metadata
.DS_Store
.idea/
.vscode/
</code></pre>
<hr />
<h2>5. Everyday Status, Stash, and Sync</h2>
<pre><code class="language-bash"># Check repository state
git status

# Quick stash &amp; pull
git stash
git pull
git stash pop

# Stage and commit
git add .
git commit -m &quot;feat: add feature description&quot;
git push
</code></pre>
', 'PUBLISHED', '2026-06-06 00:00:00+00', '2026-06-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 64: Git in Real-Life Engineering
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (64, 1, TRUE, FALSE, '2026-10-28 00:00:00+00', '2026-10-28 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (64, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (64, 30) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (64, 19) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (64, 42) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (64, 43) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    64, 64, 'en', 'git-real-life-engineering', 'Git in Real-Life Engineering', 'A battle-tested reference guide built for daily software engineering: multi-module Kotlin/Gradle microservices, rebase-based trunk syncing, atomic architectural staging, Conventional Commits...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"A battle-tested reference guide built for daily software engineering: multi-module Kotlin/Gradle microservices, rebase-based trunk syncing, atomic architectural staging, Conventional Commits..."}]}]}', '<h1>Git in Real-Life Engineering</h1>
<p>A battle-tested reference guide built for daily software engineering: multi-module Kotlin/Gradle microservices, rebase-based trunk syncing, atomic architectural staging, Conventional Commits, safe remote publishing, and production incident recovery.</p>
<blockquote>
<p><strong>NOTE</strong>: &gt; For initial repository initialization, credentials, and global setup, see <a href="/posts/git-basics">Git Basics &amp; Setup</a>.</p>
</blockquote>
<hr />
<h2>1. Quick Reference: Engineering Workflows</h2>
<table>
<thead>
<tr>
<th align="left">Phase</th>
<th align="left">Core Commands</th>
<th align="left">Real-World Scenario &amp; Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong>Start Feature</strong></td>
<td align="left"><code>git switch master</code>, <code>git pull --rebase</code>, <code>git switch -c feat/CORE-xxx</code></td>
<td align="left">Always branch off a fresh, linear trunk.</td>
</tr>
<tr>
<td align="left"><strong>Inspect History</strong></td>
<td align="left"><code>git log --oneline -n 15</code>, <code>git status -s</code></td>
<td align="left">Fast bird''s-eye view of HEAD, staged files, and incoming/outgoing commits.</td>
</tr>
<tr>
<td align="left"><strong>Scoped Staging</strong></td>
<td align="left"><code>git add domain/</code>, <code>git add persistence/</code>, <code>git add -p</code></td>
<td align="left">Stage per architectural layer so commits remain atomic and easy to review.</td>
</tr>
<tr>
<td align="left"><strong>Discard / Unstage</strong></td>
<td align="left"><code>git restore --staged &lt;file&gt;</code>, <code>git restore .</code></td>
<td align="left">Fix accidental staging without touching disk; discard local unwanted edits.</td>
</tr>
<tr>
<td align="left"><strong>Commit Standards</strong></td>
<td align="left"><code>git commit -m &quot;feat(scope): ...&quot;</code>, <code>git commit --amend</code></td>
<td align="left">Conventional Commits linked with Jira tickets; amend missed tweaks cleanly.</td>
</tr>
<tr>
<td align="left"><strong>Trunk Sync</strong></td>
<td align="left"><code>git fetch</code>, <code>git pull origin master --rebase</code></td>
<td align="left">Keep a clean linear history; avoid ugly &quot;Merge branch ''master''...&quot; merge bubbles.</td>
</tr>
<tr>
<td align="left"><strong>Commit Reshaping</strong></td>
<td align="left"><code>git reset --soft HEAD~1</code>, <code>git rebase -i HEAD~n</code></td>
<td align="left">Uncommit or squash WIP commits before opening or updating an MR/PR.</td>
</tr>
<tr>
<td align="left"><strong>Safe Publishing</strong></td>
<td align="left"><code>git push --force-with-lease</code>, <code>git push -u origin &lt;branch&gt;</code></td>
<td align="left">Protect teammates'' remote commits when pushing rebased or amended branches.</td>
</tr>
<tr>
<td align="left"><strong>Bypass Hooks</strong></td>
<td align="left"><code>git push --no-verify</code>, <code>git commit ... --no-verify</code></td>
<td align="left">Push urgent WIP or bypass heavy 5-minute local Gradle/ktlint test suites.</td>
</tr>
<tr>
<td align="left"><strong>Context Switch</strong></td>
<td align="left"><code>git stash push -m &quot;...&quot;</code>, <code>git stash pop</code>, <code>git worktree</code></td>
<td align="left">Shelve dirty work or launch parallel worktrees for urgent hotfixes.</td>
</tr>
<tr>
<td align="left"><strong>Debug &amp; Bisect</strong></td>
<td align="left"><code>git log -S &quot;query&quot;</code>, <code>git blame -w</code>, <code>git bisect</code></td>
<td align="left">Track who introduced regressions, find removed code, or isolate bugs.</td>
</tr>
<tr>
<td align="left"><strong>Production Undo</strong></td>
<td align="left"><code>git cherry-pick &lt;hash&gt;</code>, <code>git revert &lt;hash&gt;</code></td>
<td align="left">Port hotfixes to release branches or rollback commits without rewriting history.</td>
</tr>
<tr>
<td align="left"><strong>Nuclear Reset</strong></td>
<td align="left"><code>git clean -fdx</code></td>
<td align="left">Wipe untracked files and ignored build caches (fixes broken Gradle/daemon state).</td>
</tr>
</tbody>
</table>
<hr />
<h2>2. The Engineer''s Mental Model</h2>
<p>In production engineering, Git is not just backup storage; it is a <strong>communication tool and audit log</strong>:</p>
<ol>
<li><strong>Working Directory:</strong> Files currently being edited on disk.</li>
<li><strong>Staging Area (Index):</strong> The exact snapshot prepared for the next commit.</li>
<li><strong>Local Commit History (HEAD):</strong> Your private commit DAG (Directed Acyclic Graph).</li>
<li><strong>Remote Tracking Branches (<code>origin/master</code>):</strong> Cached references of what exists on the server.</li>
</ol>
<pre><code class="language-mermaid">flowchart LR
    WD[&quot;Working Directory\n(Unstaged)&quot;] --&gt;|&quot;git add &lt;module&gt;/\n(or git add -p)&quot;| SA[&quot;Staging Index\n(Prepared for commit)&quot;]
    SA --&gt;|&quot;git commit\n(Conventional)&quot;| LH[&quot;Local HEAD\n(Local Branch)&quot;]
    LH --&gt;|&quot;git push\n(--force-with-lease)&quot;| RB[&quot;Remote Branch\n(GitLab / GitHub)&quot;]
    SA --&gt;|&quot;git restore --staged&quot;| WD
    LH --&gt;|&quot;git reset --soft HEAD~1&quot;| SA
    RB --&gt;|&quot;git fetch + git pull --rebase&quot;| LH
</code></pre>
<hr />
<h2>3. Deep-Dive Workflows &amp; Scenarios</h2>
<h3>Workflow A: Branch Lifecycle &amp; Clean Trunk Sync</h3>
<p>Real-world teams work on shared trunk branches (<code>master</code> or <code>main</code>). Never branch off stale local code.</p>
<h4>1. Start a new ticket from updated master</h4>
<pre><code class="language-bash">git switch master
git pull --rebase
git switch -c feat/CORE-1856-journal-entry-inquiry
</code></pre>
<ul>
<li><strong>Scenario:</strong> You just picked up ticket <code>CORE-1856</code> from the sprint board.</li>
<li><strong>Why:</strong> Ensures your branch diverges from the latest merged code, minimizing future merge conflicts.</li>
</ul>
<h4>2. Rebase feature branch on trunk (Linear History)</h4>
<pre><code class="language-bash"># While working on your feature branch:
git fetch origin
git pull origin master --rebase
# or shorthand if tracking:
git pull --rebase
</code></pre>
<ul>
<li><strong>Scenario:</strong> Teammates merged 5 MRs into <code>master</code> while you were coding.</li>
<li><strong>Why <code>--rebase</code> over standard <code>pull</code>:</strong> Standard <code>git pull</code> creates an unnecessary merge commit (<code>Merge branch ''master'' of...</code>) that clutters git logs and makes Git bisect harder. Rebase lifts your commits, fast-forwards master, and replays your commits cleanly on top.</li>
</ul>
<h4>3. Handling rebase conflicts</h4>
<pre><code class="language-bash"># 1. Inspect conflict markers in your IDE, edit and save the file
# 2. Stage the resolved file:
git add src/main/kotlin/com/bank/service/JournalService.kt

# 3. Continue the rebase:
git rebase --continue

# Emergency escape hatch (if you want to cancel and go back to before rebase):
git rebase --abort
</code></pre>
<hr />
<h3>Workflow B: Scoped Staging in Multi-Module Projects</h3>
<p>In complex multi-module microservices (e.g. Kotlin/Spring Boot with <code>domain/</code>, <code>app/</code>, <code>api/</code>, <code>persistence/</code>, <code>client/</code>), running <code>git add .</code> creates noisy mega-commits. Real engineers stage intentionally by layer.</p>
<pre><code class="language-mermaid">flowchart TD
    Change[&quot;Local Code Changes&quot;] --&gt; D[&quot;domain/&quot;]
    Change --&gt; P[&quot;persistence/&quot;]
    Change --&gt; A[&quot;api/ &amp; app/&quot;]
    Change --&gt; T[&quot;bruno/ &amp; tests&quot;]

    D --&gt;|&quot;git add domain/&quot;| C1[&quot;Commit 1: Domain models &amp; usecases&quot;]
    P --&gt;|&quot;git add persistence/&quot;| C2[&quot;Commit 2: Flyway migration &amp; repository&quot;]
    A --&gt;|&quot;git add api/ app/&quot;| C3[&quot;Commit 3: gRPC/REST controllers &amp; wiring&quot;]
    T --&gt;|&quot;git add bruno/&quot;| C4[&quot;Commit 4: Contract tests &amp; API collections&quot;]
</code></pre>
<h4>1. Stage by bounded context or layer</h4>
<pre><code class="language-bash">git add domain/
git commit -m &quot;feat(CORE-1856): define JournalEntry query model and errors&quot;

git add persistence/
git commit -m &quot;feat(CORE-1856): add Flyway migration for journal line index&quot;

git add api/ app/
git commit -m &quot;feat(CORE-1856): implement gRPC inquiry endpoint&quot;
</code></pre>
<ul>
<li><strong>Scenario:</strong> You wrote an end-to-end feature spanning DB to API.</li>
<li><strong>Why:</strong> Splitting into layer-based commits makes Code Review (MR) 10x easier to approve and allows selective cherry-picking if only part of a feature needs to be promoted.</li>
</ul>
<h4>2. Interactive patch staging (<code>git add -p</code>)</h4>
<pre><code class="language-bash">git add -p path/to/file.kt
</code></pre>
<ul>
<li><strong>Scenario:</strong> You edited one large file with both a bugfix and an unrelated refactoring.</li>
<li><strong>Why:</strong> Prompts you chunk-by-chunk (<code>[y,n,q,a,d,s,e,?]</code>), allowing you to stage only the bugfix chunks for commit 1, and the refactor chunks for commit 2.</li>
</ul>
<h4>3. Unstage without losing work</h4>
<pre><code class="language-bash">git restore --staged domain/
git restore --staged .gitignore
</code></pre>
<ul>
<li><strong>Scenario:</strong> You accidentally ran <code>git add .</code> and captured configuration files or unfinished modules.</li>
<li><strong>Why:</strong> Safely ejects the files from the staging index back to unstaged working files.</li>
</ul>
<h4>4. Discard unwanted edits</h4>
<pre><code class="language-bash"># Discard changes to a single file
git restore src/main/resources/application-local.yml

# Discard all unstaged modifications in current repository
git restore .
</code></pre>
<ul>
<li><strong>Scenario:</strong> Scratch exploration or debug logging that you want to wipe before committing.</li>
</ul>
<hr />
<h3>Workflow C: Professional Commits &amp; Review Iteration</h3>
<h4>1. Conventional Commits with Ticket Linking</h4>
<pre><code class="language-bash">git commit -m &quot;feat(CORE-1856): add GL account name to domain response&quot;
git commit -m &quot;fix(CORE-1792): address Mambu activity MR feedback&quot;
git commit -m &quot;refactor(CORE-1792): extract date parsing logic to mapper&quot;
git commit -m &quot;test(CORE-1792): cover matured activity without state&quot;
git commit -m &quot;style(CORE-1792): fix ktlint formatting on constructor annotations&quot;
git commit -m &quot;chore: bump dkore-starter version to 2.4.1&quot;
</code></pre>
<ul>
<li><strong>Why:</strong> Machine-readable commit logs that automatically populate release notes, Jira release hubs, and CI pipelines.</li>
</ul>
<h4>2. Fast iteration on review comments</h4>
<pre><code class="language-bash"># Modifies tracked files and commits in one shot:
git commit -am &quot;fix(CORE-1792): address review suggestions remove any()&quot;
</code></pre>
<ul>
<li><strong>Scenario:</strong> Rapidly addressing feedback items from peer code reviews.</li>
</ul>
<h4>3. Amend the previous commit (The anti-typo command)</h4>
<pre><code class="language-bash"># Stage the forgotten file or tweak:
git add app/
git commit --amend --no-edit
</code></pre>
<ul>
<li><strong>Scenario:</strong> You just committed, ran the test, and noticed you forgot to save one file or format ktlint.</li>
<li><strong>Why:</strong> Merges your fix directly into <code>HEAD</code> so your PR doesn''t have embarrassing <code>fix typo</code> or <code>oops</code> commits.</li>
</ul>
<hr />
<h3>Workflow D: Reshaping Commits (Soft Reset &amp; Reflog)</h3>
<h4>1. Soft Reset: Undo commit, keep all changes staged</h4>
<pre><code class="language-bash">git reset --soft HEAD~1
</code></pre>
<ul>
<li><strong>Scenario:</strong> <strong>The #1 commit restructuring tool.</strong> You committed too early, want to change the commit message, combine two commits, or re-split files into separate commits.</li>
<li><strong>Why <code>--soft</code>:</strong> Moves HEAD back by 1 commit, but leaves <strong>all your code changes staged in the index</strong>. Nothing is lost or unstaged.</li>
</ul>
<h4>2. Interactive Rebase: Clean up your branch before PR</h4>
<pre><code class="language-bash">git rebase -i HEAD~4
</code></pre>
<ul>
<li>Opens an editor list of your last 4 commits with commands:
<ul>
<li><code>pick</code>: keep commit</li>
<li><code>reword</code>: keep commit but edit commit message</li>
<li><code>squash</code>: combine into previous commit (concatenates message)</li>
<li><code>fixup</code>: combine into previous commit (discards message)</li>
<li><code>drop</code>: delete commit</li>
</ul>
</li>
<li><strong>Scenario:</strong> Preparing a clean branch for review after making several messy local &quot;WIP&quot; commits.</li>
</ul>
<h4>3. Disaster Recovery with <code>git reflog</code></h4>
<pre><code class="language-bash">git reflog
</code></pre>
<p>Output:</p>
<pre><code class="language-text">7c2a11b HEAD@{0}: reset: moving to HEAD~2
a419f03 HEAD@{1}: commit: feat(CORE-1856): persistence implementation
e190ba2 HEAD@{2}: commit: feat(CORE-1856): domain models
</code></pre>
<p>Recovery:</p>
<pre><code class="language-bash"># Resurrect the commit you thought you lost:
git branch recovery-branch a419f03
</code></pre>
<ul>
<li><strong>The Golden Rule:</strong> In Git, commits are almost never permanently deleted immediately. The <code>reflog</code> tracks everywhere HEAD has pointed for the last 30–90 days.</li>
</ul>
<hr />
<h3>Workflow E: Remote Publishing &amp; Safety Controls</h3>
<h4>1. The Golden Rule of Force-Pushing</h4>
<pre><code class="language-bash"># NEVER do this on shared branches:
# git push --force

# ALWAYS do this:
git push --force-with-lease
</code></pre>
<ul>
<li><strong>Scenario:</strong> You rebased on <code>master</code> or ran <code>git commit --amend</code>. Git rejects standard <code>git push</code> because history diverged.</li>
<li><strong>Why <code>--force-with-lease</code>:</strong> Normal <code>--force</code> blindly overwrites the remote branch even if a colleague pushed a commit in the meantime. <code>--force-with-lease</code> checks if the remote ref matches what you last fetched; if someone else pushed new commits, it safely aborts and warns you.</li>
</ul>
<h4>2. First push of a new branch</h4>
<pre><code class="language-bash">git push -u origin feat/CORE-1856-journal-inquiry
# or:
git push --set-upstream origin feat/CORE-1856-journal-inquiry
</code></pre>
<ul>
<li><strong>Why:</strong> Sets up upstream tracking so future pushes and pulls only need <code>git push</code> or <code>git pull</code>.</li>
</ul>
<h4>3. Bypassing slow local hooks (<code>--no-verify</code>)</h4>
<pre><code class="language-bash">git push --no-verify
# or during commit:
git commit -m &quot;wip: checkpoint for remote runner&quot; --no-verify
</code></pre>
<ul>
<li><strong>Scenario:</strong> Local pre-commit/pre-push hooks execute a full 4-minute Gradle test suite or Sonar analysis, but you need to push a WIP branch for an end-of-day backup, ask a teammate to inspect a branch, or test an environment-specific CI pipeline.</li>
</ul>
<hr />
<h3>Workflow F: Context Switching &amp; Emergency Interruption</h3>
<h4>1. Stashing with descriptive labels</h4>
<pre><code class="language-bash"># Stash with a descriptive note
git stash push -m &quot;WIP: CORE-1856 mid-refactor of mapper&quot;

# List all stashes
git stash list

# Inspect what is inside stash@{0} without applying it
git stash show -p stash@{0}

# Reapply and remove from stash list:
git stash pop

# Reapply but KEEP in stash list:
git stash apply stash@{0}
</code></pre>
<ul>
<li><strong>Scenario:</strong> Production incident breaks out while you are in the middle of writing unfinished feature code.</li>
</ul>
<h4>2. Git Worktrees (Zero-Context-Switch Alternative)</h4>
<pre><code class="language-bash"># Create a parallel folder for hotfix without disturbing current branch:
git worktree add ../service-hotfix master
cd ../service-hotfix
git switch -c fix/prod-critical-memory-leak
# Fix bug, test, commit, push, then clean up:
cd ../service-main
git worktree remove ../service-hotfix
</code></pre>
<ul>
<li><strong>Scenario:</strong> You have a heavy build running or IntelliJ indexing a branch with 50 uncommitted files, and an urgent hotfix is needed immediately.</li>
<li><strong>Why:</strong> Avoids stashing, branch swapping, and waiting for IDE re-indexing.</li>
</ul>
<hr />
<h3>Workflow G: Production Debugging &amp; Incident Response</h3>
<h4>1. Pickaxe Search (Find who added or deleted code)</h4>
<pre><code class="language-bash">git log -S &quot;suppressStreamingEvents&quot; --source --all -p
</code></pre>
<ul>
<li><strong>Scenario:</strong> A feature flag or method disappeared or was altered, and you need to find the exact commit and MR that touched it across all branches.</li>
</ul>
<h4>2. History of a single file (Across renames)</h4>
<pre><code class="language-bash">git log --follow -p -- src/main/resources/application.properties
</code></pre>
<ul>
<li><strong>Scenario:</strong> Investigating when an application timeout was altered across multiple refactorings.</li>
</ul>
<h4>3. Blame without whitespace noise</h4>
<pre><code class="language-bash">git blame -w -L 45,70 src/main/kotlin/com/bank/App.kt
</code></pre>
<ul>
<li><strong>Scenario:</strong> Investigating who wrote a line of code while ignoring formatting/ktlint commits that touched whitespace.</li>
</ul>
<h4>4. Git Bisect: Find the exact bug-introducing commit</h4>
<pre><code class="language-bash">git bisect start
git bisect bad                 # Current commit has the bug
git bisect good v2.4.0         # Release v2.4.0 was known good

# Git checks out intermediate commits automatically.
# Test your code, then mark:
git bisect good   # or: git bisect bad

# When finished:
git bisect reset
</code></pre>
<ul>
<li><strong>Scenario:</strong> A regression exists in <code>master</code>, but 80 commits were merged this week. Bisect finds the exact culprit in ~6 binary search steps.</li>
</ul>
<hr />
<h3>Workflow H: Hotfix Cherry-Picking &amp; Reverts</h3>
<h4>1. Cherry-pick a bugfix to a release branch</h4>
<pre><code class="language-bash">git switch release/v2.4
git cherry-pick 7f4a2b1
git push origin release/v2.4
</code></pre>
<ul>
<li><strong>Scenario:</strong> A bug was fixed on <code>master</code> (commit <code>7f4a2b1</code>), but the customer needs the fix backported immediately to maintenance branch <code>release/v2.4</code> without deploying unreleased master features.</li>
</ul>
<h4>2. Safe Production Revert</h4>
<pre><code class="language-bash">git revert &lt;commit-hash&gt;
git push origin master
</code></pre>
<ul>
<li><strong>Scenario:</strong> A merged commit is causing errors in production.</li>
<li><strong>Why revert over reset:</strong> Never rewrite history (<code>reset --hard</code> or force-push) on shared production branches (<code>master</code>). <code>git revert</code> creates a new forward-facing commit that cleanly inverses the bad changes.</li>
</ul>
<hr />
<h3>Workflow I: Nuclear Workspace Purge</h3>
<h4>Clean untracked files &amp; corrupted build caches</h4>
<pre><code class="language-bash">git clean -fdx
</code></pre>
<ul>
<li><strong>Flags:</strong>
<ul>
<li><code>-f</code>: force</li>
<li><code>-d</code>: remove whole untracked directories</li>
<li><code>-x</code>: remove ignored files (e.g. <code>./build/</code>, <code>.gradle/</code>, <code>.idea/</code>, target files)</li>
</ul>
</li>
<li><strong>Scenario:</strong> Gradle build fails with obscure cache errors, strange classpath duplication, or stale generated code that <code>clean build</code> fails to fix.</li>
<li><strong>Result:</strong> Returns your workspace to pristine, freshly-cloned state.</li>
</ul>
<hr />
<h2>4. Helpful Terminal Aliases</h2>
<p>Add these to your <code>~/.zshrc</code> to speed up your everyday flow:</p>
<pre><code class="language-bash"># Navigation &amp; Status
alias gs=&quot;git status -s&quot;
alias gsw=&quot;git switch&quot;
alias gswc=&quot;git switch -c&quot;
alias gswm=&quot;git switch master&quot;

# Linear History
alias gl=&quot;git log --oneline -n 15&quot;
alias glg=&quot;git log --graph --oneline --decorate -n 20&quot;
alias gpr=&quot;git pull origin master --rebase&quot;

# Safe Publishing
alias gpf=&quot;git push --force-with-lease&quot;
alias gpnv=&quot;git push --no-verify&quot;

# Stash &amp; Soft Reset
alias gst=&quot;git stash push -m&quot;
alias gstp=&quot;git stash pop&quot;
alias grs=&quot;git reset --soft HEAD~1&quot;
</code></pre>
', 'PUBLISHED', '2026-10-28 00:00:00+00', '2026-10-28 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 65: Learn Vim and Neovim
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (65, 1, FALSE, FALSE, '2026-07-14 00:00:00+00', '2026-07-14 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (65, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (65, 21) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (65, 20) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    65, 65, 'en', 'learn-vim-neovim', 'Learn Vim and Neovim', 'Start with Vim fundamentals, then move to Neovim configuration. Their core editing language is nearly identical.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Start with Vim fundamentals, then move to Neovim configuration. Their core editing language is nearly identical."}]}]}', '<h1>Learn Vim and Neovim</h1>
<p>Start with <strong>Vim fundamentals</strong>, then move to <strong>Neovim configuration</strong>. Their core editing language is nearly identical.</p>
<p>Separate usage references:</p>
<ul>
<li><a href="/posts/vim-usage">Vim Usage</a></li>
<li><a href="/posts/neovim-usage">Neovim Usage</a></li>
</ul>
<h2>1. Start with the built-in tutorial</h2>
<p>Install Neovim and run:</p>
<pre><code class="language-bash">nvim +Tutor
</code></pre>
<p>Spend 20-30 minutes on the tutorial each day, then use Neovim for real editing immediately.</p>
<h2>2. Learn the essentials</h2>
<h3>Modes</h3>
<ul>
<li>Normal mode: navigate and edit</li>
<li>Insert mode: enter text</li>
<li>Visual mode: select text</li>
<li>Command-line mode: save, quit, and run commands</li>
</ul>
<p>Press <code>Esc</code> to return to Normal mode.</p>
<h3>Movement</h3>
<table>
<thead>
<tr>
<th>Key</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>h</code> <code>j</code> <code>k</code> <code>l</code></td>
<td>Move left, down, up, right</td>
</tr>
<tr>
<td><code>w</code></td>
<td>Move to the next word</td>
</tr>
<tr>
<td><code>b</code></td>
<td>Move to the previous word</td>
</tr>
<tr>
<td><code>e</code></td>
<td>Move to the end of a word</td>
</tr>
<tr>
<td><code>0</code></td>
<td>Move to the start of the line</td>
</tr>
<tr>
<td><code>$</code></td>
<td>Move to the end of the line</td>
</tr>
<tr>
<td><code>gg</code></td>
<td>Move to the first line</td>
</tr>
<tr>
<td><code>G</code></td>
<td>Move to the last line</td>
</tr>
</tbody>
</table>
<h3>Editing</h3>
<table>
<thead>
<tr>
<th>Key</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>i</code></td>
<td>Insert before the cursor</td>
</tr>
<tr>
<td><code>a</code></td>
<td>Insert after the cursor</td>
</tr>
<tr>
<td><code>o</code></td>
<td>Open a new line below</td>
</tr>
<tr>
<td><code>x</code></td>
<td>Delete one character</td>
</tr>
<tr>
<td><code>dd</code></td>
<td>Delete a line</td>
</tr>
<tr>
<td><code>yy</code></td>
<td>Copy a line</td>
</tr>
<tr>
<td><code>p</code></td>
<td>Paste after the cursor</td>
</tr>
<tr>
<td><code>u</code></td>
<td>Undo</td>
</tr>
<tr>
<td><code>Ctrl-r</code></td>
<td>Redo</td>
</tr>
</tbody>
</table>
<h3>Search and files</h3>
<table>
<thead>
<tr>
<th>Key</th>
<th>Action</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>/text</code></td>
<td>Search forward for <code>text</code></td>
</tr>
<tr>
<td><code>n</code> / <code>N</code></td>
<td>Next/previous search result</td>
</tr>
<tr>
<td><code>:w</code></td>
<td>Save</td>
</tr>
<tr>
<td><code>:q</code></td>
<td>Quit</td>
</tr>
<tr>
<td><code>:wq</code></td>
<td>Save and quit</td>
</tr>
<tr>
<td><code>:q!</code></td>
<td>Quit without saving</td>
</tr>
</tbody>
</table>
<h2>3. Understand Vim''s grammar</h2>
<p>Vim commands combine small building blocks:</p>
<pre><code class="language-text">operator + count + motion
</code></pre>
<p>Examples:</p>
<ul>
<li><code>dw</code>: delete to the next word</li>
<li><code>d$</code>: delete to the end of the line</li>
<li><code>ciw</code>: change inside the current word</li>
<li><code>3j</code>: move down three lines</li>
<li><code>2dd</code>: delete two lines</li>
</ul>
<h2>4. Practice before adding plugins</h2>
<p>Avoid installing many plugins during the first week. Use Neovim for real work and focus on the commands you need repeatedly.</p>
<p>Prioritize these commands:</p>
<pre><code class="language-text">w  b  ciw  dd  p  u  /  n  .
</code></pre>
<p>Do not try to memorize everything at once.</p>
<h2>5. What to learn next</h2>
<p>After the basics feel comfortable, learn:</p>
<ul>
<li>Text objects: <code>iw</code>, <code>aw</code>, <code>i&quot;</code>, <code>i(</code>, <code>ip</code></li>
<li>Repeating the previous change with <code>.</code></li>
<li>Registers and macros</li>
<li>Buffers, windows, and tabs</li>
<li>Neovim configuration with <code>init.lua</code></li>
<li>LSP, completion, fuzzy finding, and Treesitter</li>
</ul>
<h2>Learning path</h2>
<pre><code class="language-text">nvim +Tutor -&gt; Vim motions -&gt; text objects -&gt; real editing -&gt; minimal init.lua -&gt; plugins
</code></pre>
', 'PUBLISHED', '2026-07-14 00:00:00+00', '2026-07-14 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 66: Mac Terminal Setup & Movement Shortcuts
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (66, 1, FALSE, FALSE, '2026-07-11 00:00:00+00', '2026-07-11 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (66, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (66, 23) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (66, 44) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (66, 45) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (66, 46) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (66, 47) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (66, 48) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    66, 66, 'en', 'mac-terminal-setup', 'Mac Terminal Setup & Movement Shortcuts', 'A comprehensive reference for macOS terminal emulators (Ghostty, iTerm2, Terminal.app, IntelliJ, VS Code) and the essential Readline keyboard shortcuts that 10x terminal speed.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"A comprehensive reference for macOS terminal emulators (Ghostty, iTerm2, Terminal.app, IntelliJ, VS Code) and the essential Readline keyboard shortcuts that 10x terminal speed."}]}]}', '<h1>Mac Terminal Setup &amp; Movement Shortcuts</h1>
<p>A comprehensive reference for macOS terminal emulators (Ghostty, iTerm2, Terminal.app, IntelliJ, VS Code) and the essential Readline keyboard shortcuts that 10x terminal speed.</p>
<blockquote>
<p><strong>TIP</strong>: &gt; For shell aliases (<code>gst</code>, <code>ggu</code>, <code>zd</code>), custom functions (<code>pm</code>, <code>dotfiles</code>), and interactive completions, see <a href="/posts/zsh-real-life-engineering">Zsh &amp; Terminal in Real-Life Engineering</a>.</p>
</blockquote>
<hr />
<h2>1. The Single Most Important Setting: &quot;Option as Meta&quot;</h2>
<p>By default on macOS, pressing <code>Option + Key</code> types special symbols (e.g. <code>Opt + F</code> produces <code>ƒ</code>, <code>Opt + B</code> produces <code>∫</code>).
In Unix/Linux terminals, <code>Option</code> (Meta / Alt) is supposed to jump <strong>word-by-word</strong> and perform advanced editing.</p>
<h3>How to Enable Option as Meta Across Terminals</h3>
<table>
<thead>
<tr>
<th align="left">Terminal</th>
<th align="left">Setting Location</th>
<th align="left">Configuration Value</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong>Ghostty</strong></td>
<td align="left"><code>~/.config/ghostty/config</code></td>
<td align="left"><code>macos-option-as-alt = true</code></td>
</tr>
<tr>
<td align="left"><strong>iTerm2</strong></td>
<td align="left">Settings → Profiles → Keys</td>
<td align="left">Left Option Key: Set to <code>Esc+</code></td>
</tr>
<tr>
<td align="left"><strong>Terminal.app</strong></td>
<td align="left">Settings → Profiles → Keyboard</td>
<td align="left">Check: <code>Use Option as Meta key</code></td>
</tr>
<tr>
<td align="left"><strong>IntelliJ IDEA</strong></td>
<td align="left">Settings → Tools → Terminal</td>
<td align="left">Check: <code>Use Option as Meta key</code></td>
</tr>
<tr>
<td align="left"><strong>VS Code</strong></td>
<td align="left"><code>settings.json</code></td>
<td align="left"><code>&quot;terminal.integrated.macOptionIsMeta&quot;: true</code></td>
</tr>
</tbody>
</table>
<hr />
<h2>2. Essential Readline Shortcuts (Everyday Flow)</h2>
<p>These shortcuts work in Bash, Zsh, and most Unix command-line utilities once Option is configured as Meta.</p>
<h3>Cursor Navigation (Stop Hitting the Arrow Keys!)</h3>
<table>
<thead>
<tr>
<th align="left">Shortcut</th>
<th align="left">Action</th>
<th align="left">Real-Life Scenario</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong><code>Ctrl + A</code></strong></td>
<td align="left">Beginning of line</td>
<td align="left">Jump to start to add <code>sudo</code>, <code>time</code>, or fix the command binary.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + E</code></strong></td>
<td align="left">End of line</td>
<td align="left">Jump to end to add flags or arguments (<code>--force</code>, `</td>
</tr>
<tr>
<td align="left"><strong><code>Opt + B</code></strong></td>
<td align="left">Back one word</td>
<td align="left">Hop backward word-by-word through long paths or URLs.</td>
</tr>
<tr>
<td align="left"><strong><code>Opt + F</code></strong></td>
<td align="left">Forward one word</td>
<td align="left">Hop forward word-by-word.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + XX</code></strong></td>
<td align="left">Toggle cursor between current position and start of line</td>
<td align="left">Quick peek back and forth.</td>
</tr>
</tbody>
</table>
<h3>Fast Editing &amp; Killing Text</h3>
<p>In Readline, &quot;killing&quot; text cuts it into an internal clipboard ring, and <code>Ctrl + Y</code> (&quot;yanking&quot;) pastes it back.</p>
<table>
<thead>
<tr>
<th align="left">Shortcut</th>
<th align="left">Action</th>
<th align="left">Real-Life Scenario</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong><code>Ctrl + W</code></strong></td>
<td align="left">Kill word backward</td>
<td align="left">Erase a mistyped branch name, argument, or directory name.</td>
</tr>
<tr>
<td align="left"><strong><code>Opt + D</code></strong></td>
<td align="left">Kill word forward</td>
<td align="left">Delete word directly in front of the cursor.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + U</code></strong></td>
<td align="left">Kill to start of line</td>
<td align="left">Erase the entire command up to cursor to start over.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + K</code></strong></td>
<td align="left">Kill to end of line</td>
<td align="left">Erase all flags/arguments following the cursor.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + Y</code></strong></td>
<td align="left">Yank (Paste) cut text</td>
<td align="left">Paste back whatever you deleted with <code>Ctrl+W</code> or <code>Ctrl+U</code>.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + T</code></strong></td>
<td align="left">Transpose two characters</td>
<td align="left">Fix quick character typos (e.g. <code>sl</code> $\rightarrow$ <code>ls</code>).</td>
</tr>
<tr>
<td align="left"><strong><code>Opt + T</code></strong></td>
<td align="left">Transpose two words</td>
<td align="left">Swap two arguments without retyping them.</td>
</tr>
</tbody>
</table>
<h3>Supercharged History &amp; Recall</h3>
<table>
<thead>
<tr>
<th align="left">Shortcut</th>
<th align="left">Action</th>
<th align="left">Real-Life Scenario</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong><code>Opt + .</code></strong></td>
<td align="left"><strong>Yank last argument</strong></td>
<td align="left"><strong>The ultimate shortcut:</strong> e.g. run <code>mkdir -p /some/deep/path</code>, then type <code>cd </code> and hit <code>Opt + .</code> to immediately insert the path!</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + R</code></strong></td>
<td align="left">Reverse history search</td>
<td align="left">Search through past commands by typing any keyword.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + P</code> / <code>N</code></strong></td>
<td align="left">Previous / Next command</td>
<td align="left">Ergonomic alternative to Up/Down arrow keys (hands stay on home row).</td>
</tr>
</tbody>
</table>
<h3>Process &amp; Terminal Control</h3>
<table>
<thead>
<tr>
<th align="left">Shortcut</th>
<th align="left">Action</th>
<th align="left">Real-Life Scenario</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong><code>Ctrl + C</code></strong></td>
<td align="left">Cancel / Interrupt (<code>SIGINT</code>)</td>
<td align="left">Instantly stop a running script, server, or build.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + Z</code></strong></td>
<td align="left">Suspend process (<code>SIGTSTP</code>)</td>
<td align="left">Pause a long running job. Type <code>bg</code> to run it in background or <code>fg</code> to resume.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + D</code></strong></td>
<td align="left">Send EOF (End of File)</td>
<td align="left">Exit SSH sessions, close Docker exec containers, or exit shell if line is empty.</td>
</tr>
<tr>
<td align="left"><strong><code>Ctrl + L</code></strong></td>
<td align="left">Clear screen</td>
<td align="left">Clear terminal screen while keeping current input line intact.</td>
</tr>
</tbody>
</table>
<hr />
<h2>3. Terminal Emulator Setups</h2>
<h3>Ghostty (Modern Fast GPU Terminal)</h3>
<p>Config file: <code>~/.config/ghostty/config</code></p>
<pre><code class="language-ini"># Use Option as Meta key for word navigation
macos-option-as-alt = true

# Font configuration
font-family = &quot;JetBrains Mono&quot;
font-size = 16

# Visuals
background-opacity = 0.99
theme = dark:catppuccin-mocha,light:catppuccin-latte
</code></pre>
<h4>Ghostty Keybindings</h4>
<table>
<thead>
<tr>
<th align="left">Shortcut</th>
<th align="left">Action</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>Cmd + D</code></td>
<td align="left">Split pane vertically (right)</td>
</tr>
<tr>
<td align="left"><code>Cmd + Shift + D</code></td>
<td align="left">Split pane horizontally (down)</td>
</tr>
<tr>
<td align="left"><code>Cmd + Opt + Arrows</code></td>
<td align="left">Navigate between split panes</td>
</tr>
<tr>
<td align="left"><code>Cmd + Shift + Arrows</code></td>
<td align="left">Resize current pane</td>
</tr>
<tr>
<td align="left"><code>Cmd + W</code></td>
<td align="left">Close current pane</td>
</tr>
<tr>
<td align="left"><code>Cmd + T</code></td>
<td align="left">New tab</td>
</tr>
<tr>
<td align="left"><code>Cmd + Shift + Enter</code></td>
<td align="left">Toggle pane fullscreen / zoom</td>
</tr>
</tbody>
</table>
<hr />
<h3>iTerm2</h3>
<p>Config directory: <code>~/.config/iterm2/</code></p>
<h4>Keybindings</h4>
<ul>
<li><code>Cmd + D</code>: Split pane vertically</li>
<li><code>Cmd + Shift + D</code>: Split pane horizontally</li>
<li><code>Cmd + ]</code> / <code>[</code>: Cycle between panes</li>
<li><code>Cmd + Opt + Arrows</code>: Resize pane</li>
<li><code>Cmd + Shift + H</code>: Paste history dialog</li>
<li><code>Cmd + ;</code>: Autocomplete word from screen buffer</li>
</ul>
<hr />
<h3>IntelliJ IDEA / JetBrains IDE Terminal</h3>
<p>Share configuration across IntelliJ, Fleet, WebStorm, and PyCharm:</p>
<ul>
<li><strong>Toggle Terminal:</strong> <code>Opt + F12</code></li>
<li><strong>Settings:</strong> Settings → Tools → Terminal
<ul>
<li>Shell path: <code>/bin/zsh</code></li>
<li>Font: <code>JetBrains Mono</code>, Size <code>16</code></li>
<li>Environment variables: <code>TERM=xterm-256color;SHELL=/bin/zsh</code></li>
<li>Ensure <strong>&quot;Use Option as Meta key&quot;</strong> is checked.</li>
</ul>
</li>
</ul>
<hr />
<h2>4. Related Notes</h2>
<ul>
<li><a href="/posts/zsh-real-life-engineering">Zsh &amp; Terminal in Real-Life Engineering</a></li>
<li><a href="/posts/zsh-config">Zsh Config Reference</a></li>
<li><a href="/posts/git-real-life-engineering">Git in Real-Life Engineering</a></li>
</ul>
', 'PUBLISHED', '2026-07-11 00:00:00+00', '2026-07-11 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 67: macOS Developer Tools & Engineering Stack (Late 2026)
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (67, 1, TRUE, FALSE, '2026-10-28 00:00:00+00', '2026-10-28 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (67, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (67, 30) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (67, 49) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (67, 23) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (67, 48) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (67, 43) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    67, 67, 'en', 'macos-tools-stack-2026', 'macOS Developer Tools & Engineering Stack (Late 2026)', 'A definitive overview of the personal development environment, terminal workflows, IDEs, agent orchestrators, and system utilities powering day-to-day software engineering on macOS in late 2...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"A definitive overview of the personal development environment, terminal workflows, IDEs, agent orchestrators, and system utilities powering day-to-day software engineering on macOS in late 2..."}]}]}', '<h1>macOS Developer Tools &amp; Engineering Stack (Late 2026)</h1>
<p>A definitive overview of the personal development environment, terminal workflows, IDEs, agent orchestrators, and system utilities powering day-to-day software engineering on macOS in late 2026.</p>
<blockquote>
<p><strong>NOTE</strong>: &gt; For individual tool deep dives and command playbooks, see <a href="/posts/tools-index">Developer Tools Index</a>, <a href="/posts/git-real-life-engineering">Git in Real-Life Engineering</a>, and <a href="/posts/zsh-real-life-engineering">Zsh in Real-Life Engineering</a>.</p>
</blockquote>
<hr />
<h2>1. System &amp; Architecture Map</h2>
<p>Your environment is structured in concentric layers: from macOS window &amp; system utilities to terminal multiplexing, polyglot editors, and agentic AI tools.</p>
<pre><code class="language-mermaid">flowchart TD
    subgraph System[&quot;macOS Utilities &amp; System Layer&quot;]
        Raycast[&quot;Raycast\n(Launcher, Clipboard, Window Tiling)&quot;]
        RunCat[&quot;RunCat Neo\n(Visual CPU &amp; Load Telemetry)&quot;]
        Vorssaint[&quot;Vorssaint\n(Window Manager &amp; Shortcuts)&quot;]
        Obsidian[&quot;Obsidian\n(Second Brain, PKM &amp; CLI)&quot;]
    end

    subgraph Terminal[&quot;Terminal &amp; Shell Core&quot;]
        Ghostty[&quot;Ghostty\n(GPU-Accelerated Terminal)&quot;]
        Zsh[&quot;Zsh + Zinit + Jovial\n(Shell &amp; Prompt)&quot;]
        Zoxide[&quot;Zoxide (zd)\n(Frecency Directory Jumper)&quot;]
        FZF[&quot;fzf\n(Fuzzy Completion &amp; History)&quot;]
        Herdr[&quot;Herdr\n(Agent Terminal Workspace Manager)&quot;]
    end

    subgraph Editors[&quot;IDEs &amp; Code Editors&quot;]
        IntelliJ[&quot;IntelliJ IDEA\n(JVM, Kotlin, Spring Boot, gRPC)&quot;]
        DataGrip[&quot;DataGrip\n(Database IDE &amp; Query Tuning)&quot;]
        Zed[&quot;Zed\n(Vim Mode + JetBrains Keymap + AI Models)&quot;]
        Neovim[&quot;Neovim / Vim\n(Terminal Modal Scratchpad)&quot;]
    end

    subgraph Infrastructure[&quot;Runtimes &amp; Containerization&quot;]
        OrbStack[&quot;OrbStack\n(Lightweight Docker &amp; Linux VMs)&quot;]
        Mise[&quot;Mise\n(Polyglot Runtime Manager)&quot;]
        Bruno[&quot;Bruno\n(Git-Native API Client)&quot;]
        Op[&quot;1Password CLI\n(Zero-Trust Secret Injection)&quot;]
    end

    System --&gt; Terminal
    Terminal --&gt; Editors
    Editors --&gt; Infrastructure
</code></pre>
<hr />
<h2>2. System Launchers &amp; Menu Bar Telemetry</h2>
<h3>1. Raycast</h3>
<ul>
<li><strong>Role:</strong> macOS command center, application launcher, and keyboard productivity hub (replaces Spotlight and Alfred).</li>
<li><strong>Why in the 2026 Stack:</strong> Instant response time, extensive extension ecosystem, and integrated developer utilities.</li>
<li><strong>Key Everyday Usages:</strong>
<ul>
<li><strong>Clipboard History:</strong> Unlimited searchable clipboard with images, links, and code snippets.</li>
<li><strong>Window Management:</strong> Half-screen, thirds, fullscreen, and multi-monitor window tiling.</li>
<li><strong>Quick Utilities:</strong> Currency conversion, timezone math, and rapid snippet expansions.</li>
<li><strong>Reference Guide:</strong> <a href="/posts/raycast-mac">Raycast: ตัวช่วยทำงานบน Mac</a>.</li>
</ul>
</li>
</ul>
<h3>2. RunCat (RunCat Neo)</h3>
<ul>
<li><strong>Role:</strong> Menu bar CPU and system resource monitor represented by an animated running cat/character.</li>
<li><strong>Why in the 2026 Stack:</strong> Provides <strong>passive ambient awareness</strong> of system load without opening Activity Monitor or consuming screen space.</li>
<li><strong>Engineering Value:</strong>
<ul>
<li>When Gradle starts a heavy compilation or a Docker container enters a runaway loop, RunCat sprints furiously across the menu bar.</li>
<li>When background AI agents finish inference or when your laptop is cool and idle, RunCat strolls slowly.</li>
</ul>
</li>
</ul>
<h3>3. Vorssaint</h3>
<ul>
<li><strong>Role:</strong> macOS workspace helper, menu bar organizer, and keyboard shortcut manager.</li>
<li><strong>Why in the 2026 Stack:</strong> Bridges gap between native macOS windowing and custom workspace layouts, keeping multi-display setups organized.</li>
</ul>
<h3>4. Obsidian</h3>
<ul>
<li><strong>Role:</strong> Local-first Markdown knowledge base, architecture documentation, daily sprint logs, and technical reference.</li>
<li><strong>Why in the 2026 Stack:</strong> Zero vendor lock-in, plaintext Markdown files, bi-directional wikilinks, and headless scripting via <code>obsidian-cli</code>.</li>
<li><strong>Engineering Value:</strong>
<ul>
<li>Houses all living project documentation (e.g. <code>Notes/Tools/</code>, <code>Notes/Architecture/</code>, <code>Jago/Dkore/</code>).</li>
<li>Searchable and scriptable directly from shell terminals.</li>
</ul>
</li>
</ul>
<hr />
<h2>3. Terminal &amp; Shell Core</h2>
<h3>1. Ghostty</h3>
<ul>
<li><strong>Role:</strong> Primary terminal emulator on macOS.</li>
<li><strong>Why in the 2026 Stack:</strong> Native macOS UI with GPU-accelerated rendering, sub-millisecond input latency, native tabs, split panes, and sane default behaviors.</li>
<li><strong>Key Configurations (<code>~/.config/ghostty/config</code>):</strong>
<ul>
<li><code>macos-option-as-alt = true</code>: Enables Option key word-jumping (<code>Opt+B</code>/<code>Opt+F</code>) for Readline.</li>
<li><code>font-family = &quot;JetBrains Mono&quot;</code>, <code>font-size = 16</code>.</li>
<li>Splits: <code>Cmd + D</code> (vertical split), <code>Cmd + Shift + D</code> (horizontal split), <code>Cmd + Opt + Arrows</code> (pane focus).</li>
<li>Reference: <a href="/posts/mac-terminal-setup">Mac Terminal Setup &amp; Movement Shortcuts</a>.</li>
</ul>
</li>
</ul>
<h3>2. Zsh (with Zinit &amp; Jovial)</h3>
<ul>
<li><strong>Role:</strong> Interactive command-line shell.</li>
<li><strong>Why in the 2026 Stack:</strong> Fast startup, OMZ Git integration, substring history matching, and rich visual prompt.</li>
<li><strong>Core Engineering Aliases:</strong>
<ul>
<li><code>gst</code>: Instant <code>git status</code> (used 190+ times).</li>
<li><code>ggu</code>: <code>git pull --rebase origin $(current_branch)</code> (one-command rebase).</li>
<li><code>gp</code>: <code>git push</code>.</li>
<li>Reference: <a href="/posts/zsh-real-life-engineering">Zsh in Real-Life Engineering</a> and <a href="/posts/zsh-config">Zsh Config Reference</a>.</li>
</ul>
</li>
</ul>
<h3>3. Zoxide (<code>zd</code>)</h3>
<ul>
<li><strong>Role:</strong> Smarter <code>cd</code> command with frecency learning.</li>
<li><strong>Why in the 2026 Stack:</strong> Completely eliminates typing out nested filesystem paths like <code>cd ~/works/jago/engagement-platform-engine/</code>.</li>
<li><strong>Daily Usage:</strong>
<ul>
<li><code>zd engage</code> $\rightarrow$ jumps straight to engagement platform.</li>
<li><code>zd ledger</code> $\rightarrow$ jumps straight to <code>ms-dkore-ledger</code>.</li>
<li><code>zd docs</code> $\rightarrow$ jumps straight to Obsidian docs vault.</li>
<li><code>zd -i</code> $\rightarrow$ launches interactive fuzzy selector.</li>
</ul>
</li>
</ul>
<h3>4. fzf (Fuzzy Finder)</h3>
<ul>
<li><strong>Role:</strong> Interactive fuzzy search filter for files, command history, and directories.</li>
<li><strong>Why in the 2026 Stack:</strong> Integrates into <code>Ctrl+R</code> for cycling past commands and powers fuzzy searches inside Neovim, Zsh, and git logs.</li>
</ul>
<h3>5. Herdr (<code>herdr</code>)</h3>
<ul>
<li><strong>Role:</strong> Terminal workspace manager and control plane built specifically for autonomous AI coding agents.</li>
<li><strong>Why in the 2026 Stack:</strong>
<ul>
<li>Manages persistent agent sessions, socket APIs, Git worktree isolation, notifications, and terminal panes across autonomous workflows.</li>
<li>Allows multi-agent coordination without cluttering interactive developer terminals.</li>
</ul>
</li>
</ul>
<hr />
<h2>4. Code Editors &amp; IDEs: The Specialized Triangle</h2>
<p>In late 2026, no single editor does everything. Work is delegated to the right tool for the job:</p>
<pre><code class="language-mermaid">flowchart TD
    Task{&quot;What are you working on?&quot;}
    Task --&gt;|&quot;Kotlin / Spring / gRPC / DB&quot;| IJ[&quot;IntelliJ IDEA + DataGrip\nFull semantic index, Gradle, migrations&quot;]
    Task --&gt;|&quot;Fast script / Diff / AI Agent&quot;| Zed[&quot;Zed\nJetBrains keys + Vim mode + OmniRoute AI&quot;]
    Task --&gt;|&quot;Quick config / Terminal scratch&quot;| Nvim[&quot;Neovim / Vim\nZero latency, Space-leader, Telescope&quot;]
</code></pre>
<h3>1. IntelliJ IDEA (<code>idea .</code>)</h3>
<ul>
<li><strong>Primary Domain:</strong> Enterprise backend microservices, Kotlin, Spring Boot, gRPC, Gradle multi-module builds.</li>
<li><strong>Why in the 2026 Stack:</strong> Unrivaled semantic AST understanding, refactoring capabilities (rename, extract method across 20 modules), type-safe debugging, and integrated Spring / Docker tooling.</li>
<li><strong>Terminal Integration:</strong> Launched instantly from terminal via <code>idea .</code> or <code>idea /path/to/module</code>.</li>
</ul>
<h3>2. DataGrip</h3>
<ul>
<li><strong>Primary Domain:</strong> Database development, schema inspection, and SQL optimization.</li>
<li><strong>Why in the 2026 Stack:</strong> Dedicated JetBrains IDE tailored for PostgreSQL, Redis, and Mongo.</li>
<li><strong>Engineering Value:</strong>
<ul>
<li>Analyzing <code>EXPLAIN ANALYZE</code> query execution plans.</li>
<li>Generating and validating Flyway migration scripts.</li>
<li>Real-time table introspection without writing manual CLI queries.</li>
</ul>
</li>
</ul>
<h3>3. Zed (<code>/Applications/Zed.app</code>)</h3>
<ul>
<li><strong>Primary Domain:</strong> High-performance, lightweight editor for rapid scripting, code exploration, and AI-assisted pair programming.</li>
<li><strong>Why in the 2026 Stack:</strong> Written in Rust, boots in 50ms, consumes negligible memory, and features built-in multi-model AI agent servers.</li>
<li><strong>Your Custom Zed Configuration (<code>~/.config/zed/settings.json</code>):</strong>
<ul>
<li><strong>Keymap:</strong> <code>base_keymap: &quot;JetBrains&quot;</code> (familiar muscle memory).</li>
<li><strong>Modal Editing:</strong> <code>vim_mode: true</code> (full Vim motions).</li>
<li><strong>AI Proxy:</strong> Integrated with <code>TopToppyOmniRoute</code> (routing to Claude Opus 4.6 Thinking, Claude Sonnet 4.6, Gemini 3.5/3.1, GPT-5.6 Luna).</li>
<li><strong>MCP Servers:</strong> Integrated with Context7 MCP and browser tools.</li>
<li><strong>Agent Servers:</strong> Configured with <code>antigravity-acp</code> and <code>codex-acp</code>.</li>
</ul>
</li>
</ul>
<h3>4. Neovim &amp; Vim (<code>~/.config/nvim/init.lua</code>, <code>~/.vimrc</code>)</h3>
<ul>
<li><strong>Primary Domain:</strong> In-terminal quick edits, remote SSH sessions, configuration management, and Git commit messages.</li>
<li><strong>Why in the 2026 Stack:</strong> Zero startup overhead; stays inside the existing Ghostty / Herdr tab.</li>
<li><strong>Your Neovim Highlights:</strong>
<ul>
<li>Space-leader shortcuts: <code>&lt;Space&gt;ff</code> (Telescope file find), <code>&lt;Space&gt;fg</code> (Live grep), <code>&lt;Space&gt;e</code> (Neo-tree file tree).</li>
<li>Fast text objects: <code>ysiw&quot;</code> (surround word), <code>cs&quot;''</code> (change quote types), <code>gcc</code> (instant line comment).</li>
<li>Reference: <a href="/posts/neovim-usage">Neovim in Real-Life Engineering</a> and <a href="/posts/vim-usage">Vim Usage Reference</a>.</li>
</ul>
</li>
</ul>
<hr />
<h2>5. Supporting Modern Utilities (&quot;etc&quot;)</h2>
<table>
<thead>
<tr>
<th align="left">Tool</th>
<th align="left">Category</th>
<th align="left">Role &amp; Engineering Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong>OrbStack</strong></td>
<td align="left">Virtualization</td>
<td align="left">Super-fast, lightweight replacement for Docker Desktop on macOS. Instant container startup, zero battery drain, and native Linux VM support.</td>
</tr>
<tr>
<td align="left"><strong>Bruno</strong></td>
<td align="left">API Testing</td>
<td align="left">Fast, offline-first Git-friendly API client (replacing Postman). Saves API collections as plain <code>.bru</code> files right inside repositories (<code>bruno/</code>).</td>
</tr>
<tr>
<td align="left"><strong>Mise</strong></td>
<td align="left">Runtimes</td>
<td align="left">Single polyglot version manager replacing <code>nvm</code>, <code>rbenv</code>, <code>sdkman</code>, and <code>fvm</code>. Controlled via <code>mise.toml</code>.</td>
</tr>
<tr>
<td align="left"><strong>1Password CLI (<code>op</code>)</strong></td>
<td align="left">Secrets</td>
<td align="left">Zero-trust credential injection (<code>op run -- opencode</code>). Keeps tokens out of dotfiles and bash history.</td>
</tr>
<tr>
<td align="left"><strong>thefuck (<code>fuck</code> / <code>wtf</code>)</strong></td>
<td align="left">CLI Helper</td>
<td align="left">Instant auto-correction for mistyped terminal commands.</td>
</tr>
<tr>
<td align="left"><strong>lazygit</strong></td>
<td align="left">Git TUI</td>
<td align="left">Terminal visual interface for interactive rebasing, staging partial hunks, and inspecting diffs.</td>
</tr>
<tr>
<td align="left"><strong>Modern CLI Replacements</strong></td>
<td align="left">CLI Suite</td>
<td align="left"><code>eza</code> (modern <code>ls</code>), <code>bat</code> (syntax <code>cat</code>), <code>ripgrep</code> (<code>rg</code>), <code>fd</code> (fast <code>find</code>), and <code>btop</code> (resource monitor).</td>
</tr>
</tbody>
</table>
<hr />
<h2>6. The 2026 Daily Engineering Loop</h2>
<p>How all tools interact smoothly throughout a typical engineering workday:</p>
<ol>
<li><strong>Morning Kickoff &amp; Workspace Launch:</strong>
<ul>
<li>Press hotkey to invoke <strong>Raycast</strong> $\rightarrow$ open <strong>Ghostty</strong> and <strong>Obsidian</strong>.</li>
<li>Check sprint notes and Jira backlog in <strong>Obsidian</strong>.</li>
</ul>
</li>
<li><strong>Branching &amp; Setup:</strong>
<ul>
<li>In Ghostty: <code>zd ledger</code> (zoxide jumps straight to project).</li>
<li><code>git switch master &amp;&amp; git pull --rebase</code> $\rightarrow$ <code>git switch -c feat/CORE-xxx</code>.</li>
<li>Run <code>idea .</code> to spin up IntelliJ IDEA for the main Kotlin service.</li>
</ul>
</li>
<li><strong>Deep Implementation &amp; Telemetry:</strong>
<ul>
<li>Code core business logic in IntelliJ; inspect database queries and schema in <strong>DataGrip</strong>.</li>
<li>Run <code>./gradlew test</code> in terminal $\rightarrow$ glance at <strong>RunCat Neo</strong> in the menu bar to verify CPU throttle state and test completion.</li>
<li>Test endpoints with <strong>Bruno</strong> (saved in <code>bruno/</code> directory for PR review).</li>
</ul>
</li>
<li><strong>Agentic Delegation &amp; Parallel Tasks:</strong>
<ul>
<li>Launch <strong>Herdr</strong> or <strong>Zed</strong> to run autonomous agent workflows in isolated worktrees while you continue reviewing architecture.</li>
</ul>
</li>
<li><strong>Clean Commits &amp; Documentation:</strong>
<ul>
<li>Check dirty state with <code>gst</code>.</li>
<li>Stage by layer: <code>git add domain/</code> $\rightarrow$ <code>git commit -m &quot;feat(...): ...&quot;</code> $\rightarrow$ <code>gp</code> (or <code>gpf</code>).</li>
<li>Sync findings, ADRs, or meeting notes back to <strong>Obsidian</strong> using <code>obsidian-cli</code>.</li>
</ul>
</li>
</ol>
<hr />
<h2>7. Related Notes</h2>
<ul>
<li><a href="/posts/tools-index">Developer Tools Index</a></li>
<li><a href="/posts/git-real-life-engineering">Git in Real-Life Engineering</a></li>
<li><a href="/posts/zsh-real-life-engineering">Zsh &amp; Terminal in Real-Life Engineering</a></li>
<li><a href="/posts/mac-terminal-setup">Mac Terminal Setup &amp; Movement Shortcuts</a></li>
<li><a href="/posts/neovim-usage">Neovim in Real-Life Engineering</a></li>
<li><a href="/posts/raycast-mac">Raycast: ตัวช่วยทำงานบน Mac</a></li>
<li><a href="/posts/opencode-atlassian-mcp-with-mise-and-1password">OpenCode Atlassian MCP with Mise and 1Password</a></li>
</ul>
', 'PUBLISHED', '2026-10-28 00:00:00+00', '2026-10-28 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 68: Neovim Usage
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (68, 1, FALSE, FALSE, '2026-07-16 00:00:00+00', '2026-07-16 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (68, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (68, 20) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (68, 21) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (68, 50) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (68, 48) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    68, 68, 'en', 'neovim-usage', 'Neovim Usage', 'A practical guide to Neovim based on your custom ~/.config/nvim/init.lua configuration: space-leader navigation, Telescope fuzzy search, Neo-tree explorer, and rapid modal editing.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"A practical guide to Neovim based on your custom ~/.config/nvim/init.lua configuration: space-leader navigation, Telescope fuzzy search, Neo-tree explorer, and rapid modal editing."}]}]}', '<h1>Neovim in Real-Life Engineering</h1>
<p>A practical guide to Neovim based on your custom <code>~/.config/nvim/init.lua</code> configuration: space-leader navigation, Telescope fuzzy search, Neo-tree explorer, and rapid modal editing.</p>
<blockquote>
<p><strong>TIP</strong>: &gt; For classic Vim (<code>~/.vimrc</code>), see <a href="/posts/vim-usage">Vim Usage</a>. For beginners learning motions and grammar from scratch, see <a href="/posts/learn-vim-neovim">Learn Vim and Neovim</a>.</p>
</blockquote>
<hr />
<h2>1. When Engineers Use Neovim vs IntelliJ IDEA</h2>
<table>
<thead>
<tr>
<th align="left">Task / Scenario</th>
<th align="center">Recommended Editor</th>
<th align="left">Why</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Full Kotlin microservice development, Spring Boot, complex refactoring, running test suites</td>
<td align="center"><strong>IntelliJ IDEA</strong> (<code>idea .</code>)</td>
<td align="left">Full semantic AST indexing, type inference, debugger, and Gradle integration.</td>
</tr>
<tr>
<td align="left">Quick config edits (<code>~/.zshrc</code>, <code>Dockerfile</code>, <code>docker-compose.yml</code>, <code>design.md</code>)</td>
<td align="center"><strong>Neovim</strong> (<code>nvim &lt;file&gt;</code>)</td>
<td align="left">Zero startup latency; opens instantly without heavy project indexing.</td>
</tr>
<tr>
<td align="left">Terminal-first scratch work &amp; Git commit editing</td>
<td align="center"><strong>Neovim</strong></td>
<td align="left">Stays right inside your terminal multiplexer/Ghostty tab.</td>
</tr>
<tr>
<td align="left">Searching across project files from CLI</td>
<td align="center"><strong>Neovim</strong> (<code>nvim .</code>)</td>
<td align="left">Blazing fast fuzzy search with Telescope.</td>
</tr>
</tbody>
</table>
<hr />
<h2>2. Leader Key Shortcuts (<code>&lt;Space&gt;</code>)</h2>
<p>Your leader key is set to <strong><code>Space</code></strong>:</p>
<table>
<thead>
<tr>
<th align="left">Keybinding</th>
<th align="left">Action</th>
<th align="left">Real-Life Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><strong><code>&lt;Space&gt;ff</code></strong></td>
<td align="left"><code>Telescope find_files</code></td>
<td align="left">Fuzzy find any file in project by name.</td>
</tr>
<tr>
<td align="left"><strong><code>&lt;Space&gt;fg</code></strong></td>
<td align="left"><code>Telescope live_grep</code></td>
<td align="left">Live regex/text search across all files in repository (ripgrep speed).</td>
</tr>
<tr>
<td align="left"><strong><code>&lt;Space&gt;fb</code></strong></td>
<td align="left"><code>Telescope buffers</code></td>
<td align="left">Switch between currently open buffers/tabs.</td>
</tr>
<tr>
<td align="left"><strong><code>&lt;Space&gt;e</code></strong></td>
<td align="left"><code>Neotree toggle</code></td>
<td align="left">Open/close side file explorer tree.</td>
</tr>
<tr>
<td align="left"><strong><code>&lt;Space&gt;w</code></strong></td>
<td align="left"><code>:write</code></td>
<td align="left">Save current file with thumb on spacebar + <code>w</code>.</td>
</tr>
<tr>
<td align="left"><strong><code>&lt;Space&gt;q</code></strong></td>
<td align="left"><code>:quit</code></td>
<td align="left">Quit window without typing <code>:q&lt;CR&gt;</code>.</td>
</tr>
<tr>
<td align="left"><strong><code>&lt;Space&gt;h</code></strong></td>
<td align="left"><code>:nohlsearch</code></td>
<td align="left">Clear bright yellow search highlights after a search.</td>
</tr>
</tbody>
</table>
<hr />
<h2>3. High-Speed Editing Workflows</h2>
<h3>1. Surrounding Text (<code>vim-surround</code>)</h3>
<p>Manipulate quotes, brackets, and parentheses effortlessly:</p>
<ul>
<li><strong>Wrap word in quotes:</strong> Cursor on <code>user</code> $\rightarrow$ type <code>ysiw&quot;</code> $\rightarrow$ <code>&quot;user&quot;</code></li>
<li><strong>Change double quotes to single:</strong> Cursor inside <code>&quot;hello&quot;</code> $\rightarrow$ type <code>cs&quot;''</code> $\rightarrow$ <code>''hello''</code></li>
<li><strong>Delete surrounding parentheses:</strong> Cursor inside <code>(result)</code> $\rightarrow$ type <code>ds(</code> $\rightarrow$ <code>result</code></li>
<li><strong>Wrap visual selection:</strong> Select text with <code>v</code> $\rightarrow$ type <code>S&quot;</code> $\rightarrow$ wraps selection in <code>&quot;</code></li>
</ul>
<h3>2. Fast Commenting (<code>Comment.nvim</code>)</h3>
<ul>
<li><strong>Toggle single line:</strong> <code>gcc</code> (comments or uncomments current line).</li>
<li><strong>Toggle block:</strong> Select lines in visual mode (<code>V</code>) $\rightarrow$ press <code>gc</code>.</li>
</ul>
<h3>3. Text Object Replacements</h3>
<ul>
<li><strong><code>ciw</code></strong>: Change inside word (deletes current word and enters Insert mode).</li>
<li><strong><code>ci&quot;</code></strong>: Change inside quotes (deletes content between quotes).</li>
<li><strong><code>ci(</code></strong>: Change inside parentheses.</li>
<li><strong><code>c$</code></strong>: Change from cursor to end of line.</li>
<li><strong><code>.</code></strong>: Repeat last edit command immediately.</li>
</ul>
<hr />
<h2>4. Navigation &amp; Splits</h2>
<h3>Movement Essentials</h3>
<ul>
<li><code>w</code> / <code>b</code>: Hop forward / backward by word.</li>
<li><code>0</code> / <code>$</code>: Jump to beginning / end of line.</li>
<li><code>gg</code> / <code>G</code>: Jump to very top / very bottom of file.</li>
<li><code>Ctrl + d</code> / <code>Ctrl + u</code>: Scroll half-page down / up.</li>
</ul>
<h3>Window Splits</h3>
<ul>
<li><code>:vsplit</code> (or <code>:vs</code>): Split vertically (opens on right).</li>
<li><code>:split</code> (or <code>:sp</code>): Split horizontally (opens below).</li>
<li><code>Ctrl + w</code> followed by <code>h</code> / <code>j</code> / <code>k</code> / <code>l</code>: Move focus between split windows.</li>
</ul>
<hr />
<h2>5. Configuration Architecture</h2>
<ul>
<li><strong>Main Config:</strong> <code>~/.config/nvim/init.lua</code></li>
<li><strong>Plugin Manager:</strong> <code>lazy.nvim</code> (<code>:Lazy</code>, <code>:Lazy update</code>, <code>:Lazy clean</code>)</li>
<li><strong>Fuzzy Finder:</strong> <code>telescope.nvim</code></li>
<li><strong>File Explorer:</strong> <code>neo-tree.nvim</code></li>
<li><strong>Syntax &amp; Indent:</strong> <code>nvim-treesitter</code></li>
<li><strong>Statusline:</strong> <code>lualine.nvim</code></li>
<li><strong>LSP &amp; Diagnostics:</strong> <code>nvim-lspconfig</code></li>
</ul>
', 'PUBLISHED', '2026-07-16 00:00:00+00', '2026-07-16 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 69: OpenCode Atlassian MCP with Mise and 1Password
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (69, 1, FALSE, FALSE, '2026-07-14 00:00:00+00', '2026-07-14 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (69, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (69, 51) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (69, 25) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (69, 52) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (69, 53) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (69, 54) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (69, 55) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    69, 69, 'en', 'opencode-atlassian-mcp-with-mise-and-1password', 'OpenCode Atlassian MCP with Mise and 1Password', 'OpenCode stops searching for project configuration at the nearest Git root. A shared opencode.json above several sibling Git repositories is therefore not discovered automatically.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"OpenCode stops searching for project configuration at the nearest Git root. A shared opencode.json above several sibling Git repositories is therefore not discovered automatically."}]}]}', '<h1>OpenCode Atlassian MCP with Mise and 1Password</h1>
<h2>Summary</h2>
<p>OpenCode stops searching for project configuration at the nearest Git root. A shared <code>opencode.json</code> above several sibling Git repositories is therefore not discovered automatically.</p>
<p>Use Mise to provide a directory-scoped <code>OPENCODE_CONFIG</code>, and use 1Password CLI to resolve Atlassian credentials only when OpenCode starts.</p>
<h2>File Layout</h2>
<pre><code class="language-text">/Users/toptoppy/works/jago/
├── mise.toml
├── opencode.json
├── engagement-platform-engine/
└── other-jago-repositories/
</code></pre>
<p>Mise walks through parent directories independently of Git boundaries, so repositories below the Jago directory inherit <code>mise.toml</code>.</p>
<h2>1Password Item</h2>
<p>Create one <strong>API Credential</strong> item:</p>
<table>
<thead>
<tr>
<th>Property</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<td>Vault</td>
<td><code>Jago</code></td>
</tr>
<tr>
<td>Item</td>
<td><code>Atlassian MCP</code></td>
</tr>
<tr>
<td>Username field</td>
<td>Atlassian email address</td>
</tr>
<tr>
<td>Credential field</td>
<td>Rotated Atlassian API token</td>
</tr>
<tr>
<td>Website</td>
<td><code>https://bankjago.atlassian.net</code></td>
</tr>
</tbody>
</table>
<p>Secret references:</p>
<pre><code class="language-text">op://Jago/Atlassian MCP/username
op://Jago/Atlassian MCP/credential
</code></pre>
<p>The references identify fields but do not contain the credential values.</p>
<h2>Mise Configuration</h2>
<p>File: <code>/Users/toptoppy/works/jago/mise.toml</code></p>
<pre><code class="language-toml">[env]
OPENCODE_CONFIG = &quot;{{config_root}}/opencode.json&quot;
JIRA_USERNAME = &quot;op://Jago/Atlassian MCP/username&quot;
JIRA_API_TOKEN = &quot;op://Jago/Atlassian MCP/credential&quot;
</code></pre>
<p>Trust the configuration once:</p>
<pre><code class="language-bash">mise trust /Users/toptoppy/works/jago/mise.toml
</code></pre>
<p>Mise must be activated in Zsh:</p>
<pre><code class="language-zsh">command -v mise &gt;/dev/null 2&gt;&amp;1 &amp;&amp; eval &quot;$(mise activate zsh)&quot;
</code></pre>
<p>See <a href="/posts/zsh-config">zsh-config</a>.</p>
<h2>OpenCode Configuration</h2>
<p>File: <code>/Users/toptoppy/works/jago/opencode.json</code></p>
<pre><code class="language-json">{
  &quot;$schema&quot;: &quot;https://opencode.ai/config.json&quot;,
  &quot;mcp&quot;: {
    &quot;mcp-atlassian&quot;: {
      &quot;type&quot;: &quot;local&quot;,
      &quot;command&quot;: [&quot;uvx&quot;, &quot;mcp-atlassian&quot;],
      &quot;enabled&quot;: true,
      &quot;environment&quot;: {
        &quot;JIRA_URL&quot;: &quot;https://bankjago.atlassian.net&quot;,
        &quot;JIRA_USERNAME&quot;: &quot;{env:JIRA_USERNAME}&quot;,
        &quot;JIRA_API_TOKEN&quot;: &quot;{env:JIRA_API_TOKEN}&quot;,
        &quot;CONFLUENCE_URL&quot;: &quot;https://bankjago.atlassian.net/wiki&quot;,
        &quot;CONFLUENCE_USERNAME&quot;: &quot;{env:JIRA_USERNAME}&quot;,
        &quot;CONFLUENCE_API_TOKEN&quot;: &quot;{env:JIRA_API_TOKEN}&quot;
      }
    }
  }
}
</code></pre>
<p>Do not put the resolved token in this file.</p>
<h2>Runtime Flow</h2>
<ol>
<li>Mise finds the parent <code>mise.toml</code> and sets <code>OPENCODE_CONFIG</code>.</li>
<li>Mise sets <code>JIRA_USERNAME</code> and <code>JIRA_API_TOKEN</code> to <code>op://</code> references.</li>
<li><code>op run</code> authenticates with 1Password and resolves those references.</li>
<li>OpenCode expands <code>{env:JIRA_USERNAME}</code> and <code>{env:JIRA_API_TOKEN}</code>.</li>
<li>OpenCode passes the resolved values to the Atlassian MCP child process.</li>
</ol>
<p>The token exists temporarily in the OpenCode and MCP process environments, but it is not stored in the Mise or OpenCode files.</p>
<h2>Launch</h2>
<p>From any repository below <code>/Users/toptoppy/works/jago</code>:</p>
<pre><code class="language-bash">op run -- opencode
</code></pre>
<p>Use this form if Mise shell activation has not refreshed the current terminal:</p>
<pre><code class="language-bash">mise exec -- op run -- opencode
</code></pre>
<p>Plain <code>opencode</code> does not resolve <code>op://</code> references.</p>
<h2>Verification</h2>
<p>Confirm 1Password can access the credential without displaying it:</p>
<pre><code class="language-bash">op read &quot;op://Jago/Atlassian MCP/credential&quot; &gt;/dev/null
</code></pre>
<p>Confirm the inherited OpenCode MCP configuration:</p>
<pre><code class="language-bash">mise exec -- op run -- opencode mcp list
</code></pre>
<p>If 1Password waits for authentication:</p>
<ol>
<li>Unlock the 1Password desktop app.</li>
<li>Open <strong>Settings &gt; Developer</strong>.</li>
<li>Enable <strong>Integrate with 1Password CLI</strong>.</li>
<li>Run <code>op vault list</code> and approve the authentication prompt.</li>
</ol>
<h2>Security</h2>
<ul>
<li>Revoke any token previously stored in plaintext before using this setup.</li>
<li>Store only a newly rotated token in 1Password.</li>
<li>Never paste the resolved token into notes, configuration, logs, or chat.</li>
<li>Prefer <code>op run</code> over <code>op read</code> because <code>op read</code> prints the secret unless its output is redirected.</li>
<li>Restart OpenCode after changing configuration because OpenCode loads configuration at startup.</li>
</ul>
<h2>Related</h2>
<ul>
<li><a href="/posts/zsh-config">zsh-config</a></li>
<li>anytype-mcp</li>
<li><a href="https://opencode.ai/docs/config/">OpenCode configuration</a></li>
<li><a href="https://opencode.ai/docs/mcp-servers/">OpenCode MCP servers</a></li>
<li><a href="https://developer.1password.com/docs/cli/secret-references/">1Password secret references</a></li>
<li><a href="https://mise.jdx.dev/environments/">Mise environments</a></li>
</ul>
', 'PUBLISHED', '2026-07-14 00:00:00+00', '2026-07-14 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 70: Raycast: ตัวช่วยทำงานบน Mac ให้เร็วขึ้นในไม่กี่วินาที
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (70, 1, FALSE, FALSE, '2026-06-23 00:00:00+00', '2026-06-23 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (70, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    70, 70, 'th', 'raycast-mac', 'Raycast: ตัวช่วยทำงานบน Mac ให้เร็วขึ้นในไม่กี่วินาที', 'ถ้าคุณใช้ Mac ทุกวันและรู้สึกว่าการสลับแอป ค้นหาไฟล์ เปิดเว็บ หรือสั่งงานเล็ก ๆ ซ้ำไปซ้ำมาเริ่มกินเวลา Raycast เป็นหนึ่งในเครื่องมือที่ควรลองอย่างจริงจัง Raycast คือ command launcher สำหรับ ...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"ถ้าคุณใช้ Mac ทุกวันและรู้สึกว่าการสลับแอป ค้นหาไฟล์ เปิดเว็บ หรือสั่งงานเล็ก ๆ ซ้ำไปซ้ำมาเริ่มกินเวลา Raycast เป็นหนึ่งในเครื่องมือที่ควรลองอย่างจริงจัง Raycast คือ command launcher สำหรับ ..."}]}]}', '<h1>Raycast: ตัวช่วยทำงานบน Mac ให้เร็วขึ้นในไม่กี่วินาที</h1>
<p>ถ้าคุณใช้ Mac ทุกวันและรู้สึกว่าการสลับแอป ค้นหาไฟล์ เปิดเว็บ หรือสั่งงานเล็ก ๆ ซ้ำไปซ้ำมาเริ่มกินเวลา Raycast เป็นหนึ่งในเครื่องมือที่ควรลองอย่างจริงจัง
Raycast คือ command launcher สำหรับ macOS ที่ช่วยให้คุณเรียกคำสั่งต่าง ๆ ได้จากคีย์บอร์ดแทบทั้งหมด แทนที่จะคลิกหลายขั้นตอน คุณกด shortcut แล้วพิมพ์สิ่งที่ต้องการ เช่น เปิดแอป คำนวณ แปลงหน่วย ค้นหา clipboard history จัดการ window หรือเรียกใช้ workflow ส่วนตัว</p>
<h2>ทำไม Raycast ถึงน่าใช้</h2>
<h3>1. เร็วกว่า workflow แบบเดิม</h3>
<p>งานเล็ก ๆ อย่างเปิดแอป ค้นหาไฟล์ สร้าง reminder หรือเปิดลิงก์ที่ใช้บ่อย ไม่จำเป็นต้องผ่านเมาส์หลายครั้ง Raycast ทำให้หลายอย่างจบในไม่กี่ keystrokes</p>
<h3>2. มี Extension ให้ต่อยอดเยอะ</h3>
<p>Raycast มี Extension Store ที่เชื่อมกับเครื่องมือยอดนิยมจำนวนมาก เช่น GitHub, Google Translate, Notion, Linear, Jira, Spotify และอีกหลายบริการ เหมาะมากสำหรับคนที่ทำงานกับหลายแอปทั้งวัน</p>
<h3>3. Clipboard History ใช้งานจริงทุกวัน</h3>
<p>หนึ่งในฟีเจอร์ที่ใช้แล้วติดคือ clipboard history คุณสามารถย้อนกลับไปเลือกข้อความ ลิงก์ หรือข้อมูลที่เคย copy ไว้ได้ทันที ลดปัญหา copy ทับแล้วต้องกลับไปหาใหม่</p>
<h3>4. จัดการหน้าต่างได้โดยไม่ต้องลงแอปเพิ่ม</h3>
<p>Raycast ช่วยย้ายและปรับขนาดหน้าต่าง เช่น แบ่งครึ่งจอ ขยายเต็มจอ หรือย้ายไปอีก monitor ได้จากคีย์บอร์ด ทำให้ desktop เป็นระเบียบขึ้นโดยไม่ต้องลากหน้าต่างเองตลอดเวลา</p>
<h3>5. เหมาะกับคนที่ชอบ automation</h3>
<p>ถ้าคุณชอบปรับ workflow ให้เข้ากับตัวเอง Raycast รองรับ script commands และ custom workflows ทำให้คุณสร้างคำสั่งเฉพาะทางได้ เช่น เปิดชุดเว็บที่ใช้ตอนเริ่มงาน เรียก API ภายใน หรือจัดการไฟล์ซ้ำ ๆ</p>
<h2>เหมาะกับใคร</h2>
<ul>
<li>คนทำงานบน Mac เป็นหลัก</li>
<li>Developer, designer, product manager, writer หรือคนที่สลับแอปบ่อย</li>
<li>คนที่อยากลดการใช้เมาส์และทำงานจากคีย์บอร์ดมากขึ้น</li>
<li>คนที่ชอบปรับ workflow ให้เร็วและเป็นระบบ</li>
</ul>
<h2>เริ่มต้นยังไงดี</h2>
<p>หลังติดตั้ง ลองเริ่มจากฟีเจอร์พื้นฐานก่อน เช่น App Launcher, Clipboard History, Window Management และ Quicklinks จากนั้นค่อยเพิ่ม extensions ที่ตรงกับเครื่องมือที่คุณใช้จริง
ถ้าอยากลอง Raycast สามารถสมัครหรือดาวน์โหลดได้ที่ลิงก์นี้:
<a href="https://raycast.com/?via=ttpafa-231">https://raycast.com/?via=ttpafa-231</a>
หมายเหตุ: ลิงก์ด้านบนเป็น affiliate link หากสมัครผ่านลิงก์นี้ เจ้าของลิงก์อาจได้รับผลตอบแทน โดยไม่มีค่าใช้จ่ายเพิ่มเติมกับผู้สมัคร</p>
<h2>สรุป</h2>
<p>Raycast ไม่ใช่แค่แอปเปิดโปรแกรม แต่เป็นศูนย์กลางเล็ก ๆ สำหรับควบคุมงานประจำวันบน Mac ถ้าคุณใช้ macOS และอยากทำงานให้เร็วขึ้นโดยไม่ต้องเปลี่ยนเครื่องมือหลักทั้งหมด Raycast เป็นตัวเลือกที่คุ้มค่ากับการลอง</p>
', 'PUBLISHED', '2026-06-23 00:00:00+00', '2026-06-23 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 71: Developer Tools Index
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (71, 1, FALSE, FALSE, '2026-06-06 00:00:00+00', '2026-06-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (71, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (71, 30) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (71, 56) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (71, 49) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    71, 71, 'en', 'tools-index', 'Developer Tools Index', 'Central navigation hub for local development tooling, shell environments, editors, Git workflows, and system utilities.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Central navigation hub for local development tooling, shell environments, editors, Git workflows, and system utilities."}]}]}', '<h1>Developer Tools &amp; Environment Index</h1>
<p>Central navigation hub for local development tooling, shell environments, editors, Git workflows, and system utilities.</p>
<hr />
<h2>0. Master Environment Stack</h2>
<ul>
<li><a href="/posts/macos-tools-stack-2026">macOS Developer Tools &amp; Engineering Stack (Late 2026)</a> — The comprehensive overview of the full personal macOS development environment: Raycast, Ghostty, RunCat, Vorssaint, Herdr, Obsidian, Zoxide, fzf, Zsh, IntelliJ IDEA, DataGrip, Zed, Vim, OrbStack, and Bruno.</li>
</ul>
<hr />
<h2>1. Git &amp; Version Control</h2>
<ul>
<li><a href="/posts/git-real-life-engineering">Git in Real-Life Engineering</a> — The complete engineering guide: multi-module scoped staging, clean rebase trunk sync, Conventional Commits, soft resets, and safe remote publishing (<code>--force-with-lease</code>).</li>
<li><a href="/posts/git-basics">Git Basics &amp; Setup</a> — Initial repository cloning, global identities, basic branching, and fundamental operations.</li>
</ul>
<hr />
<h2>2. Shell &amp; Terminal Ergonomics</h2>
<ul>
<li><a href="/posts/zsh-real-life-engineering">Zsh &amp; Terminal in Real-Life Engineering</a> — High-frequency aliases (<code>gst</code>, <code>ggu</code>, <code>gp</code>), <code>zoxide</code> directory jumping (<code>zd</code>), smart package management (<code>pm</code>), bare dotfiles, and interactive substring history search.</li>
<li><a href="/posts/zsh-config">Zsh Config Reference</a> — <code>.zshrc</code> and <code>.zprofile</code> architecture, PATH management, Mise runtime integration, and the Jovial prompt theme.</li>
<li><a href="/posts/mac-terminal-setup">Mac Terminal Setup &amp; Movement Shortcuts</a> — Option-as-Meta configuration, essential Readline shortcuts (<code>Ctrl+A</code>/<code>E</code>, <code>Opt+B</code>/<code>F</code>, <code>Ctrl+W</code>/<code>U</code>, <code>Opt+.</code>), Ghostty, and iTerm2 split panes.</li>
</ul>
<hr />
<h2>3. Code Editors &amp; IDEs</h2>
<ul>
<li><a href="/posts/neovim-usage">Neovim in Real-Life Engineering</a> — Space-leader shortcuts (<code>&lt;Space&gt;ff</code> Telescope find, <code>&lt;Space&gt;fg</code> live grep, <code>&lt;Space&gt;e</code> Neo-tree), surround editing, and fast CLI scratchpad workflows.</li>
<li><a href="/posts/vim-usage">Vim Usage Reference</a> — Classic Vim reference for <code>~/.vimrc</code>, NERDTree, and <code>vim-plug</code>.</li>
<li><a href="/posts/learn-vim-neovim">Learn Vim and Neovim</a> — Core modal editing grammar, motions (<code>ciw</code>, <code>d$</code>, <code>.</code>), and learning roadmap.</li>
</ul>
<hr />
<h2>4. Automation, AI &amp; Integrations</h2>
<ul>
<li><a href="/posts/opencode-atlassian-mcp-with-mise-and-1password">OpenCode Atlassian MCP with Mise and 1Password</a> — Secure enterprise MCP setup resolving Jira and Confluence tokens directly through 1Password CLI and Mise.</li>
<li><a href="/posts/raycast-mac">Raycast: ตัวช่วยทำงานบน Mac</a> — macOS keyboard-driven productivity launcher, window management, and custom script commands.</li>
<li><a href="/posts/docker">Docker</a> — Containerization concepts, images, and container lifecycles.</li>
</ul>
', 'PUBLISHED', '2026-06-06 00:00:00+00', '2026-06-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 72: Vim Usage
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (72, 1, FALSE, FALSE, '2026-07-16 00:00:00+00', '2026-07-16 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (72, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (72, 21) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (72, 50) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    72, 72, 'en', 'vim-usage', 'Vim Usage', 'Reference guide for classic Vim configured via ~/.vimrc and ~/.vim/plugins.vim using vim-plug.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Reference guide for classic Vim configured via ~/.vimrc and ~/.vim/plugins.vim using vim-plug."}]}]}', '<h1>Vim Usage Reference</h1>
<p>Reference guide for classic Vim configured via <code>~/.vimrc</code> and <code>~/.vim/plugins.vim</code> using <code>vim-plug</code>.</p>
<blockquote>
<p><strong>TIP</strong>: &gt; For modern Neovim with Telescope, Treesitter, and Neo-tree, see <a href="/posts/neovim-usage">Neovim in Real-Life Engineering</a>. For beginner learning motions, see <a href="/posts/learn-vim-neovim">Learn Vim and Neovim</a>.</p>
</blockquote>
<hr />
<h2>1. Quick Configured Keybindings</h2>
<p>Leader key is configured as <strong><code>&lt;Space&gt;</code></strong>:</p>
<table>
<thead>
<tr>
<th align="left">Key</th>
<th align="left">Action</th>
<th align="left">Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>&lt;Space&gt;w</code></td>
<td align="left"><code>:write</code></td>
<td align="left">Fast file save.</td>
</tr>
<tr>
<td align="left"><code>&lt;Space&gt;q</code></td>
<td align="left"><code>:quit</code></td>
<td align="left">Close window.</td>
</tr>
<tr>
<td align="left"><code>&lt;Space&gt;h</code></td>
<td align="left"><code>:nohlsearch</code></td>
<td align="left">Clear search highlight.</td>
</tr>
<tr>
<td align="left"><code>#5</code></td>
<td align="left"><code>:NERDTreeToggle</code></td>
<td align="left">Toggle NERDTree file explorer sidebar.</td>
</tr>
<tr>
<td align="left"><code>gcc</code></td>
<td align="left"><code>vim-commentary</code></td>
<td align="left">Comment or uncomment current line.</td>
</tr>
</tbody>
</table>
<hr />
<h2>2. Core Editing &amp; Movements</h2>
<table>
<thead>
<tr>
<th align="left">Key</th>
<th align="left">Action</th>
<th align="left">Key</th>
<th align="left">Action</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>h</code> <code>j</code> <code>k</code> <code>l</code></td>
<td align="left">Left, Down, Up, Right</td>
<td align="left"><code>w</code> / <code>b</code></td>
<td align="left">Next / previous word</td>
</tr>
<tr>
<td align="left"><code>0</code> / <code>$</code></td>
<td align="left">Start / end of line</td>
<td align="left"><code>gg</code> / <code>G</code></td>
<td align="left">Top / bottom of file</td>
</tr>
<tr>
<td align="left"><code>i</code> / <code>a</code></td>
<td align="left">Insert before / after cursor</td>
<td align="left"><code>o</code> / <code>O</code></td>
<td align="left">New line below / above</td>
</tr>
<tr>
<td align="left"><code>dd</code></td>
<td align="left">Delete (cut) line</td>
<td align="left"><code>yy</code> / <code>p</code></td>
<td align="left">Copy (yank) / paste line</td>
</tr>
<tr>
<td align="left"><code>u</code> / <code>Ctrl+r</code></td>
<td align="left">Undo / redo</td>
<td align="left"><code>.</code></td>
<td align="left">Repeat last action</td>
</tr>
</tbody>
</table>
<hr />
<h2>3. Search &amp; Splits</h2>
<ul>
<li><code>/search-term</code>: Search forward (smartcase enabled: lowercase is case-insensitive, capitalized is case-sensitive).</li>
<li><code>n</code> / <code>N</code>: Next / previous match.</li>
<li><code>:split</code>: Open horizontal split (opens below).</li>
<li><code>:vsplit</code>: Open vertical split (opens on right).</li>
<li><code>Ctrl + w</code> + <code>h/j/k/l</code>: Move focus between windows.</li>
</ul>
<hr />
<h2>4. Plugins &amp; Config Files</h2>
<ul>
<li>Main config: <code>~/.vimrc</code></li>
<li>Plugin list: <code>~/.vim/plugins.vim</code></li>
<li>Plugin directory: <code>~/.vim/plugged</code></li>
<li>Plugin management: <code>:PlugInstall</code>, <code>:PlugUpdate</code>, <code>:PlugClean</code></li>
</ul>
', 'PUBLISHED', '2026-07-16 00:00:00+00', '2026-07-16 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 73: Zsh Config
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (73, 1, FALSE, FALSE, '2026-07-11 00:00:00+00', '2026-07-11 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (73, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (73, 22) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (73, 57) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (73, 44) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (73, 58) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    73, 73, 'en', 'zsh-config', 'Zsh Config', 'Main reference for Zsh shell startup files, PATH handling, plugins, custom functions, and the Jovial prompt theme.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Main reference for Zsh shell startup files, PATH handling, plugins, custom functions, and the Jovial prompt theme."}]}]}', '<h1>Zsh Config Reference</h1>
<p>Main reference for Zsh shell startup files, PATH handling, plugins, custom functions, and the Jovial prompt theme.</p>
<blockquote>
<p><strong>TIP</strong>: &gt; For everyday engineering workflows, OMZ aliases (<code>gst</code>, <code>ggu</code>, <code>gp</code>), <code>zoxide</code> directory jumping (<code>zd</code>), smart package manager (<code>pm</code>), and history search ergonomics, see <a href="/posts/zsh-real-life-engineering">Zsh &amp; Terminal in Real-Life Engineering</a>.</p>
</blockquote>
<hr />
<h2>1. Startup Files</h2>
<table>
<thead>
<tr>
<th align="left">File</th>
<th align="left">Purpose</th>
<th align="left">Loaded When</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><code>~/.zshrc</code></td>
<td align="left">Interactive shell configuration: PATH, plugins, aliases, custom functions, prompt theme.</td>
<td align="left">Every interactive terminal window / tab.</td>
</tr>
<tr>
<td align="left"><code>~/.zprofile</code></td>
<td align="left">Login shell configuration: Environment variables, JetBrains Toolbox scripts, OrbStack.</td>
<td align="left">Initial login session.</td>
</tr>
<tr>
<td align="left"><code>~/.zshenv</code></td>
<td align="left">Environment variables exported to all subshells (kept minimal).</td>
<td align="left">All Zsh instances.</td>
</tr>
</tbody>
</table>
<hr />
<h2>2. <code>.zshrc</code> Structure</h2>
<h3>PATH Management</h3>
<p><code>typeset -U</code> ensures deduplication when <code>.zshrc</code> is sourced multiple times:</p>
<pre><code class="language-zsh">typeset -U path PATH
path=(
  &quot;$HOME/.local/bin&quot;
  /opt/homebrew/opt/curl/bin
  /opt/homebrew/bin
  /opt/homebrew/sbin
  &quot;$HOME/go/bin&quot;
  &quot;$HOME/.pub-cache/bin&quot;
  $path
)
</code></pre>
<p>Clean up deprecated version manager paths replaced by <code>mise</code>:</p>
<pre><code class="language-zsh">path=(${path:#${HOME}/.nvm/*})
path=(${path:#${HOME}/.rbenv/*})
path=(${path:#${HOME}/.sdkman/*})
path=(${path:#${HOME}/fvm/*})
path=(${path:#${HOME}/.antigen/*})
</code></pre>
<hr />
<h2>3. Zinit &amp; Oh My Zsh Plugins</h2>
<p>Plugin manager: <a href="https://github.com/zdharma-continuum/zinit">Zinit</a>.</p>
<p>Loading order matters — syntax highlighting must load last:</p>
<pre><code class="language-zsh"># OMZ Libraries
zinit snippet OMZL::git.zsh
zinit snippet OMZL::theme-and-appearance.zsh

# OMZ Plugins
zinit snippet OMZP::git
export ZOXIDE_CMD_OVERRIDE=''zd''
zinit snippet OMZP::zoxide
zinit snippet OMZP::colored-man-pages

# Jovial Theme
zinit light-mode depth=1 multisrc=''*.plugin.zsh'' for zthxxx/jovial

# Interactive Completions &amp; Autosuggestions
zinit ice blockf
zinit light zsh-users/zsh-completions
zinit light zsh-users/zsh-autosuggestions
zinit light zsh-users/zsh-history-substring-search

autoload -Uz compinit &amp;&amp; compinit -C
zinit cdreplay -q

# Syntax highlighting — MUST BE LAST
zinit light zsh-users/zsh-syntax-highlighting
</code></pre>
<hr />
<h2>4. Jovial Prompt Customization</h2>
<pre><code class="language-zsh">JOVIAL_SYMBOL[arrow]=''(≧◡≦) ♡''
JOVIAL_AFFIXES[current-dir]=''%.''
JOVIAL_PALETTE[host]=''%F{8}''
JOVIAL_PALETTE[user]=''%F{197}''
JOVIAL_PALETTE[path]=''%B%F{226}''
JOVIAL_PALETTE[git]=''%F{75}''
JOVIAL_AFFIXES[current-time.dynamic]=''%I:%M:%S %p''
</code></pre>
<hr />
<h2>5. Custom Functions</h2>
<h3><code>pm</code> (Universal Package Manager Runner)</h3>
<p>Auto-detects active lockfile and runs the matching command:</p>
<pre><code class="language-zsh">pm() {
    if [[ -f bun.lockb ]]; then
        command bun &quot;$@&quot;
    elif [[ -f pnpm-lock.yaml ]]; then
        command pnpm &quot;$@&quot;
    elif [[ -f yarn.lock ]]; then
        command yarn &quot;$@&quot;
    elif [[ -f package-lock.json ]]; then
        command npm &quot;$@&quot;
    else
        command pnpm &quot;$@&quot;
    fi
}
</code></pre>
<h3><code>dotfiles</code> (Bare Git Dotfiles Backup)</h3>
<pre><code class="language-zsh">dotfiles() {
  command git --git-dir=&quot;$HOME/.dotfiles&quot; --work-tree=&quot;$HOME&quot; &quot;$@&quot;
}
</code></pre>
<h3><code>npm-artifact-login</code> (Google Artifact Registry)</h3>
<pre><code class="language-zsh">npm-artifact-login() {
  command artifactregistry-auth \
    --repo-config=&quot;${1:-.npmrc}&quot; \
    --credential-config=&quot;$HOME/.npmrc&quot;
}
</code></pre>
<hr />
<h2>6. Version Manager (<code>mise</code>)</h2>
<pre><code class="language-zsh">command -v mise &gt;/dev/null 2&gt;&amp;1 &amp;&amp; eval &quot;$(mise activate zsh)&quot;
</code></pre>
<hr />
<h2>7. Command-Not-Found (<code>thefuck</code>)</h2>
<pre><code class="language-zsh">if command -v thefuck &gt;/dev/null 2&gt;&amp;1; then
  eval &quot;$(thefuck --alias)&quot;
  eval &quot;$(thefuck --alias wtf)&quot;
fi
</code></pre>
<hr />
<h2>8. Related Notes</h2>
<ul>
<li><a href="/posts/zsh-real-life-engineering">Zsh &amp; Terminal in Real-Life Engineering</a></li>
<li><a href="/posts/mac-terminal-setup">Mac Terminal Setup &amp; Movement Shortcuts</a></li>
<li><a href="/posts/git-real-life-engineering">Git in Real-Life Engineering</a></li>
</ul>
', 'PUBLISHED', '2026-07-11 00:00:00+00', '2026-07-11 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 74: Zsh & Terminal in Real-Life Engineering
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (74, 1, FALSE, FALSE, '2026-10-28 00:00:00+00', '2026-10-28 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (74, 11) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (74, 30) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (74, 22) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (74, 44) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (74, 48) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (74, 42) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    74, 74, 'en', 'zsh-real-life-engineering', 'Zsh & Terminal in Real-Life Engineering', 'A practical playbook based on real-world terminal history and production engineering patterns: high-frequency aliases, instant directory navigation with zoxide, smart package manager dispatc...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"A practical playbook based on real-world terminal history and production engineering patterns: high-frequency aliases, instant directory navigation with zoxide, smart package manager dispatc..."}]}]}', '<h1>Zsh &amp; Terminal in Real-Life Engineering</h1>
<p>A practical playbook based on real-world terminal history and production engineering patterns: high-frequency aliases, instant directory navigation with <code>zoxide</code>, smart package manager dispatching, dotfiles backup, and interactive command-line ergonomics.</p>
<blockquote>
<p><strong>NOTE</strong>: &gt; For configuration files, plugin loading order, Mise, and theme settings, see <a href="/posts/zsh-config">Zsh Config Reference</a>.</p>
</blockquote>
<hr />
<h2>1. Top Terminal Commands &amp; Aliases (From Shell History)</h2>
<p>Your most-used commands and custom wrappers ranked by frequency:</p>
<table>
<thead>
<tr>
<th align="center">Frequency</th>
<th align="left">Command</th>
<th align="left">Source</th>
<th align="left">Real-Life Purpose &amp; Scenario</th>
</tr>
</thead>
<tbody>
<tr>
<td align="center"><strong>332×</strong></td>
<td align="left"><code>git</code></td>
<td align="left">Binary</td>
<td align="left">Direct Git invocations (log, rebase, reset, switch).</td>
</tr>
<tr>
<td align="center"><strong>190×</strong></td>
<td align="left"><code>gst</code></td>
<td align="left">OMZ Git Plugin</td>
<td align="left"><code>git status</code> — Instant working tree inspection before and after edits.</td>
</tr>
<tr>
<td align="center"><strong>84×</strong></td>
<td align="left"><code>make</code></td>
<td align="left">Binary</td>
<td align="left">Executing project Makefiles (build, test, docker targets).</td>
</tr>
<tr>
<td align="center"><strong>76×</strong></td>
<td align="left"><code>ggu</code></td>
<td align="left">OMZ Git Plugin</td>
<td align="left"><code>git pull --rebase origin $(current_branch)</code> — Rebase current branch on upstream with 3 keystrokes.</td>
</tr>
<tr>
<td align="center"><strong>47×</strong></td>
<td align="left"><code>zd</code></td>
<td align="left"><code>zoxide</code></td>
<td align="left">Instant fuzzy jump to frequently visited project directories without typing paths.</td>
</tr>
<tr>
<td align="center"><strong>45×</strong></td>
<td align="left"><code>agy</code></td>
<td align="left">CLI</td>
<td align="left">Launching and driving Antigravity agentic CLI workflows.</td>
</tr>
<tr>
<td align="center"><strong>44×</strong></td>
<td align="left"><code>opencode</code></td>
<td align="left">Binary</td>
<td align="left">Launching OpenCode agentic editor with project credentials.</td>
</tr>
<tr>
<td align="center"><strong>41×</strong></td>
<td align="left"><code>./gradlew</code></td>
<td align="left">Binary</td>
<td align="left">Running Gradle builds, ktlint checks, and test suites in Kotlin microservices.</td>
</tr>
<tr>
<td align="center"><strong>39×</strong></td>
<td align="left"><code>gp</code></td>
<td align="left">OMZ Git Plugin</td>
<td align="left"><code>git push</code> — Fast push to remote tracking branch.</td>
</tr>
<tr>
<td align="center"><strong>23×</strong></td>
<td align="left"><code>docker</code></td>
<td align="left">Docker CLI</td>
<td align="left">Container builds, inspect, and local daemon lifecycle.</td>
</tr>
<tr>
<td align="center"><strong>10×</strong></td>
<td align="left"><code>idea .</code></td>
<td align="left">JetBrains CLI</td>
<td align="left">Launching IntelliJ IDEA directly inside the current project root.</td>
</tr>
<tr>
<td align="center"><strong>—</strong></td>
<td align="left"><code>pm</code></td>
<td align="left">Custom Function</td>
<td align="left">Universal package manager runner (auto-detects bun, pnpm, yarn, npm).</td>
</tr>
<tr>
<td align="center"><strong>—</strong></td>
<td align="left"><code>dotfiles</code></td>
<td align="left">Custom Function</td>
<td align="left">Bare Git repo wrapper to track dotfiles without turning <code>$HOME</code> into a git repo.</td>
</tr>
<tr>
<td align="center"><strong>—</strong></td>
<td align="left"><code>fuck</code> / <code>wtf</code></td>
<td align="left"><code>thefuck</code></td>
<td align="left">Auto-correct previous mistyped command in one keystroke.</td>
</tr>
</tbody>
</table>
<hr />
<h2>2. Real-World Engineering Scenarios</h2>
<h3>Scenario A: High-Speed Git Navigation with OMZ Aliases</h3>
<p>The Oh My Zsh Git plugin (<code>OMZP::git</code>) provides dozens of aliases, but real-world engineering centers on these core three:</p>
<h4>1. Instant Status Check (<code>gst</code>)</h4>
<pre><code class="language-bash">gst
</code></pre>
<ul>
<li><strong>Equivalent to:</strong> <code>git status</code></li>
<li><strong>Why:</strong> Run before every commit, after stash, or before switching branches to see dirty files in milliseconds.</li>
</ul>
<h4>2. Rebase on Upstream Tracking Branch (<code>ggu</code>)</h4>
<pre><code class="language-bash">ggu
</code></pre>
<ul>
<li><strong>Equivalent to:</strong> <code>git pull --rebase origin $(git_current_branch)</code></li>
<li><strong>Why:</strong> When collaborating with peers on a shared feature branch, <code>ggu</code> fetches and rebases remote updates onto your current branch without typing branch names.</li>
</ul>
<h4>3. Push to Upstream (<code>gp</code>)</h4>
<pre><code class="language-bash">gp
</code></pre>
<ul>
<li><strong>Equivalent to:</strong> <code>git push</code></li>
<li><strong>Why:</strong> Standard fast push once upstream is configured.</li>
</ul>
<hr />
<h3>Scenario B: Lightning Directory Navigation (<code>zd</code> with Zoxide)</h3>
<p>Instead of manually running <code>cd ~/works/jago/engagement-platform-engine/</code>, <code>zoxide</code> learns your habits and jumps instantly based on fuzzy matching.</p>
<pre><code class="language-bash"># Jump to engagement-platform-engine from anywhere:
zd engage

# Jump to a docs repository:
zd docs

# Jump to ms-dkore-ledger:
zd ledger

# Interactive fuzzy search (powered by fzf):
zd -i
</code></pre>
<ul>
<li><strong>How it works:</strong> Replaces <code>cd</code> with a smart frecency (frequency + recency) database.</li>
<li><strong>Configured via:</strong> <code>export ZOXIDE_CMD_OVERRIDE=''zd''</code> in <code>~/.zshrc</code>.</li>
</ul>
<hr />
<h3>Scenario C: Universal Package Management (<code>pm</code>)</h3>
<p>Working across multiple JavaScript / TypeScript / Node repositories where each project uses a different package manager (<code>bun</code>, <code>pnpm</code>, <code>yarn</code>, or <code>npm</code>) is error-prone.</p>
<p>Your custom <code>pm</code> function inspects lockfiles automatically:</p>
<pre><code class="language-bash"># In a project with bun.lockb -&gt; runs `bun install`
# In a project with pnpm-lock.yaml -&gt; runs `pnpm install`
# In a project with yarn.lock -&gt; runs `yarn install`
# In a project with package-lock.json -&gt; runs `npm install`
pm install
pm test
pm run dev
</code></pre>
<p><strong>Function definition in <code>~/.zshrc</code>:</strong></p>
<pre><code class="language-zsh">pm() {
    if [[ -f bun.lockb ]]; then
        command bun &quot;$@&quot;
    elif [[ -f pnpm-lock.yaml ]]; then
        command pnpm &quot;$@&quot;
    elif [[ -f yarn.lock ]]; then
        command yarn &quot;$@&quot;
    elif [[ -f package-lock.json ]]; then
        command npm &quot;$@&quot;
    else
        command pnpm &quot;$@&quot;
    fi
}
</code></pre>
<hr />
<h3>Scenario D: Managing Dotfiles Without <code>$HOME</code> Pollution (<code>dotfiles</code>)</h3>
<p>Instead of making <code>$HOME</code> a full Git repository (which causes Git to track every file on your computer and breaks IDEs), you use a bare repository:</p>
<pre><code class="language-bash"># Check status of tracked dotfiles:
dotfiles status

# Add a changed config:
dotfiles add ~/.zshrc ~/.config/nvim/init.lua

# Commit and push:
dotfiles commit -m &quot;chore(zsh): update jovial theme palette&quot;
dotfiles push
</code></pre>
<p><strong>Function definition in <code>~/.zshrc</code>:</strong></p>
<pre><code class="language-zsh">dotfiles() {
  command git --git-dir=&quot;$HOME/.dotfiles&quot; --work-tree=&quot;$HOME&quot; &quot;$@&quot;
}
</code></pre>
<hr />
<h3>Scenario E: Fast IDE &amp; Tool Launchers from Terminal</h3>
<p>Engineers navigate files in the terminal and launch graphical editors directly:</p>
<h4>1. Open IntelliJ IDEA at current directory</h4>
<pre><code class="language-bash">idea .
# or open a specific subfolder/service:
idea /path/to/microservice
</code></pre>
<ul>
<li><strong>Configured via:</strong> JetBrains Toolbox script path in <code>~/.zprofile</code>.</li>
</ul>
<h4>2. Open Agentic Tools</h4>
<pre><code class="language-bash"># Antigravity agent CLI:
agy

# OpenCode with 1Password-resolved secrets:
op run -- opencode
</code></pre>
<hr />
<h3>Scenario F: Fixing Typo''d Commands (<code>fuck</code> / <code>wtf</code>)</h3>
<p>When a command fails due to a typo or forgotten <code>sudo</code>:</p>
<pre><code class="language-bash"># Example:
git statys
# Output: git: ''statys'' is not a git command.

# Type:
fuck
# Or:
wtf
# Output: git status [enter/ctrl+c]
</code></pre>
<ul>
<li><strong>Powered by:</strong> <code>thefuck</code> CLI wrapper.</li>
</ul>
<hr />
<h3>Scenario G: Interactive History &amp; Completion Ergonomics</h3>
<p>Your Zsh configuration is equipped with real-time interactive enhancements:</p>
<h4>1. Substring History Search (Up / Down Arrows)</h4>
<ul>
<li>Type any prefix (e.g. <code>docker run</code> or <code>git checkout</code>) and press <code>↑</code> (Up Arrow).</li>
<li>It cycles <strong>only through past commands starting with that exact prefix</strong>, rather than dumb line-by-line cycling.</li>
</ul>
<h4>2. Auto-Suggestions (<code>zsh-autosuggestions</code>)</h4>
<ul>
<li>As you type, gray suggested commands appear based on history.</li>
<li>Press <strong><code>→</code> (Right Arrow)</strong> or <strong><code>Ctrl + F</code></strong> to autocomplete the entire suggestion.</li>
</ul>
<h4>3. Reverse History Search (<code>Ctrl + R</code>)</h4>
<ul>
<li>Press <code>Ctrl + R</code> and type any keyword to search through all 10,000+ past commands.</li>
<li>Press <code>Ctrl + R</code> repeatedly to cycle backward.</li>
</ul>
<hr />
<h2>3. Related Notes</h2>
<ul>
<li><a href="/posts/zsh-config">Zsh Config Reference</a> — PATH setup, <code>.zshrc</code> plugins, Jovial prompt, and Mise setup.</li>
<li><a href="/posts/mac-terminal-setup">Mac Terminal Setup &amp; Movement Shortcuts</a> — Readline keybindings, Ghostty, and iTerm2 pane splitting.</li>
<li><a href="/posts/git-real-life-engineering">Git in Real-Life Engineering</a> — The complete Git engineering workflow.</li>
</ul>
', 'PUBLISHED', '2026-10-28 00:00:00+00', '2026-10-28 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 75: Apple Note MCP - with Kotlin MCP sdk
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (75, 1, FALSE, FALSE, '2026-06-10 00:00:00+00', '2026-06-10 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (75, 13) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    75, 75, 'en', 'apple-note-mcp-with-kotlin-mcp-sdk', 'Apple Note MCP - with Kotlin MCP sdk', 'Kotlin/JVM MCP server for Apple Notes on macOS.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Kotlin/JVM MCP server for Apple Notes on macOS."}]}]}', '<h1>Apple Note MCP KT</h1>
<p>Kotlin/JVM MCP server for Apple Notes on macOS.</p>
<h2>Project idea</h2>
<p>Expose Apple Notes through MCP so AI clients can create, search, read, update, and delete notes through a controlled interface.</p>
<h2>What it covers</h2>
<ul>
<li>Create notes</li>
<li>Search notes by keyword</li>
<li>List folders recursively</li>
<li>List notes with optional folder filters</li>
<li>Read note content by note ID or title</li>
<li>Update notes</li>
<li>Delete notes</li>
<li>Optional folder-path support for creation and lookup</li>
<li>Tags mapped to Apple Notes hashtags</li>
</ul>
<h2>Safety posture</h2>
<ul>
<li>Prefer note IDs over titles</li>
<li>Keep read-only discovery separate from writes</li>
<li>Make destructive actions explicit</li>
<li>Keep reorganization plans dry-run first</li>
</ul>
<h2>Requirements</h2>
<ul>
<li>macOS</li>
<li>Apple Notes installed and signed in to the target account</li>
<li>Permission for the terminal or JVM process to automate Notes</li>
</ul>
<h2>Build and run</h2>
<ul>
<li>Gradle-based Kotlin/JVM project</li>
<li>Wrapper included for local builds and MCP client launch</li>
</ul>
<h2>Related docs</h2>
<ul>
<li>English README</li>
<li>Thai README</li>
<li>Reorganization plan</li>
<li>Reorg backlog</li>
</ul>
<h2>Current state</h2>
<ul>
<li>Source scaffolded</li>
<li>English and Thai docs exist</li>
<li>The next meaningful step is safer reorganization tooling, not broader write automation</li>
</ul>
', 'PUBLISHED', '2026-06-10 00:00:00+00', '2026-06-10 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 76: Kotlin Series Roadmap
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (76, 1, FALSE, FALSE, '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (76, 13) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (76, 1) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_tags (post_id, tag_id) VALUES (76, 30) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    76, 76, 'th', 'kotlin-series-roadmap', 'Kotlin Series Roadmap', 'Technical notes and documentation from knowledge vault.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Technical notes and documentation from knowledge vault."}]}]}', '<h3>Level 1: พื้นฐาน</h3>
<p><a href="/posts/kotlin">Kotlin คืออะไร?</a>
<a href="/posts/kotlin-vs-java-kotlin-java-kotlin">Kotlin vs Java - เปรียบเทียบ Kotlin กับ Java (ทำไมต้องเลือก Kotlin)</a>
<a href="/posts/kotlin-null-safety-kotlin-null-pointer-exception">Kotlin: Null Safety ใน Kotlin - ความปลอดภัยจาก Null Pointer Exception</a>
<a href="/posts/kotlin-scope-function-kotlin-let-with-run-apply-also">Kotlin: Scope Function ใน Kotlin - Let, With, Run, Apply, Also</a>
<a href="/posts/extension-functions-kotlin">Extension Functions ใน Kotlin</a></p>
<h3>Level 2: Intermediate</h3>
<p><a href="/posts/kotlin-collections-advanced-sequences-lazy-evaluation">Kotlin Collections Advanced - Sequences, Lazy Evaluation</a>
<a href="/posts/api-3">ลองนึกภาพ: คุณกำลังเขียน API ที่ต้องดึงข้อมูลจากฐานข้อมูล 3 ตัว พร้อมกัน คุณจะทำยังไง?</a></p>
<ul>
<li><strong>Sealed Classes &amp; Data Classes</strong> - Advanced OOP Patterns</li>
<li><strong>Delegation Pattern</strong> - Composition over Inheritance</li>
<li><strong>Inline Functions &amp; Reified</strong> - Performance Optimization</li>
</ul>
<h3>Level 3: Ktor &amp; Backend</h3>
<p><a href="/posts/ktor-basic">Ktor Basic</a>
Ktor คืออะไร?
หลังจากที่คุณเรียนรู้พื้นฐาน Kotlin แล้ว ตอนนี้ถึงเวลาที่จะสร้างอะไรที่ใช้งานได้จริง! Ktor คือ framework ที่ช่วยให้คุณสร้าง Web Server, API, และ Web Applications ได้อย่างง่ายดาย
Ktor ออกแบบมาให้เบา, เร็ว, และใช้งานง่าย ไม่ต้องมี boilerplate code มากมายเหมือน Java …</p>
<ul>
<li><strong>Ktor: Database Integration</strong> - เชื่อมต่อ PostgreSQL, MongoDB</li>
<li><strong>Ktor: Authentication &amp; JWT</strong> - ระบบล็อกอิน และ Token-based Auth</li>
<li><strong>Ktor: WebSocket</strong> - Real-time Communication</li>
<li><strong>Ktor: Deployment</strong> - Deploy ไป Docker, Heroku, AWS</li>
</ul>
<h3>Level 4: Advanced Topics</h3>
<ul>
<li><strong>Kotlin Multiplatform</strong> - เขียน Code ใช้ได้ทั้ง JVM, JS, Native</li>
<li><a href="/posts/dsl-domain-sepacific-language">DSL (Domain Specific Language)</a> - สร้าง Language เฉพาะด้าน</li>
<li><strong>Reflection &amp; Annotations</strong> - Meta-programming</li>
<li><strong>Performance Optimization</strong> - Profiling และ Optimization</li>
</ul>
<h3>Level 5: Real-world Applications</h3>
<ul>
<li><strong>Building REST API ด้วย Ktor</strong> - ตัวอย่างจริง (Blog API, E-commerce API)</li>
<li><strong>Microservices ด้วย Kotlin</strong> - Architecture และ Best Practices</li>
<li><strong>Android Development ด้วย Kotlin</strong> - สร้าง Mobile Apps</li>
<li><strong>Kotlin for Data Science</strong> - Data Analysis ด้วย Kotlin</li>
</ul>
<p>ref.
Atomic Kotlin</p>
', 'PUBLISHED', '2026-02-06 00:00:00+00', '2026-02-06 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 77: Kotlin worksheet - vs code extension
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (77, 1, FALSE, FALSE, '2026-06-10 00:00:00+00', '2026-06-10 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (77, 13) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    77, 77, 'en', 'kotlin-worksheet-vs-code-extension', 'Kotlin worksheet - vs code extension', 'VS Code extension for interactive Kotlin worksheets.',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"VS Code extension for interactive Kotlin worksheets."}]}]}', '<h1>Kotlin Worksheet Extension Plan</h1>
<p>VS Code extension for interactive Kotlin worksheets.</p>
<h2>Project idea</h2>
<p>Build a notebook-first Kotlin worksheet experience with warm session state, workspace-aware classpath resolution, and fast feedback for <code>.ktws</code> files.</p>
<h2>User workflows</h2>
<ul>
<li>Open a worksheet document and run cells</li>
<li>Re-run selected code or all cells</li>
<li>Keep a persistent Kotlin runtime alive while the workspace is open</li>
<li>Render output as text, errors, JSON, HTML, markdown, images, and collapsible long output</li>
<li>Show lightweight inline results in <code>.kt</code> and <code>.kts</code> files</li>
</ul>
<h2>Architecture</h2>
<ul>
<li>VS Code extension host for commands, notebook handling, diagnostics, and workspace discovery</li>
<li>Long-lived Kotlin runtime daemon for session state, compilation, execution, and output collection</li>
<li>Small JSON protocol over stdin/stdout or a local socket</li>
</ul>
<h2>UI strategy</h2>
<ul>
<li>Primary: VS Code Notebook API for <code>.ktws</code> files</li>
<li>Secondary: inline decorations for source files</li>
</ul>
<h2>Classpath strategy</h2>
<ul>
<li>Start with single-root Gradle JVM projects</li>
<li>Add Maven support</li>
<li>Add multi-root support</li>
<li>Pass resolved dependencies into the runtime before execution</li>
</ul>
<h2>Non-goals for v1</h2>
<ul>
<li>No Kotlin language server</li>
<li>No new JVM per execution</li>
<li>No full notebook renderer before execution works</li>
<li>No duplicate of official Kotlin editing features</li>
</ul>
<h2>Current state</h2>
<ul>
<li>Foundation, runtime protocol, notebook MVP, diagnostics, usability, and tests are largely in place</li>
<li>Inline rendering and classpath discovery are the main remaining implementation gaps</li>
</ul>
<h2>Commands</h2>
<ul>
<li><code>ktws.openWorksheet</code></li>
<li><code>ktws.runCell</code></li>
<li><code>ktws.runSelection</code></li>
<li><code>ktws.runAll</code></li>
<li><code>ktws.restartSession</code></li>
<li><code>ktws.stopExecution</code></li>
<li><code>ktws.toggleInlineResults</code></li>
<li><code>ktws.showRuntimeLog</code></li>
</ul>
', 'PUBLISHED', '2026-06-10 00:00:00+00', '2026-06-10 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 78: New windows agent
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (78, 1, FALSE, FALSE, '2026-06-14 00:00:00+00', '2026-06-14 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (78, 13) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    78, 78, 'en', 'new-windows-agent', 'New windows agent', 'This deployment plan is structured to get your private Hermes Agent running safely on Windows 11. It moves from core infrastructure to AI model hosting, and finally to agent configuration. -...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"This deployment plan is structured to get your private Hermes Agent running safely on Windows 11. It moves from core infrastructure to AI model hosting, and finally to agent configuration. -..."}]}]}', '<h2>This deployment plan is structured to get your private Hermes Agent running safely on Windows 11. It moves from core infrastructure to AI model hosting, and finally to agent configuration.</h2>
<h2>Phase 1: Infrastructure Preparation (Estimated Time: 20 Mins)</h2>
<h2>Step 1.1: Install WSL2 and Ubuntu [1]</h2>
<ol>
<li>Open PowerShell as an Administrator.</li>
<li>Run the installation command:</li>
</ol>
<pre><code>wsl --install -d Ubuntu


</code></pre>
<ol>
<li>Restart your computer when prompted.</li>
<li>After rebooting, a Ubuntu terminal will open automatically. Set up your username and password. [2]</li>
</ol>
<h2>Step 1.2: Install Docker Desktop</h2>
<ol>
<li>Download Docker Desktop for Windows.</li>
<li>Run the installer. Ensure the &quot;Use the WSL 2 based engine&quot; option is checked.</li>
<li>Open Docker Desktop, go to Settings (Gear Icon) &gt; General, and verify <em>Use the WSL 2 based engine</em> is toggled on.</li>
<li>Go to Resources &gt; WSL Integration, enable it for your Ubuntu distro, and click <em>Apply &amp; Restart</em>.</li>
</ol>
<h2>Step 1.3: Enable NVIDIA GPU Support inside WSL2</h2>
<ol>
<li>Open your Ubuntu terminal.</li>
<li>Setup the NVIDIA Container Toolkit package repository:</li>
</ol>
<pre><code>curl -fsSL https://github.io | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg \
&amp;&amp; curl -s -L https://github.io | \
     sed ''s#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g'' | \
     sudo tee /etc/set/sources.list.d/nvidia-container-toolkit.list


</code></pre>
<pre><code>curl -fsSL https://github.io | sudo gpg --dearmor -o /usr/share/keyrings/nvidia-container-toolkit-keyring.gpg &amp;&amp; curl -s -L https://github.io | sed ''s#deb https://#deb [signed-by=/usr/share/keyrings/nvidia-container-toolkit-keyring.gpg] https://#g'' | sudo tee /etc/set/sources.list.d/nvidia-container-toolkit.list
</code></pre>
<ol>
<li>Update and install the toolkit:</li>
</ol>
<pre><code>sudo apt-get update &amp;&amp; sudo apt-get install -y nvidia-container-toolkit


</code></pre>
<ol>
<li>Restart Docker Desktop from your Windows system tray. [3]</li>
</ol>
<hr />
<h2>Phase 2: Drive Allocation &amp; Workspace Isolation (Estimated Time: 5 Mins)</h2>
<h2>Step 2.1: Target Your Drives</h2>
<ol>
<li>Ensure your 1TB SSD is your <code>C:</code> drive (for Windows, Docker, and AI models).</li>
<li>Locate your 256GB SSD drive letter (e.g., <code>D:</code> or <code>E:</code>).</li>
<li>Open your Ubuntu terminal and create a secure workspace directory mapped to that secondary drive. In WSL2, your Windows drives are mounted under <code>/mnt/</code>:</li>
</ol>
<pre><code># Replace ''d'' with your actual 256GB SSD drive letter
mkdir -p /mnt/d/hermes-workspace
cd /mnt/d/hermes-workspace


</code></pre>
<hr />
<h2>Phase 3: Local LLM Engine Deployment (Estimated Time: 15 Mins)</h2>
<h2>Step 3.1: Install Ollama inside WSL2</h2>
<ol>
<li>In your Ubuntu terminal, run the official install script:</li>
</ol>
<pre><code>curl -fsSL https://ollama.com | sh


</code></pre>
<ol>
<li>Verify Ollama sees your RTX 4070 Super by running a lightweight model first:</li>
</ol>
<pre><code>ollama run llama3:8b-instruct-q8_0


</code></pre>
<ol>
<li>Type <code>/bye</code> to exit the model prompt once it successfully loads and works.</li>
</ol>
<hr />
<h2>Phase 4: Hermes Agent Installation &amp; Locking (Estimated Time: 10 Mins)</h2>
<h2>Step 4.1: Install Node.js &amp; Hermes</h2>
<ol>
<li>In your Ubuntu terminal, install Node.js (required to run the Hermes CLI):</li>
</ol>
<pre><code>sudo apt update &amp;&amp; sudo apt install -y nodejs npm


</code></pre>
<ol>
<li>Install the Hermes Agent globally:</li>
</ol>
<pre><code>npm install -g @hermes-agent/cli


</code></pre>
<pre><code>[4]

</code></pre>
<h2>Step 4.2: Enforce the Privacy Policy</h2>
<p>Run these commands sequentially in your terminal to build the privacy sandbox:</p>
<pre><code># Direct traffic to your offline Ollama instance
hermes config set model ollama/llama3:8b-instruct-q8_0

# Restrict execution environment to isolated Docker container
hermes config set terminal.backend docker

# Strip out PII and active application secrets before they reach the model context
hermes config set privacy.redact_pii true
hermes config set security.redact_secrets true

# Lock down networking so the container cannot send data to the internet
hermes config set terminal.docker.network host


</code></pre>
<hr />
<h2>Phase 5: Verification &amp; Launch</h2>
<p>To test that your environment is fully private and operational, run a test command inside your <code>/mnt/d/hermes-workspace</code> folder:</p>
<pre><code>hermes run &quot;Create a python script that counts to 10&quot;


</code></pre>
<p>Watch your Docker Desktop dashboard. You will see a temporary container spin up, run the command safely isolated from your Windows system files, pass the output back to your terminal, and self-destruct.
Would you like assistance with writing a bash alias to automate launching this secure environment, or do you want to explore modifying the file-system read/write permissions for the Docker agent next?
[1] <a href="https://openclawlaunch.com/guides/hermes-agent-windows">https://openclawlaunch.com</a>
[2] <a href="https://docs.cloud.google.com/monitoring/agent/ops-agent/installation">https://docs.cloud.google.com</a>
[3] <a href="https://www.instagram.com/reel/DZI5J74jfsV/">https://www.instagram.com</a>
[4] <a href="https://medium.com/data-science-in-your-pocket/hermes-agent-with-ollama-setup-b0a442f53241">https://medium.com</a></p>
', 'PUBLISHED', '2026-06-14 00:00:00+00', '2026-06-14 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- Post 79: reinstall windows 11
INSERT INTO posts (id, blog_id, is_featured, is_page, created_at, updated_at)
VALUES (79, 1, FALSE, FALSE, '2026-06-14 00:00:00+00', '2026-06-14 00:00:00+00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO post_tags (post_id, tag_id) VALUES (79, 13) ON CONFLICT (post_id, tag_id) DO NOTHING;
INSERT INTO post_variants (
    id, post_id, language_code, slug, title, description,
    content_json, content_html, status, published_at, updated_at
) VALUES (
    79, 79, 'en', 'reinstall-windows-11', 'reinstall windows 11', 'Since you want to start completely fresh and clean everything, the absolute best approach is a clean reinstallation of Windows 11 directly onto your 1TB SSD. This eliminates clutter, ensures...',
    '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Since you want to start completely fresh and clean everything, the absolute best approach is a clean reinstallation of Windows 11 directly onto your 1TB SSD. This eliminates clutter, ensures..."}]}]}', '<h2>Since you want to start completely fresh and clean everything, the absolute best approach is a clean reinstallation of Windows 11 directly onto your 1TB SSD. This eliminates clutter, ensures correct partition alignment for maximum speed, and gives you a pristine environment for your local AI stack.
Here is the exact step-by-step plan to clone nothing, wipe the drives, and make the 1TB SSD your primary boot drive.</h2>
<h2>Phase 1: Preparation (What you need)</h2>
<ul>
<li>A USB Flash Drive: Minimum 8GB capacity (it will be wiped completely).</li>
<li>The Media Creation Tool: Download the official &quot;Create Windows 11 Installation Media&quot; tool from Microsoft’s website.</li>
</ul>
<hr />
<h2>Phase 2: Create the Bootable USB</h2>
<ol>
<li>Plug your USB drive into your PC.</li>
<li>Run the downloaded Media Creation Tool.</li>
<li>Select your language and Windows 11 edition.</li>
<li>Choose USB flash drive, select your plugged-in USB from the list, and click Next.</li>
<li>Wait for the tool to download Windows 11 and flash it to the USB. [1, 2]</li>
</ol>
<hr />
<h2>Phase 3: BIOS/UEFI &amp; Boot Order Adjustment</h2>
<ol>
<li>Keep the USB plugged in and Restart your PC.</li>
<li>As soon as the screen goes black, repeatedly tap your motherboard''s BIOS/Boot Menu key.</li>
</ol>
<ul>
<li>*Common keys:*Del or F2 (Asus, Gigabyte, MSI, ASRock) or F12 (Gigabyte, Dell). [3]</li>
</ul>
<ol start="3">
<li>Once in the BIOS, locate the Boot Priority or Boot Menu.</li>
<li>Change the primary boot option so your USB Flash Drive is #1. [4, 5]</li>
<li>Save your changes and exit (usually F10). Your PC will restart into the Windows Installer. [6]</li>
</ol>
<hr />
<h2>Phase 4: Clean Install &amp; Drive Wiping</h2>
<ol>
<li>When the Windows Setup screen appears, select your language/keyboard and click Install Now.</li>
<li>Click &quot;I don''t have a product key&quot; (Windows 11 will automatically re-activate via your digital hardware license once installed). [7, 8]</li>
<li>Select your Windows 11 edition (Home or Pro) matching your current setup.</li>
<li>For installation type, choose Custom: Install Windows only (advanced). [9, 10, 11]</li>
<li>The Drive Selection Screen (Crucial Step): You will see a list of drives and their partitions (Drive 0, Drive 1, etc.).</li>
</ol>
<ul>
<li>Look closely at the total sizes to identify them (one will be ~931GB for the 1TB, one will be ~238GB for the 256GB).</li>
<li>Click on every single partition on both drives one by one, and click Delete until you are left with just two entries:</li>
<li><code>Drive X Unallocated Space</code> (~931 GB)</li>
<li><code>Drive Y Unallocated Space</code> (~238 GB) [12, 13]</li>
</ul>
<ol start="6">
<li>Click on the 1TB Unallocated Space entry so it is highlighted.</li>
<li>Click Next. Windows will automatically create the necessary system partitions and begin installing itself onto the 1TB SSD.</li>
</ol>
<hr />
<h2>Phase 5: Post-Install Configuration</h2>
<ol>
<li>Follow the on-screen Windows 11 setup prompts (Region, Network, Microsoft Account).</li>
<li>Once you reach the desktop, right-click the Windows Start button and select Disk Management.</li>
<li>You will see your 1TB drive as <code>C:</code> (Boot, Page File, etc.).</li>
<li>Look at the smaller 256GB drive. If it says &quot;Unallocated&quot;, right-click it, choose New Simple Volume, click Next through the defaults, and format it as NTFS. Assign it a letter (like <code>D:</code>). [14, 15, 16, 17]</li>
</ol>
<p>Your drives are now perfectly swapped and entirely clean. Your system OS and models will sit on the ultra-fast 1TB drive, and you have an isolated 256GB drive ready for your secure Hermes workspace. [18]
Once you complete the Windows reinstallation and reach the clean desktop, let me know so we can resume installing WSL2, Docker, and Ollama on your newly configured drives.
[1] <a href="https://www.guidingtech.com/how-to-clean-install-windows-11/">https://www.guidingtech.com</a>
[2] <a href="https://learn.microsoft.com/en-us/answers/questions/4173908/how-do-i-upgrade-my-ssd-from-512-mb-to-1tb">https://learn.microsoft.com</a>
[3] <a href="https://forum.benchmarkreviews.com/t/whats-the-best-way-to-move-files-from-my-hdd-to-a-new-ssd/1098">https://forum.benchmarkreviews.com</a>
[4] <a href="https://www.ruijie.com/en-global/support/documents/slide_rg-inc-pro-1-52-build20240511-software-installation-and-reference-guide/">https://www.ruijie.com</a>
[5] <a href="https://www.windowscentral.com/how-replace-your-pcs-main-windows-boot-drive">https://www.windowscentral.com</a>
[6] <a href="https://www.cocosenor.com/articles/computer/detail-steps-to-clean-install-windows-10-on-a-new-ssd.html">https://www.cocosenor.com</a>
[7] <a href="https://learn.microsoft.com/en-us/answers/questions/3998160/i-want-to-do-a-clean-install-of-windows-11-pro-on">https://learn.microsoft.com</a>
[8] <a href="https://www.youtube.com/watch?v=__Q3T7L8dyQ">https://www.youtube.com</a>
[9] <a href="https://www.howtogeek.com/224342/how-to-clean-install-windows-10/">https://www.howtogeek.com</a>
[10] <a href="https://windowsforum.com/threads/how-to-downgrade-windows-server-datacenter-to-standard-edition-a-complete-guide.373741/">https://windowsforum.com</a>
[11] <a href="https://www.lifewire.com/how-to-clean-install-windows-8-or-8-1-2626254">https://www.lifewire.com</a>
[12] <a href="https://computerthings.substack.com/p/deploying-windows-to-a-computer-with">https://computerthings.substack.com</a>
[13] <a href="https://evezone.evetech.co.za/quick-bytes/how-to-reset-2tb-ssd-to-factory-settings">https://evezone.evetech.co.za</a>
[14] <a href="https://www.guidingtech.com/how-to-create-and-use-a-recovery-drive-on-windows-11/">https://www.guidingtech.com</a>
[15] <a href="https://lexarenterprise.com/how-to-install-ssd/">https://lexarenterprise.com</a>
[16] <a href="https://learn.microsoft.com/en-us/answers/questions/3826010/migrating-windows-10-to-another-drive-without-clea">https://learn.microsoft.com</a>
[17] <a href="https://www.youtube.com/watch?v=di4N6AWydaA">https://www.youtube.com</a>
[18] <a href="https://evezone.evetech.co.za/upgrade-path/how-to-migrate-windows-to-your-new-sata-ssd-1tb">https://evezone.evetech.co.za</a></p>
', 'PUBLISHED', '2026-06-14 00:00:00+00', '2026-06-14 00:00:00+00'
) ON CONFLICT (id) DO NOTHING;

-- 3. Update Sequences
SELECT setval('tags_id_seq', (SELECT GREATEST(MAX(id), 100) FROM tags));
SELECT setval('posts_id_seq', (SELECT GREATEST(MAX(id), 200) FROM posts));
SELECT setval('post_variants_id_seq', (SELECT GREATEST(MAX(id), 200) FROM post_variants));
