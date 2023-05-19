import {Controller, Post, Body, SerializeOptions} from '@nestjs/common';
import {AuthService} from './services/auth.service';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import {Public} from '@/shared/decorators/public';
import {GROUP_USER_PROFILE} from '@/user/consts';
import {ApiResponse, ApiTags} from '@nestjs/swagger';
import {CredentialsDto} from '@/auth/dto/credentials.dto';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @SerializeOptions({
    groups: [GROUP_USER_PROFILE],
  })
  @ApiResponse({type: CredentialsDto})
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  @SerializeOptions({
    groups: [GROUP_USER_PROFILE],
  })
  @ApiResponse({type: CredentialsDto})
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
