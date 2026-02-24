#!/bin/bash

# ==========================================
# ЗАПУСТИТИ ЦЕЙ ФАЙЛ ПЕРШИМ / RUN THIS FILE FIRST
# ==========================================

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  Vibe Backend - Project API Setup                         ║"
echo "║  Налаштування проекту API                                  ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js не встановлено / Node.js is not installed"
    echo "   Встановіть Node.js з https://nodejs.org"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Check if dependencies are already installed
if [ -d "node_modules/@nestjs/swagger" ]; then
    echo "✅ Залежності вже встановлені / Dependencies already installed"
    echo ""
else
    echo "📦 Встановлення залежностей / Installing dependencies..."
    echo "   Це займе 1-2 хвилини / This will take 1-2 minutes..."
    echo ""

    npm install @nestjs/swagger swagger-ui-express class-validator class-transformer

    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Залежності встановлені успішно / Dependencies installed successfully"
        echo ""
    else
        echo ""
        echo "❌ Помилка встановлення / Installation failed"
        exit 1
    fi
fi

# Show project structure
echo "📁 Структура проекту / Project structure:"
echo "   src/projects/         - Project модуль з ендпоінтами"
echo "   src/common/           - Guards та decorators"
echo ""

# Show created endpoints
echo "🔌 Створені ендпоінти / Created endpoints:"
echo "   POST   /projects              - Створити проект"
echo "   GET    /projects              - Отримати всі проекти"
echo "   GET    /projects?status=...   - Фільтр за статусом"
echo "   GET    /projects?tag=...      - Фільтр за тегом"
echo "   GET    /projects/:id          - Отримати проект"
echo "   PATCH  /projects/:id          - Оновити проект"
echo "   DELETE /projects/:id          - Видалити проект"
echo "   GET    /projects/stats/count  - Кількість проектів"
echo ""

# Show API key
echo "🔑 Тестовий API ключ / Test API Key:"
echo "   vibe-test-api-key-2024-secure-token-12345"
echo ""
echo "   Використовуйте в header:"
echo "   X-API-Key: vibe-test-api-key-2024-secure-token-12345"
echo ""

# Show next steps
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  НАСТУПНІ КРОКИ / NEXT STEPS                               ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "1️⃣  Запустити сервер / Start the server:"
echo "   npm run start:dev"
echo ""
echo "2️⃣  Відкрити Swagger UI / Open Swagger UI:"
echo "   http://localhost:3000/api"
echo ""
echo "3️⃣  Авторизуватися / Authorize:"
echo "   Натисніть 'Authorize' та введіть API key"
echo "   Click 'Authorize' and enter the API key"
echo ""
echo "4️⃣  Протестувати API / Test the API:"
echo "   - Використайте Swagger UI для інтерактивного тестування"
echo "   - Або запустіть: ./test-api.sh"
echo "   - Або імпортуйте postman-collection.json в Postman"
echo ""

# Show documentation
echo "📚 Документація / Documentation:"
echo "   README_PROJECTS.md      - Повна документація"
echo "   QUICKSTART.md           - Швидкий старт"
echo "   SETUP.md                - Інструкції встановлення"
echo "   IMPLEMENTATION_SUMMARY.md - Підсумок реалізації"
echo ""

# Show test command
echo "🧪 Для автоматичного тестування / For automated testing:"
echo "   chmod +x test-api.sh"
echo "   ./test-api.sh"
echo ""

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ ВСЕ ГОТОВО! / ALL READY!                               ║"
echo "║                                                            ║"
echo "║  Запустіть: npm run start:dev                              ║"
echo "║  Run: npm run start:dev                                    ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
