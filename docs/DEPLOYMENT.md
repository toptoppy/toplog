# TopLog Production Deployment Guide

A step-by-step production deployment manual for hosting **TopLog** on any cloud VPS (DigitalOcean, Hetzner, AWS EC2, Linode, Vultr) with prebuilt GitHub Container Registry (GHCR) images, wildcard DNS, and automated On-Demand Let's Encrypt SSL.

---

## Architecture Overview

```
                      Internet
                         │
             ┌───────────┴───────────┐
             │   Ports 80 & 443      │
             ▼                       ▼
   ┌──────────────────────────────────────────────┐
   │                  Caddy Proxy                 │
   │   - Wildcard SSL (*.yourdomain.com)          │
   │   - On-Demand Client Custom Domains SSL      │
   │   - Zstandard & Gzip Compression             │
   └───────────────┬──────────────┬───────────────┘
                   │              │
      console.yourdomain.com      *.yourdomain.com / Custom Domains
                   │              │
                   ▼              ▼
           ┌──────────────┐ ┌──────────────┐
           │ Next.js      │ │ Kotlin Ktor  │
           │ Studio Admin │ │ Backend API  │
           │ (:3000)      │ │ (:8080)      │
           └──────────────┘ └──────┬───────┘
                                   │
                                   ▼
                           ┌──────────────┐
                           │ PostgreSQL 18│
                           │ Database     │
                           └──────────────┘
```

---

## 1. Server Prerequisites

* **Hardware**: Minimum 1 vCPU, 1 GB RAM (2 GB recommended).
* **OS**: Ubuntu 22.04 LTS, Ubuntu 24.04 LTS, or Debian 12.
* **Firewall / Ports**:
  * `80/tcp` (HTTP - required for ACME HTTP-01 challenge)
  * `443/tcp` and `443/udp` (HTTPS & HTTP/3)
  * `22/tcp` (SSH)

Install Docker and Docker Compose on Ubuntu/Debian:
```bash
curl -fsSL https://get.docker.com | sh
sudo systemctl enable --now docker
```

---

## 2. DNS Configuration

Configure the following DNS records at your DNS provider (Cloudflare, Route53, Namecheap, etc.):

| Type | Name / Host | Value / Target | Description |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `<SERVER_IP>` | Root domain (`yourdomain.com`) |
| **A** | `*` | `<SERVER_IP>` | **Wildcard** for all tenant blogs (`*.yourdomain.com`) |
| **A** | `console` | `<SERVER_IP>` | Admin studio console (`console.yourdomain.com`) |

> [!IMPORTANT]
> If using Cloudflare, set the Proxy status to **DNS Only (Gray Cloud)** during initial setup so Caddy can perform Let's Encrypt TLS issuance directly.

### Client Custom Domain Setup
When a tenant points their custom domain (e.g. `blog.acme.com`) to TopLog:
* They create a **CNAME** pointing `blog.acme.com` $\rightarrow$ `yourdomain.com` (or an **A** record pointing to `<SERVER_IP>`).
* Caddy's `on_demand_tls` queries TopLog backend (`/api/internal/check-domain`) and issues an SSL certificate automatically within 2 seconds.

---

## 3. Deployment Steps

### Step 1: Create TopLog Directory
```bash
mkdir -p /opt/toplog && cd /opt/toplog
```

### Step 2: Download Configuration Files
```bash
curl -sSL https://raw.githubusercontent.com/toptoppy/toplog/main/docker-compose.prod.yml -o docker-compose.yml
curl -sSL https://raw.githubusercontent.com/toptoppy/toplog/main/Caddyfile -o Caddyfile
```

### Step 3: Configure Environment Variables
Create your production `.env` file:
```bash
nano .env
```

Paste and customize:
```env
# Domain Configuration
BASE_DOMAIN=yourdomain.com
CONSOLE_DOMAIN=console.yourdomain.com

# Database Security
DB_NAME=toplog
DB_USER=toplog_admin
DB_PASSWORD=GENERATE_STRONG_PASSWORD_HERE

# JWT Authentication
JWT_SECRET=GENERATE_RANDOM_64_CHARACTER_SECRET_HERE
JWT_ISSUER=toplog-backend
JWT_AUDIENCE=toplog-console

# System-Wide AI Fallback (Optional - can also be configured per-blog in UI)
OPENROUTER_API_KEY=
AI_MODEL=google/gemini-2.0-flash-001
```

> [!TIP]
> Generate secure secrets using `openssl rand -hex 32`.

### Step 4: Launch TopLog
```bash
docker compose pull
docker compose up -d
```

### Step 5: Verify Running Status
```bash
docker compose ps
```
All four containers (`toplog-caddy`, `toplog-console`, `toplog-backend`, `toplog-postgres`) will report `healthy` and `Up`.

---

## 4. Initial Login & Setup

1. Open your browser and navigate to:
   ```
   https://console.yourdomain.com
   ```
2. Log in with the initial default credentials:
   * **Email**: `admin@example.com`
   * **Password**: `password123`
3. **Immediately navigate to Team / Settings to change your password and email.**
4. Go to **Blog Settings** $\rightarrow$ **AI & OpenRouter** to configure your API key for instant multilingual translation and automated SEO optimization.

---

## 5. Maintenance & Upgrades

### Updating to the Latest Release
TopLog publishes automated multi-arch Docker images on every release tag to GitHub Container Registry (`ghcr.io/toptoppy/toplog-*`).

To update with zero configuration changes:
```bash
cd /opt/toplog
docker compose pull
docker compose up -d
```
Flyway database migrations will automatically run on startup.

### Automated Database Backups
Create a daily backup cron job:
```bash
sudo crontab -e
```
Add the following line to back up the database every day at 3:00 AM:
```cron
0 3 * * * docker exec toplog-postgres pg_dump -U toplog_admin toplog | gzip > /opt/toplog/backups/db_$(date +\%F).sql.gz
```

### Restoring from Backup
```bash
gunzip -c /opt/toplog/backups/db_YYYY-MM-DD.sql.gz | docker exec -i toplog-postgres psql -U toplog_admin -d toplog
```

---

## 6. Troubleshooting

| Symptom | Cause | Solution |
| :--- | :--- | :--- |
| `SSL Handshake Failed` on custom domain | Port 80 is blocked by VPS firewall | Ensure incoming `80/tcp` is open in UFW / cloud security group for Let's Encrypt validation. |
| `404 Blog Not Found` on blog subdomain | Domain does not match database record | Ensure tenant blog subdomain matches the incoming hostname (e.g., `tech.yourdomain.com`). |
| `Token is invalid or expired` | JWT secret mismatch | Verify `JWT_SECRET` in `.env` is identical between restarts. |
