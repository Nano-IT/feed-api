import {Controller, Param, Get, Put, Body} from '@nestjs/common';
import {ProfileService} from '../services/profile.service';
import {RequestUser} from '@/shared/decorators/request-user.decorator';
import {User} from '@/user/entities/user.entity';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('me')
  getCurrentUser(@RequestUser() currentUser: User) {
    return this.profileService.getCurrentUser(currentUser);
  }

  @Put('me')
  async updateProfile(@RequestUser() currentUser: User, @Body() body) {
    return await this.profileService.updateProfile(body, currentUser);
  }

  @Get(':slug')
  getUserUser(@Param('slug') slug: string, @RequestUser() currentUser: User) {
    return this.profileService.getProfile(slug, currentUser);
  }
}
