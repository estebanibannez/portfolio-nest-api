import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  //pipe global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //remueve datos de entrada basura
      forbidNonWhitelisted: true, //notifica mensaje cuando una propiedad no existe
    }),
  );

  await app.listen(3000);
}
bootstrap();
