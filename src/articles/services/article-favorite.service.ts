import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from '@/articles/entities/article.entity';
import {Repository} from 'typeorm';
import {ClsService} from 'nestjs-cls';
import {ArticleResponseDto} from '@/articles/dto/article-response.dto';

@Injectable()
export class ArticleFavoriteService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    private clsService: ClsService,
  ) {}

  async addFavoriteArticle(slug: string) {
    const article = await this.articleRepository.findOne({
      where: {slug},
      relations: {
        users: true,
      },
    });

    const currentUser = this.clsService.get('user');

    if (!article.users.some((item) => item.id === currentUser.id)) {
      article.users.push(currentUser);
    }
    await this.articleRepository.save(article);
    return new ArticleResponseDto(article);
  }

  async removeFromFavorites(slug: string) {
    const article = await this.articleRepository.findOne({
      where: {slug},
      relations: {
        users: true,
      },
    });
    const currentUser = this.clsService.get('user');
    article.users = article.users.filter((item) => item.id !== currentUser.id);
    await this.articleRepository.save(article);
    return new ArticleResponseDto(article);
  }
}
