import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CORS } from 'src/constants/cors';
import morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    // Configurar títulos de documentación
    const options = new DocumentBuilder()
      .setTitle('MongoDB Ibanez Portfolio REST API')
      .setDescription('API REST para portafolio personal con MongoDB')
      .setVersion('1.0')
      .build();

    app.setGlobalPrefix('api');
    const configService = app.get(ConfigService);
    // lectura consola de llamadas al api
    app.use(morgan('dev'));
    // habilitación de cors
    app.enableCors(CORS);
    //pipe global
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, //remueve datos de entrada basura
        forbidNonWhitelisted: true, //notifica mensaje cuando una propiedad no existe
      }),
    );

    // Crear documentación
    const document = SwaggerModule.createDocument(app, options);

    // La ruta en que se sirve la documentación
    SwaggerModule.setup('docs', app, document);

    await app.listen(configService.get('PORT'));

    console.log(`Application running on: ${await app.getUrl()}`);
  } catch (error) {
    console.log('Ocurrió un error: ' + error.message);
  }
}
bootstrap();
