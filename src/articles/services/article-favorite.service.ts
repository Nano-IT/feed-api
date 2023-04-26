import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from '@/articles/entities/article.entity';
import {Repository} from 'typeorm';
import {ClsService} from 'nestjs-cls';

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
    return await this.articleRepository.save(article);
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
    return await this.articleRepository.save(article);
  }
}
