import {Injectable} from '@nestjs/common';
import {UserService} from '@/user/user.service';
import {ClsService} from 'nestjs-cls';

@Injectable()
export class ProfileService {
  constructor(private userService: UserService, private cls: ClsService) {}

  async getProfile(username: string) {
    return await this.userService.findOne({
      where: {username},
      relations: {
        followers: true,
      },
    });
  }

  async updateProfile(body: any) {
    const currentUser = this.cls.get('user');
    const {username, email, bio} = body;
    return await this.userService.update(currentUser.username, {
      username,
      email,
      bio,
    });
  }

  getCurrentUser() {
    const currentUser = this.cls.get('user');
    return this.userService.findOneBy({username: currentUser.username});
  }
}
