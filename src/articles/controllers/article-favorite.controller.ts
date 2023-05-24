import {Controller, Post, Param, Delete} from '@nestjs/common';
import {ArticleFavoriteService} from '@/articles/services/article-favorite.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@Controller('articles/:slug/favorite')
@ApiTags('Article favorite')
@ApiBearerAuth()
export class ArticleFavoriteController {
  constructor(
    private readonly articlesFavoriteService: ArticleFavoriteService,
  ) {}

  @Post()
  addFavorite(@Param('slug') slug: string) {
    return this.articlesFavoriteService.addFavoriteArticle(slug);
  }

  @Delete()
  removeFavorite(@Param('slug') slug: string) {
    return this.articlesFavoriteService.removeFromFavorites(slug);
  }
}
