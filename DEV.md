# Local Development Guide

This guide details how to develop on the blogging platform directly on your host machine without running the entire application stack in Docker.

---

## Prerequisites

- **Java Development Kit (JDK) 21** or higher (`java -version`)
- **Node.js 20+** and **npm** (`node -v`)
- **Docker** (only needed for running local PostgreSQL)

---

## 1. Start Local PostgreSQL Database

The fastest way to provide a local PostgreSQL instance is using Docker:

```bash
docker compose up -d db
```

This starts PostgreSQL on port `5432` with user `postgres` and database `blogdb`.

---

## 2. Running the Backend (Kotlin + Ktor)

The backend service is located in `backend/` and managed with Gradle.

```bash
cd backend

# Set environment variables for local connection
export DATABASE_URL="jdbc:postgresql://localhost:5432/blogdb"
export DATABASE_USER="postgres"
export DATABASE_PASSWORD="supersecurepassword123"
export JWT_SECRET="super-secret-jwt-key-replace-with-a-random-32-char-string-in-prod"
export STORAGE_UPLOADS_DIR="./uploads"

# Run the Ktor application
./gradlew run
```

- Flyway migrations run automatically on startup.
- The Ktor server listens at **`http://localhost:8080`**.
- Health check: `curl http://localhost:8080/health`.

### Useful Gradle Tasks

```bash
# Compile Kotlin sources
./gradlew compileKotlin

# Run unit and integration tests with JaCoCo coverage
./gradlew test jacocoTestReport

# Assemble standalone distribution zip/tar
./gradlew assemble
```

---

## 3. Running the Console (Next.js 15)

The administration console is located in `console/`.

```bash
cd console

# Install dependencies
npm install

# Start Next.js development server
npm run dev
```

- The Next.js dev server starts at **`http://localhost:3000`** with Hot Module Replacement (HMR).
- API requests are proxied directly to `http://localhost:8080`.

### Useful Frontend Scripts

```bash
# Run unit & component tests (Vitest)
npm test

# Production build check & type checking
npm run build

# Linting
npm run lint
```

---

## 4. Pebble Themes & Template Development

Blog templates are located in:
`backend/src/main/resources/themes/default/`

- `layout.pebble`: Base template, dark mode scripts, progress bar, header, and footer.
- `index.pebble`: Homepage article stream.
- `post.pebble`: Full article view, Table of Contents, reading time, comments.
- `tag.pebble`: Tag / category filter page.
- `assets/style.css`: Theme styles, CSS variables, dark mode rules.

When running `./gradlew run`, changes to Pebble template files in `src/main/resources` are loaded on next request refresh.

---

## 5. Default Credentials

- **Admin Email**: `admin@example.com`
- **Password**: `password123`
