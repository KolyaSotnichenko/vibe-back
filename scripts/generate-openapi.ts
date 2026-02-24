import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Script to generate static OpenAPI JSON specification
 * This creates a openapi.json file in the root directory
 */
async function generateOpenApiSpec() {
  console.log('🔧 Starting OpenAPI specification generation...\n');

  // Create NestJS application
  const app = await NestFactory.create(AppModule, {
    logger: false, // Disable logging for cleaner output
  });

  // Apply global validation pipe (same as in main.ts)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger configuration (same as in main.ts)
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

  // Generate OpenAPI document
  const document = SwaggerModule.createDocument(app, config);

  // Save OpenAPI JSON to root directory
  const outputPath = path.join(__dirname, '..', 'openapi.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));

  console.log('✅ OpenAPI specification generated successfully!');
  console.log(`📄 File location: ${outputPath}`);
  console.log(`📊 Total endpoints: ${Object.keys(document.paths).length}`);
  console.log(
    `📦 Components: ${Object.keys(document.components?.schemas || {}).length} schemas`,
  );
  console.log('\n💡 Usage:');
  console.log('   - Import this file into your frontend application');
  console.log('   - Use tools like openapi-generator to create API clients');
  console.log(
    '   - Import into Postman, Insomnia, or other API testing tools\n',
  );

  await app.close();
  process.exit(0);
}

// Run the generator
generateOpenApiSpec().catch((error) => {
  console.error('❌ Error generating OpenAPI specification:', error);
  process.exit(1);
});
