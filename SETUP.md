# Project Setup Guide

## Overview
This backend application provides a complete Project management API with the following features:
- Full CRUD operations for Projects
- In-memory storage (no database required)
- API key authentication
- Swagger/OpenAPI documentation
- Input validation and error handling

## Prerequisites
Node.js 16+ and npm

## Required Dependencies

The following dependencies need to be installed:

```bash
npm install @nestjs/swagger swagger-ui-express class-validator class-transformer
```

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Install additional required packages:
```bash
npm install @nestjs/swagger swagger-ui-express class-validator class-transformer
```

3. Start the development server:
```bash
npm run start:dev
```

4. Access the application:
   - API: http://localhost:3000
   - Swagger Documentation: http://localhost:3000/api

## API Authentication

All endpoints require API key authentication via the `X-API-Key` header.

**Test API Key:** `vibe-test-api-key-2024-secure-token-12345`

### Example using curl:
```bash
curl -X GET http://localhost:3000/projects \
  -H "X-API-Key: vibe-test-api-key-2024-secure-token-12345"
```

### Example using Swagger UI:
1. Open http://localhost:3000/api
2. Click "Authorize" button
3. Enter: `vibe-test-api-key-2024-secure-token-12345`
4. Click "Authorize" and "Close"
5. Now you can test all endpoints

## Available Endpoints

### Projects

- **POST /projects** - Create a new project
- **GET /projects** - Get all projects (with optional filters)
  - Query params: `?status=PLANNING` or `?tag=web`
- **GET /projects/:id** - Get a specific project
- **PATCH /projects/:id** - Update a project
- **DELETE /projects/:id** - Delete a project
- **GET /projects/stats/count** - Get total project count

### Project Statuses

- `PLANNING`
- `IN_PROGRESS`
- `ON_HOLD`
- `COMPLETED`
- `CANCELLED`

## Example: Creating a Project

```bash
curl -X POST http://localhost:3000/projects \
  -H "Content-Type: application/json" \
  -H "X-API-Key: vibe-test-api-key-2024-secure-token-12345" \
  -d '{
    "name": "Website Redesign",
    "description": "Complete overhaul of company website",
    "status": "PLANNING",
    "startDate": "2024-01-15T00:00:00.000Z",
    "endDate": "2024-06-30T00:00:00.000Z",
    "owner": "John Doe",
    "tags": ["web", "frontend", "design"]
  }'
```

## Project Structure

```
src/
├── common/
│   ├── decorators/
│   │   └── public.decorator.ts    # Decorator for public routes
│   └── guards/
│       └── api-key.guard.ts       # API key authentication guard
├── projects/
│   ├── dto/
│   │   ├── create-project.dto.ts  # DTO for creating projects
│   │   └── update-project.dto.ts  # DTO for updating projects
│   ├── entities/
│   │   └── project.entity.ts      # Project entity definition
│   ├── projects.controller.ts     # REST API endpoints
│   ├── projects.service.ts        # Business logic
│   └── projects.module.ts         # Module configuration
├── app.module.ts                  # Main application module
└── main.ts                        # Application entry point
```

## Security Features

- API key authentication on all endpoints
- Input validation using class-validator
- Type-safe DTOs with class-transformer
- Secure headers and CORS enabled
- No SQL injection risks (in-memory storage)

## Development

- **Build**: `npm run build`
- **Start**: `npm run start`
- **Dev mode**: `npm run start:dev`
- **Lint**: `npm run lint`
- **Test**: `npm run test`

## Notes

- Data is stored in memory and will be lost when the server restarts
- For production use, integrate a real database (PostgreSQL, MongoDB, etc.)
- The API key is hardcoded for testing purposes - use environment variables in production
