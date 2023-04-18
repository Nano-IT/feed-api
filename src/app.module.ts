import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserModule} from './user/user.module';
import {AuthModule} from './auth/auth.module';
import {ArticlesModule} from './articles/articles.module';
import {TagsModule} from './tags/tags.module';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {ProfileModule} from './profile/profile.module';
import {ArticleCommentModule} from './article-comment/article-comment.module';
import {TypeormConfigService} from '@/shared/services/typeorm-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ['.env']}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useClass: TypeormConfigService,
    }),
    UserModule,
    AuthModule,
    ArticlesModule,
    TagsModule,
    ProfileModule,
    ArticleCommentModule,
  ],
})
export class AppModule {}
