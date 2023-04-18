import {Controller, Post, Param, Delete} from '@nestjs/common';
import {RequestUser} from '@/shared/decorators/request-user.decorator';
import {User} from '@/user/entities/user.entity';
import {ProfileFollowService} from '@/profile/services/profile-follow.service';

@Controller('profiles/:username/follow')
export class ProfileFollowController {
  constructor(private readonly profileFollowService: ProfileFollowService) {}

  @Post()
  follow(
    @Param('username') username: string,
    @RequestUser() currentUser: User,
  ) {
    return this.profileFollowService.follow(username, currentUser.id);
  }

  @Delete()
  unfollow(
    @Param('username') username: string,
    @RequestUser() currentUser: User,
  ) {
    return this.profileFollowService.unfollow(username, currentUser.id);
  }
}
