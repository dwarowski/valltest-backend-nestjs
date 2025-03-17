import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('dstu');
  app.useGlobalPipes(new ValidationPipe());

  // Включаем CORS
  app.enableCors({
    origin: '*', // Разрешаем доступ с любого домена (лучше указать конкретный)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  const config = new DocumentBuilder()
    .setTitle('Система тестрования ДГТУ')
    .setDescription(``)
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('dstu', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
    },
  });

  const port = process.env.PORT ?? 3000;
  console.log('port = ', port);
  const server = process.env.SERVER ?? 'localhost';
  await app.listen(port, server);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
