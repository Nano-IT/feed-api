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
import {DataSource} from 'typeorm';
import {AsyncLocalStorage} from 'async_hooks';
import {ClsGuard, ClsModule, ClsService} from 'nestjs-cls';
import {APP_GUARD} from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({envFilePath: ['.env']}),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useClass: TypeormConfigService,
      dataSourceFactory: async (options) => {
        return await new DataSource(options).initialize();
      },
    }),
    UserModule,
    AuthModule,
    ArticlesModule,
    TagsModule,
    ProfileModule,
    ArticleCommentModule,
    ClsModule.forRoot({
      global: true,
      middleware: {mount: true},
      guard: {generateId: true, mount: true},
    }),
  ],
  providers: [
    {
      provide: AsyncLocalStorage,
      useValue: new AsyncLocalStorage(),
    },
    {
      provide: APP_GUARD,
      useClass: ClsGuard,
    },
    ClsService,
  ],
  exports: [AsyncLocalStorage],
})
export class AppModule {}
