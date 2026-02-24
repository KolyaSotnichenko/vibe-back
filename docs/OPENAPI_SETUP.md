# OpenAPI Setup Instructions

## Швидкий старт / Quick Start

### 1. Встановлення залежностей / Install Dependencies

```bash
# Using pnpm (recommended)
pnpm add @nestjs/swagger swagger-ui-express

# Or using npm
npm install @nestjs/swagger swagger-ui-express

# Or using yarn
yarn add @nestjs/swagger swagger-ui-express
```

### 2. Запуск сервера / Start the Server

```bash
# Development mode with auto-reload
pnpm run start:dev

# Or
npm run start:dev
```

### 3. Доступ до OpenAPI / Access OpenAPI

Після запуску сервера, відкрийте в браузері:
After starting the server, open in your browser:

- **Swagger UI (interactive docs)**: http://localhost:3000/api
- **OpenAPI JSON**: http://localhost:3000/api-json/openapi.json
- **OpenAPI YAML**: http://localhost:3000/api-json/openapi.yaml

## Генерація статичного файлу / Generate Static File

Щоб створити статичний файл `openapi.json`:
To create a static `openapi.json` file:

```bash
# Ensure dependencies are installed
pnpm install

# Generate the OpenAPI specification
pnpm run openapi:generate
```

Файл буде створено в: `docs/openapi.json`
The file will be created at: `docs/openapi.json`

## Використання у фронтенді / Frontend Usage

### Option 1: Fetch від працюючого сервера / Fetch from Running Server

```typescript
// Fetch the specification
const response = await fetch('http://localhost:3000/api-json/openapi.json');
const openApiSpec = await response.json();

// Now you can use it
console.log('API Endpoints:', Object.keys(openApiSpec.paths));
```

### Option 2: Імпорт статичного файлу / Import Static File

```typescript
import openApiSpec from './openapi.json';

// Use the specification
console.log('API Version:', openApiSpec.info.version);
```

### Option 3: Генерація TypeScript клієнта / Generate TypeScript Client

```bash
# Install generator
npm install -g @openapitools/openapi-generator-cli

# Generate client from running server
openapi-generator-cli generate \
  -i http://localhost:3000/api-json/openapi.json \
  -g typescript-fetch \
  -o ./frontend/src/api-client

# Or from static file
openapi-generator-cli generate \
  -i ./docs/openapi.json \
  -g typescript-fetch \
  -o ./frontend/src/api-client
```

## Структура проекту / Project Structure

```
backend/
├── src/
│   ├── main.ts                      # Swagger configuration
│   ├── app.controller.ts            # Enhanced with OpenAPI decorators
│   ├── openapi.controller.ts        # OpenAPI endpoint controller
│   └── projects/
│       ├── projects.controller.ts   # Project endpoints with docs
│       ├── dto/
│       │   ├── create-project.dto.ts   # With @ApiProperty decorators
│       │   └── update-project.dto.ts   # With @ApiProperty decorators
│       └── entities/
│           └── project.entity.ts       # With @ApiProperty decorators
├── scripts/
│   └── generate-openapi.ts          # Script to generate static file
├── docs/
│   ├── openapi.json                 # Generated OpenAPI specification
│   ├── OPENAPI.md                   # Full documentation
│   └── OPENAPI_SETUP.md            # This file
└── package.json                     # Added openapi:generate script
```

## API Endpoints

### Public Endpoints (без API key / without API key)
- `GET /` - Welcome message
- `GET /api` - Swagger UI documentation
- `GET /api-json/openapi.json` - OpenAPI JSON specification
- `GET /api-json/openapi.yaml` - OpenAPI YAML specification

### Protected Endpoints (потрібен API key / requires API key)
All project management endpoints require `X-API-Key` header:

- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create new project
- `PATCH /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project
- `GET /projects/stats/count` - Get project count

## Тестування API / Testing the API

### Using Swagger UI
1. Відкрийте / Open: http://localhost:3000/api
2. Натисніть "Authorize" / Click "Authorize"
3. Введіть API key / Enter API key: `vibe-test-api-key-2024-secure-token-12345`
4. Тестуйте endpoints / Test endpoints

### Using curl

```bash
# Get all projects
curl -X GET http://localhost:3000/projects \
  -H "X-API-Key: vibe-test-api-key-2024-secure-token-12345"

# Create a project
curl -X POST http://localhost:3000/projects \
  -H "X-API-Key: vibe-test-api-key-2024-secure-token-12345" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Project",
    "description": "A test project",
    "status": "PLANNING",
    "startDate": "2024-01-15T00:00:00.000Z"
  }'

# Get OpenAPI spec
curl http://localhost:3000/api-json/openapi.json
```

### Using Postman
1. Імпортуйте / Import: http://localhost:3000/api-json/openapi.json
2. Налаштуйте API key в Collection / Set API key in Collection
3. Тестуйте endpoints / Test endpoints

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Generate OpenAPI Spec

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  openapi:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Generate OpenAPI spec
        run: pnpm run openapi:generate

      - name: Upload OpenAPI artifact
        uses: actions/upload-artifact@v3
        with:
          name: openapi-spec
          path: docs/openapi.json

      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add docs/openapi.json
          git commit -m "Update OpenAPI specification" || echo "No changes"
          git push
```

## Frontend Framework Examples

### React with TypeScript

```typescript
// hooks/useApi.ts
import { createClient } from 'openapi-fetch';
import type { paths } from './generated/api-types';

export const api = createClient<paths>({
  baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'X-API-Key': process.env.REACT_APP_API_KEY || '',
  },
});

// components/ProjectsList.tsx
import { api } from '../hooks/useApi';

export function ProjectsList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await api.GET('/projects');
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  return <div>{/* Render projects */}</div>;
}
```

### Vue 3 with TypeScript

```typescript
// composables/useApi.ts
import { createClient } from 'openapi-fetch';
import type { paths } from '../generated/api-types';

export const useApi = () => {
  const client = createClient<paths>({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
      'X-API-Key': import.meta.env.VITE_API_KEY || '',
    },
  });

  return client;
};

// components/ProjectsList.vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useApi } from '../composables/useApi';

const api = useApi();
const projects = ref([]);

onMounted(async () => {
  const { data } = await api.GET('/projects');
  if (data) projects.value = data;
});
</script>
```

### Next.js with App Router

```typescript
// app/api/client.ts
import { createClient } from 'openapi-fetch';
import type { paths } from './generated/api-types';

export const api = createClient<paths>({
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
  headers: {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY!,
  },
});

// app/projects/page.tsx
import { api } from '../api/client';

export default async function ProjectsPage() {
  const { data: projects } = await api.GET('/projects');

  return (
    <div>
      {projects?.map(project => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}
```

## Troubleshooting

### Problem: OpenAPI JSON not accessible
**Solution**: Ensure the server is running:
```bash
pnpm run start:dev
```

### Problem: 401 Unauthorized
**Solution**: Add API key header:
```bash
X-API-Key: vibe-test-api-key-2024-secure-token-12345
```

### Problem: Static generation fails
**Solution**: Install dependencies first:
```bash
pnpm install
pnpm run openapi:generate
```

### Problem: Types not matching in frontend
**Solution**: Regenerate client after API changes:
```bash
pnpm run openapi:generate
# Then regenerate your frontend client
```

## Додаткові ресурси / Additional Resources

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [OpenAPI Specification](https://swagger.io/specification/)
- [Swagger Editor](https://editor.swagger.io/)
- [OpenAPI Generator](https://openapi-generator.tech/)
- [OpenAPI Fetch](https://github.com/drwpow/openapi-typescript)

## Підтримка / Support

Для питань та проблем:
For questions and issues:

- Перегляньте документацію / Review documentation: `docs/OPENAPI.md`
- Перевірте Swagger UI / Check Swagger UI: http://localhost:3000/api
- Перегляньте згенерований файл / Review generated file: `docs/openapi.json`

---

**Примітка**: Після кожної зміни API обов'язково регенеруйте специфікацію:
**Note**: After each API change, make sure to regenerate the specification:

```bash
pnpm run openapi:generate
```
