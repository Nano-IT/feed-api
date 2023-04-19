import {Controller, Post, Param, Delete} from '@nestjs/common';
import {ProfileFollowService} from '@/profile/services/profile-follow.service';

@Controller('profiles/:username/follow')
export class ProfileFollowController {
  constructor(private readonly profileFollowService: ProfileFollowService) {}

  @Post()
  follow(@Param('username') username: string) {
    return this.profileFollowService.follow(username);
  }

  @Delete()
  unfollow(@Param('username') username: string) {
    return this.profileFollowService.unfollow(username);
  }
}
