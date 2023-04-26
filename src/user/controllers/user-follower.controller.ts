import {Controller, Post, Param, Delete} from '@nestjs/common';
import {UserFollowerService} from '@/user/services/user-follower.service';

@Controller('profiles/:username/follow')
export class UserFollowerController {
  constructor(private readonly profileFollowService: UserFollowerService) {}

  @Post()
  follow(@Param('username') username: string) {
    return this.profileFollowService.follow(username);
  }

  @Delete()
  unfollow(@Param('username') username: string) {
    return this.profileFollowService.unfollow(username);
  }
}
