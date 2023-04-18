import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {jwtConstants} from '@/auth/consts/jwtConstants';
import {IS_PUBLIC_KEY} from '@/shared/decorators/public';
import {Reflector} from '@nestjs/core';

export const RequestUser = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const {authorization: accessToken} = request.headers;

    if (accessToken) {
      try {
        const jwt = new JwtService();
        return jwt.verify(accessToken.replace('Bearer', '').trim(), {
          secret: jwtConstants.secret,
        });
      } catch (ex) {
        throw new HttpException('Token expired!', HttpStatus.UNAUTHORIZED);
      }
    }

    const reflector = new Reflector();
    const isPublic = reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
  },
);
