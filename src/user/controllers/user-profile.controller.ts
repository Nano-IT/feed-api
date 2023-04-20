import {
  Controller,
  Param,
  Get,
  Put,
  Body,
  SerializeOptions,
} from '@nestjs/common';
import {GROUP_USER_PROFILE} from '@/user/consts';
import {UserProfileService} from '@/user/services/user-profile.service';

@Controller('profiles')
export class UserProfileController {
  constructor(private readonly profileService: UserProfileService) {}

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
