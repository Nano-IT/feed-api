import {User} from '@/user/entities/user.entity';
import {Exclude} from 'class-transformer';

export class CurrentUserDto {
  @Exclude()
  password: string;

  @Exclude()
  image: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
