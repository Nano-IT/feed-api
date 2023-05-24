import {Controller, Post, Param, Delete} from '@nestjs/common';
import {UserFollowerService} from '@/user/services/user-follower.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@Controller('profiles/:username/follow')
@ApiTags('User follower')
@ApiBearerAuth()
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
