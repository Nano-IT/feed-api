import {
  Controller,
  Param,
  Get,
  Put,
  Body,
  SerializeOptions,
} from '@nestjs/common';
import {GROUP_USER_PROFILE} from '@/user/consts';
import {ProfileService} from '@/profile/services/profile.service';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  @SerializeOptions({
    groups: [GROUP_USER_PROFILE],
  })
  getCurrentUser() {
    return this.profileService.getCurrentUser();
  }

  @Put('me')
  async updateProfile(@Body() body) {
    return await this.profileService.updateProfile(body);
  }

  @Get(':slug')
  @SerializeOptions({
    groups: [GROUP_USER_PROFILE],
  })
  getUserUser(@Param('slug') slug: string) {
    return this.profileService.getProfile(slug);
  }
}
