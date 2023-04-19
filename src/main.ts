import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
import {GlobalExceptionFilter} from '@/shared/filters/global-error-handler.filter';
import {ValidationExceptionFilter} from '@/shared/filters/validation.filter';
import {ValidationException} from '@/shared/exceptions/validation.exception';
import {ClsService} from 'nestjs-cls';
import {UserIpInterceptor} from '@/shared/interceptors/user.interceptor';
import {JwtService} from '@/auth/services/jwt.service';
import {UserService} from '@/user/user.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
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
  app.useGlobalInterceptors(
    new UserIpInterceptor(
      app.get(ClsService),
      app.get(JwtService),
      app.get(UserService),
    ),
  );
  await app.listen(3000);
}
bootstrap();
