import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  console.log(`
      Server running on: http://localhost:${process.env.SERVER_PORT ?? 3000}
    `);

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5200',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe()); // Allow class-validator
  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
