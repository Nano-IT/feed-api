import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
import {GlobalExceptionFilter} from '@/shared/filters/global-error-handler.filter';
import {ValidationExceptionFilter} from '@/shared/filters/validation.filter';
import {ValidationException} from '@/shared/exceptions/validation.exception';
import {ClsMiddleware} from 'nestjs-cls';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

export const createServer = async () => {
  const app = await NestFactory.create(AppModule, {});
  app.useGlobalFilters(
    new GlobalExceptionFilter(),
    new ValidationExceptionFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new ValidationException(errors),
    }),
  );
  app.enableCors({
    origin: '*',
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(
    new ClsMiddleware({
      /* useEnterWith: true */
    }).use,
  );
  const config = new DocumentBuilder()
    .setTitle('Feed API')
    .setDescription('The feed API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(4000);
};

createServer();
