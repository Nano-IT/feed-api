import {User} from '@/user/entities/user.entity';
import {Exclude, Expose, Transform} from 'class-transformer';
import {ClsServiceManager} from 'nestjs-cls';

export class CurrentUserDto {
  @Exclude()
  password: string;

  @Expose()
  @Transform(({obj}) => {
    const cls = ClsServiceManager.getClsService();
    const currentUser = cls.get('user');
    return obj.followers.some((item) => item.id === currentUser.id);
  })
  following: boolean;

  @Exclude()
  followers: User[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
