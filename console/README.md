# Blog Studio - Next.js Admin Console

Modern, reactive author console and rich-text editing studio built with **Next.js (App Router)**, **TypeScript**, **TipTap Editor**, and **Tailwind CSS**.

## Features

- **Auth & Session**: Seamless login and author registration with JWT persistence.
- **Multi-Blog Management**: Create, switch, and configure multiple blogs with custom subdomains and custom domains.
- **TipTap Rich-Text Studio**:
  - Full block editor (Headings, bold/italic/code, blockquotes, lists, links, images).
  - Generates TipTap structured JSON for revisioning and pre-rendered HTML for fast SSR delivery.
- **Variant i18n Switcher**:
  - Dynamic language tabs to create and manage localized translations for the same post.
  - Granular draft/publishing workflow per translation.
- **Media Uploads**: Direct multipart image upload to the backend.
- **Taxonomy & Tags**: Create, link, and organize tags.
- **Transparent API Rewriting**: Built-in Next.js rewrites proxy `/api/*` and `/uploads/*` to the Ktor backend (`http://localhost:8080`), eliminating CORS issues.

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.
