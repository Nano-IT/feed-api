import {Controller, Param, Get, Put, Body} from '@nestjs/common';
import {ProfileService} from '../services/profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  getCurrentUser() {
    return this.profileService.getCurrentUser();
  }

  @Put('me')
  async updateProfile(@Body() body) {
    return await this.profileService.updateProfile(body);
  }

  @Get(':slug')
  getUserUser(@Param('slug') slug: string) {
    return this.profileService.getProfile(slug);
  }
}
