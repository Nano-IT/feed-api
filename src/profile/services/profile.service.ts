import {Injectable} from '@nestjs/common';
import {UserService} from '@/user/user.service';
import {ClsService} from 'nestjs-cls';
import {CurrentUserDto} from '@/user/dto/current-user.dto';

@Injectable()
export class ProfileService {
  constructor(private userService: UserService, private cls: ClsService) {}

  async getProfile(username: string) {
    const user = await this.userService.findOne({
      where: {username},
      relations: {
        followers: true,
      },
    });

    return new CurrentUserDto(user);
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
