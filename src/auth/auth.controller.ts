import {Controller, Post, Body, SerializeOptions} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import {Public} from '@/shared/decorators/public';
import {GROUP_USER_PROFILE} from '@/user/consts';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @SerializeOptions({
    groups: [GROUP_USER_PROFILE],
  })
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  @SerializeOptions({
    groups: [GROUP_USER_PROFILE],
  })
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
