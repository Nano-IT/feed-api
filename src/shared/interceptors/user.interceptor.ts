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
    return new Promise(async (resolve) => {
      const request = context.switchToHttp().getRequest();
      const token = request.header('authorization');

      if (token) {
        const {id} = await this.jwtService.verifyAsync(token);
        const user = await this.userService.getCurrentUser(id);
        this.cls.set('user', user);
        resolve(next.handle());
      }
    });
  }
}
