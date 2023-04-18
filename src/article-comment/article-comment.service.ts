import {Injectable} from '@nestjs/common';
import {CreateArticleCommentDto} from './dto/create-article-comment.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ArticleComment} from './entities/article-comment.entity';
import {User} from '@/user/entities/user.entity';
import {ArticlesService} from '@/articles/services/articles.service';

@Injectable()
export class ArticleCommentService {
  constructor(
    @InjectRepository(ArticleComment)
    private articleCommentRepository: Repository<ArticleComment>,
    private articleService: ArticlesService,
  ) {}
  async create(
    slug,
    createArticleCommentDto: CreateArticleCommentDto,
    user: User,
  ) {
    const comment = this.articleCommentRepository.create(
      createArticleCommentDto,
    );
    comment.article = await this.articleService.findOne(slug, user);
    comment.author = user;

    return this.articleCommentRepository.save(comment);
  }
  async remove(slug: string, id: number) {
    const comment = await this.articleCommentRepository.findOneByOrFail({
      id,
      article: {slug},
    });
    return await this.articleCommentRepository.remove(comment);
  }

  async getArticleComments(slug: string) {
    return await this.articleCommentRepository.find({
      where: {article: {slug}},
      relations: {
        author: true,
      },
    });
  }
}
