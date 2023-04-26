import {Module} from '@nestjs/common';
import {UserService} from './services/user.service';
import {UserController} from './controllers/user.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {HashService} from '@/shared/services/hash.service';
import {UserProfileController} from '@/user/controllers/user-profile.controller';
import {UserFollowerController} from '@/user/controllers/user-follower.controller';
import {UserProfileService} from '@/user/services/user-profile.service';
import {UserFollowerService} from '@/user/services/user-follower.service';

@Module({
  controllers: [UserController, UserProfileController, UserFollowerController],
  providers: [
    UserService,
    HashService,
    UserProfileService,
    UserFollowerService,
  ],
  imports: [TypeOrmModule.forFeature([User])],
  exports: [UserService],
})
export class UserModule {}
