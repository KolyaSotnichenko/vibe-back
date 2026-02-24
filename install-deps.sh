#!/bin/bash

echo "Installing required dependencies for Project API..."
npm install @nestjs/swagger swagger-ui-express class-validator class-transformer

echo ""
echo "✅ Dependencies installed successfully!"
echo ""
echo "To start the application, run:"
echo "  npm run start:dev"
echo ""
echo "API will be available at: http://localhost:3000"
echo "Swagger docs at: http://localhost:3000/api"
echo ""
echo "Test API Key: vibe-test-api-key-2024-secure-token-12345"
