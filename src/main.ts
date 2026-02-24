import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS if needed
  app.enableCors();

  // Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('ToDo API')
    .setDescription(
      'Simple ToDo API with in-memory storage. All endpoints require API key authentication via X-API-Key header.',
    )
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-Key',
        in: 'header',
        description:
          'API key for authentication. Test key: vibe-test-api-key-2024-secure-token-12345',
      },
      'api-key',
    )
    .addTag('Todos', 'Todo management endpoints')
    .addServer('http://localhost:3000', 'Development server')
    .setContact(
      'Development Team',
      'https://example.com',
      'support@example.com',
    )
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  // Serve Swagger UI at /api
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Vibe API Documentation',
  });

  // Serve OpenAPI JSON at /api-json (public endpoint for frontend consumption)
  SwaggerModule.setup('api-json', app, document, {
    jsonDocumentUrl: 'openapi.json',
    yamlDocumentUrl: 'openapi.yaml',
    swaggerOptions: {
      displayRequestDuration: true,
    },
  });

  const port = process.env.PORT ?? 3000;
  await app.listen(port);

  console.log(`\n🚀 Application is running on: http://localhost:${port}`);
  console.log(`📚 Swagger documentation: http://localhost:${port}/api`);
  console.log(
    `📄 OpenAPI JSON: http://localhost:${port}/api-json/openapi.json`,
  );
  console.log(
    `📋 OpenAPI YAML: http://localhost:${port}/api-json/openapi.yaml`,
  );
  console.log(`🔑 Test API Key: vibe-test-api-key-2024-secure-token-12345\n`);
}
void bootstrap();
