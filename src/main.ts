import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  console.log(`
    Server running on:        http://localhost:${process.env.SERVER_PORT ?? 3000}
    Playground running on:    http://localhost:${process.env.SERVER_PORT ?? 3000}/graphql
    Swagger runnig on:        http://localhost:${process.env.SERVER_PORT ?? 3000}/api
    Swagger-json runnig on:   http://localhost:${process.env.SERVER_PORT ?? 3000}/api-json
  `);

  const app = await NestFactory.create(AppModule);
  /* --------------------------------------- swagger configs -------------------------------------- */
  const configSwagger = new DocumentBuilder()
    .setTitle('Swagger Api')
    .setDescription('Routes in my project')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api', app, documentFactory);

  /* ----------------------------------------- cors config ---------------------------------------- */
  app.enableCors({
    origin: 'http://localhost:5200',
    credentials: true,
  });

  /* ------------------------------- cookies and validation configs ------------------------------- */
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe()); // Allow class-validator

  /* --------------------------------------- running server --------------------------------------- */
  await app.listen(process.env.SERVER_PORT ?? 3000);
}
bootstrap();
