import {Injectable} from '@nestjs/common';
import {UserService} from '@/user/user.service';
import {User} from '@/user/entities/user.entity';

@Injectable()
export class ProfileService {
  constructor(private userService: UserService) {}

  async getProfile(username: string, currentUser: User) {
    const user = await this.userService.findOne({
      where: {username},
      relations: {
        followers: true,
      },
    });

    if (currentUser.username !== username) {
      return {
        ...user,
        following: user.followers.some((item) => item.id === currentUser.id),
      };
    }

    return user;
  }
  async updateProfile(body: any, currentUser: User) {
    const {username, email, bio} = body;
    return await this.userService.update(currentUser.id, {
      username,
      email,
      bio,
    });
  }

  getCurrentUser(currentUser) {
    return this.userService.findOneBy({id: currentUser.id});
  }
}
