import {NestFactory, Reflector} from '@nestjs/core';
import {AppModule} from './app.module';
import {ClassSerializerInterceptor, ValidationPipe} from '@nestjs/common';
import {GlobalExceptionFilter} from '@/shared/filters/global-error-handler.filter';
import {ValidationExceptionFilter} from '@/shared/filters/validation.filter';
import {ValidationException} from '@/shared/exceptions/validation.exception';
import {ClsMiddleware} from 'nestjs-cls';

import {ExpressAdapter, NestExpressApplication} from '@nestjs/platform-express';
import * as express from 'express';
import * as functions from 'firebase-functions';
const server: express.Express = express();

export const createNestServer = async (expressInstance: express.Express) => {
  const adapter = new ExpressAdapter(expressInstance);
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
    {},
  );
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
  return app.init();
};
createNestServer(server)
  .then(() => console.log('Nest Ready'))
  .catch((err) => console.error('Nest broken', err));
export const api: functions.HttpsFunction = functions.https.onRequest(server);
