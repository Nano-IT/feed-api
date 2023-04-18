import {Module} from '@nestjs/common';
import {ArticlesService} from './services/articles.service';
import {ArticlesController} from './controllers/articles.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Article} from './entities/article.entity';
import {UtilsService} from '@/shared/services/utils.service';
import {UserModule} from '@/user/user.module';
import {TagsModule} from '@/tags/tags.module';
import {ArticleFavoriteController} from './controllers/article-favorite.controller';
import {ArticleFavoriteService} from './services/article-favorite.service';

@Module({
  controllers: [ArticlesController, ArticleFavoriteController],
  providers: [ArticlesService, UtilsService, ArticleFavoriteService],
  imports: [TypeOrmModule.forFeature([Article]), UserModule, TagsModule],
  exports: [ArticlesService],
})
export class ArticlesModule {}
