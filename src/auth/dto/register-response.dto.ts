import {Exclude} from 'class-transformer';
import {User} from '@/user/entities/user.entity';

export class RegisterResponseDto extends User {
  @Exclude()
  password: string;

  @Exclude()
  passwordConfirmation: string;

  @Exclude()
  isAmbassador: boolean;

  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;

  constructor(partial: Partial<User & {token: string}>) {
    super();
    Object.assign(this, partial);
  }
}
