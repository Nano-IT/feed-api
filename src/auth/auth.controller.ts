import {Controller, Post, Body, Get, Req, Patch} from '@nestjs/common';
import {AuthService} from './auth.service';
import {RegisterDto} from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
import {Public} from '@/shared/decorators/public';
import {Request} from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }

  @Get('admin/user')
  async authenticatedUser(@Req() request: Request) {
    return this.authService.getCurrentUser(request.header('authorization'));
  }

  @Patch('admin/info')
  async updateProfile(
    @Req() request: Request,
    @Body('email') email,
    @Body('firstName') firstName,
    @Body('lastName') lastName,
  ) {
    return this.authService.updateUserInfo(request.header('authorization'), {
      firstName,
      lastName,
      email,
    });
  }
}
