import {Controller, Post, Param, Delete} from '@nestjs/common';
import {RequestUser} from '@/shared/decorators/request-user.decorator';
import {ArticleFavoriteService} from '@/articles/services/article-favorite.service';

@Controller('articles/:slug/favorite')
export class ArticleFavoriteController {
  constructor(
    private readonly articlesFavoriteService: ArticleFavoriteService,
  ) {}

  @Post()
  addFavorite(@Param('slug') slug: string, @RequestUser() user) {
    return this.articlesFavoriteService.addFavoriteArticle(slug, user);
  }

  @Delete()
  removeFavorite(@Param('slug') slug: string, @RequestUser() user) {
    return this.articlesFavoriteService.removeFromFavorites(slug, user);
  }
}
