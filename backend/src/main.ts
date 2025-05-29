import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription(`## Task Management API Documentation
      \nThis is the official API documentation for the Task Management Application.
      \n### Authentication
      Most endpoints require authentication. Use the **Authorize** button to set your JWT token.
      \n### Response Codes
      - 200: Success
      - 201: Created
      - 400: Bad Request
      - 401: Unauthorized
      - 403: Forbidden
      - 404: Not Found
      - 500: Internal Server Error`)
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name should be used as the @ApiBearerAuth() name in your controllers
    )
    .addTag('auth', 'Authentication related endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('tasks', 'Task management endpoints')
    .addTag('projects', 'Project management endpoints')
    .addTag('dashboard', 'Dashboard statistics endpoints')
    .addServer('http://localhost:3002', 'Development Server')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap(); 