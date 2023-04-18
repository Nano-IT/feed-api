import {Injectable} from '@nestjs/common';
import {UserService} from '@/user/user.service';
import {User} from '@/user/entities/user.entity';

@Injectable()
export class ProfileFollowService {
  constructor(private userService: UserService) {}

  async follow(username: string, userId: number) {
    const user = await this.userService.findOne({
      where: {username},
      relations: {
        followers: true,
      },
    });
    const follower = new User();
    follower.id = userId;
    user.followers.push(follower);
    await this.userService.save(user);
    return {};
  }

  async unfollow(username: string, userId: number) {
    const user = await this.userService.findOne({
      where: {username},
      relations: {
        followers: true,
      },
    });

    user.followers = user.followers.filter(
      (follower) => follower.id !== userId,
    );
    await this.userService.save(user);
    return {};
  }
}
