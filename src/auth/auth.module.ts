import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UserModule} from '@/user/user.module';
import {HashService} from '@/shared/services/hash.service';
import {JwtModule, JwtService} from '@nestjs/jwt';
import {APP_GUARD} from '@nestjs/core';
import {JwtAuthGuard} from './auth.guard';
import {JwtStrategy} from './strategies/jwt.strategy';
import {ConfigService} from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    HashService,
    JwtService,
    JwtStrategy,
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'some_jwt_secret',
      signOptions: {expiresIn: '2h'},
    }),
  ],
})
export class AuthModule {}
