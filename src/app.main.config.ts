import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

function createApiDocument(app: INestApplication): OpenAPIObject {
  const openApiConfig = new DocumentBuilder()
    .setTitle('test swagger panel')
    .setDescription('you can test the API without a frontend here')
    .addServer('/api')
    .build();
  return SwaggerModule.createDocument(app, openApiConfig);
}

export function setupApiDocumentation(app: INestApplication): void {
  SwaggerModule.setup('swagger', app, createApiDocument(app));
}

export function configureApp(app: INestApplication): void {
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
      transform: true, // transforms plain objects into entity instances
    }),
  );
  app.enableCors({ origin: '*' });
  setupApiDocumentation(app);
  app.setGlobalPrefix('api');
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
}
