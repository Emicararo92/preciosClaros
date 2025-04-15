/* eslint-disable @typescript-eslint/no-floating-promises */
import * as dotenv from 'dotenv';
import * as path from 'path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

try {
  dotenv.config({ path: path.resolve(__dirname, '../.env.production') });
} catch (error) {
  console.error('Error loading environment variables:', error);
}

// Verificar si el token y otras variables están cargadas

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000', 'https://meconviene.vercel.app'], // localhost y Vercel
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(process.env.PORT || 8080);
}

bootstrap();
