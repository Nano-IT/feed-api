import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {
  ClassSerializerInterceptor,
  HttpException,
  HttpStatus,
  ValidationPipe,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const validationErrors = errors.reduce(
          (acc, {property, constraints}) => {
            acc[property] = Object.values(constraints);
            return acc;
          },
          {},
        );
        return new HttpException(
          {errors: validationErrors},
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      },
    }),
  );
  app.enableCors({
    origin: '*',
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
