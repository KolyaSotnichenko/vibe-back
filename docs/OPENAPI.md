# OpenAPI Specification Documentation

## Overview

Цей проект автоматично генерує повну OpenAPI 3.0 специфікацію для всього API. Фронтенд може використовувати цю специфікацію для автоматичної генерації UI, клієнтів API, валідації та документації.

This project automatically generates a complete OpenAPI 3.0 specification for the entire API. The frontend can use this specification to automatically generate UI, API clients, validation, and documentation.

## Accessing the OpenAPI Specification

### Method 1: Live Endpoints (Recommended for Development)

When the application is running, the OpenAPI specification is available at:

- **JSON Format**: `http://localhost:3000/api-json/openapi.json`
- **YAML Format**: `http://localhost:3000/api-json/openapi.yaml`
- **Interactive Swagger UI**: `http://localhost:3000/api`

These endpoints are **public** and do not require API key authentication.

### Method 2: Static File Generation

Generate a static `openapi.json` file that can be committed to the repository:

```bash
# First, install dependencies
pnpm install

# Generate the OpenAPI JSON file
pnpm run openapi:generate
```

This creates `docs/openapi.json` with the complete API specification.

## Installation

The OpenAPI/Swagger functionality requires these packages:

```bash
pnpm add @nestjs/swagger swagger-ui-express
```

Or using npm:

```bash
npm install @nestjs/swagger swagger-ui-express
```

## Frontend Integration Examples

### 1. Using OpenAPI Generator

Generate TypeScript client automatically:

```bash
# Install openapi-generator-cli
npm install @openapitools/openapi-generator-cli -g

# Generate TypeScript client
openapi-generator-cli generate \
  -i http://localhost:3000/api-json/openapi.json \
  -g typescript-fetch \
  -o ./src/api-client

# Or from static file
openapi-generator-cli generate \
  -i docs/openapi.json \
  -g typescript-fetch \
  -o ./src/api-client
```

### 2. Using swagger-typescript-api

```bash
# Install package
npm install swagger-typescript-api

# Generate API client
npx swagger-typescript-api \
  -p http://localhost:3000/api-json/openapi.json \
  -o ./src/api \
  --modular \
  --axios
```

### 3. Direct Fetch in React/Next.js

```typescript
// Fetch the OpenAPI spec
const response = await fetch('http://localhost:3000/api-json/openapi.json');
const openApiSpec = await response.json();

// Use it to dynamically generate UI
console.log('Available endpoints:', Object.keys(openApiSpec.paths));
console.log('Data models:', Object.keys(openApiSpec.components.schemas));
```

### 4. Using React OpenAPI Client

```typescript
import { createClient } from 'openapi-fetch';
import type { paths } from './generated/api'; // Generated from OpenAPI spec

const client = createClient<paths>({
  baseUrl: 'http://localhost:3000',
  headers: {
    'X-API-Key': 'vibe-test-api-key-2024-secure-token-12345',
  },
});

// Fully typed API calls
const { data, error } = await client.GET('/projects');
if (data) {
  console.log('Projects:', data);
}
```

## OpenAPI Specification Contents

The generated specification includes:

### 1. API Information
- Title, description, version
- Server URLs (development, production)
- Contact information
- License information

### 2. Authentication
- API Key security scheme (`X-API-Key` header)
- Public endpoints marked appropriately

### 3. Endpoints (Paths)
All API endpoints with:
- HTTP methods (GET, POST, PATCH, DELETE)
- Parameters (path, query, body)
- Request body schemas
- Response schemas and status codes
- Detailed descriptions

### 4. Data Models (Schemas)
Complete TypeScript-based schemas:
- `Project` - Project entity with all fields
- `CreateProjectDto` - Data for creating projects
- `UpdateProjectDto` - Data for updating projects
- `ProjectStatus` - Enum of possible statuses
- Validation rules (min/max length, types, required fields)

### 5. Tags
Organized by feature:
- **General** - API information endpoints
- **Projects** - Project management
- **OpenAPI** - Specification endpoints

## Example OpenAPI Structure

```json
{
  "openapi": "3.0.0",
  "info": {
    "title": "Vibe Backend API",
    "version": "1.0",
    "description": "Backend API for the Vibe project management system..."
  },
  "servers": [
    { "url": "http://localhost:3000", "description": "Development server" }
  ],
  "paths": {
    "/projects": {
      "get": {
        "tags": ["Projects"],
        "summary": "Get all projects",
        "parameters": [...],
        "responses": {...}
      },
      "post": {
        "tags": ["Projects"],
        "summary": "Create a new project",
        "requestBody": {...},
        "responses": {...}
      }
    }
  },
  "components": {
    "schemas": {
      "Project": {...},
      "CreateProjectDto": {...},
      "UpdateProjectDto": {...}
    },
    "securitySchemes": {
      "api-key": {
        "type": "apiKey",
        "in": "header",
        "name": "X-API-Key"
      }
    }
  }
}
```

## Using in Frontend Applications

### Vue.js / Nuxt.js Example

```typescript
// composables/useApi.ts
import { createClient } from 'openapi-fetch';

export const useApi = () => {
  const client = createClient({
    baseUrl: 'http://localhost:3000',
    headers: {
      'X-API-Key': 'vibe-test-api-key-2024-secure-token-12345',
    },
  });

  return client;
};

// In your component
const api = useApi();
const projects = await api.GET('/projects');
```

### React / Next.js Example

```typescript
// lib/api.ts
import { createClient } from 'openapi-fetch';

export const api = createClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
  headers: {
    'X-API-Key': process.env.NEXT_PUBLIC_API_KEY,
  },
});

// In your component
import { api } from '@/lib/api';

const { data: projects } = await api.GET('/projects', {
  params: {
    query: { status: 'IN_PROGRESS' }
  }
});
```

## Benefits of Using OpenAPI

1. **Type Safety**: Auto-generated TypeScript types prevent errors
2. **Auto-completion**: IDEs provide intelligent code completion
3. **Validation**: Request/response validation based on schemas
4. **Documentation**: Interactive API docs via Swagger UI
5. **Testing**: Import into Postman, Insomnia, etc.
6. **Code Generation**: Generate clients for any language
7. **API Versioning**: Track API changes over time
8. **Contract-First Development**: Frontend and backend can develop in parallel

## Validation Examples

The OpenAPI spec includes all validation rules:

```typescript
// From CreateProjectDto
{
  "name": {
    "type": "string",
    "minLength": 1,
    "maxLength": 200,
    "example": "Website Redesign"
  },
  "status": {
    "type": "string",
    "enum": ["PLANNING", "IN_PROGRESS", "ON_HOLD", "COMPLETED", "CANCELLED"],
    "default": "PLANNING"
  },
  "startDate": {
    "type": "string",
    "format": "date-time",
    "example": "2024-01-15T00:00:00.000Z"
  }
}
```

## Continuous Integration

Add to your CI/CD pipeline:

```yaml
# .github/workflows/ci.yml
- name: Generate OpenAPI Spec
  run: |
    npm install
    npm run openapi:generate

- name: Upload OpenAPI Spec
  uses: actions/upload-artifact@v3
  with:
    name: openapi-spec
    path: docs/openapi.json
```

## Tools and Resources

- **Swagger Editor**: https://editor.swagger.io/ - Validate and edit specs
- **OpenAPI Generator**: https://openapi-generator.tech/ - Generate clients
- **Swagger UI**: Built-in at `/api` endpoint
- **Postman**: Import OpenAPI spec directly
- **Insomnia**: Import OpenAPI spec for testing

## Troubleshooting

### OpenAPI spec not available
Ensure the server is running:
```bash
pnpm run start:dev
```

### Static file generation fails
Install dependencies first:
```bash
pnpm install
```

### Types not matching
Regenerate the client after API changes:
```bash
pnpm run openapi:generate
```

## Support

For issues or questions:
- Check the interactive docs: http://localhost:3000/api
- Review this documentation
- Check the generated `docs/openapi.json` file

---

**Примітка**: Специфікація OpenAPI автоматично оновлюється при зміні API. Переконайтеся, що генеруєте нову версію після кожної зміни ендпоінтів або моделей даних.

**Note**: The OpenAPI specification is automatically updated when the API changes. Make sure to regenerate after any endpoint or data model changes.
