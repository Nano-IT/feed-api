import {Module} from '@nestjs/common';
import {ProfileService} from './services/profile.service';
import {ProfileController} from './controllers/profile.controller';
import {UserModule} from '@/user/user.module';
import {ProfileFollowController} from './controllers/profile-follow.controller';
import {ProfileFollowService} from './services/profile-follow.service';

@Module({
  controllers: [ProfileController, ProfileFollowController],
  providers: [ProfileService, ProfileFollowService],
  imports: [UserModule],
})
export class ProfileModule {}
