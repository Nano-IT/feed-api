import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from '@/articles/entities/article.entity';
import {Repository} from 'typeorm';
import {User} from '@/user/entities/user.entity';

@Injectable()
export class ArticleFavoriteService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
  ) {}

  async addFavoriteArticle(slug: string, user: User) {
    const article = await this.articleRepository.findOne({
      where: {slug},
      relations: {
        users: true,
      },
    });

    if (!article.users.some((item) => item.id === user.id)) {
      const newUser = new User();
      newUser.id = user.id;
      article.users.push(newUser);
    }
    await this.articleRepository.save(article);
    return article;
  }

  async removeFromFavorites(slug: string, user) {
    const article = await this.articleRepository.findOne({
      where: {slug},
      relations: {
        users: true,
      },
    });
    article.users = article.users.filter((item) => item.id !== user.id);
    await this.articleRepository.save(article);
    return article;
  }
}
