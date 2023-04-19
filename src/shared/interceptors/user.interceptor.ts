import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {ClsService} from 'nestjs-cls';
import {Observable} from 'rxjs';
import {JwtService} from '@/auth/services/jwt.service';
import {UserService} from '@/user/user.service';

@Injectable()
export class UserIpInterceptor implements NestInterceptor {
  constructor(
    private readonly cls: ClsService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    return new Promise((resolve) => {
      const request = context.switchToHttp().getRequest();
      const token = request.header('authorization');

      if (token) {
        const {id} = this.jwtService.verify(token);
        this.userService.getCurrentUser(id).then((user) => {
          this.cls.set('user', user);
          resolve(next.handle());
        });
      }
    });
  }
}
