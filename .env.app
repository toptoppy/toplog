# Domain configuration
BASE_DOMAIN=localhost
CONSOLE_DOMAIN=console.localhost

# Database Credentials
DB_USER=postgres
DB_PASSWORD=supersecurepassword123
DB_NAME=blogdb

# Security & JWT
JWT_SECRET=super-secret-jwt-key-replace-with-a-random-32-char-string-in-prod
JWT_ISSUER=blogs-backend
JWT_AUDIENCE=blogs-console

# Storage
STORAGE_UPLOADS_DIR=/app/uploads

# AI Assistant (OpenAI, Groq, OpenRouter, Ollama, etc.)
AI_API_KEY=
AI_BASE_URL=https://api.openai.com/v1
AI_MODEL=gpt-4o-mini
