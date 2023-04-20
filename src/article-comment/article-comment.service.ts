import {Injectable} from '@nestjs/common';
import {CreateArticleCommentDto} from './dto/create-article-comment.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ArticleComment} from './entities/article-comment.entity';
import {ArticlesService} from '@/articles/services/articles.service';
import {ClsService} from 'nestjs-cls';

@Injectable()
export class ArticleCommentService {
  constructor(
    @InjectRepository(ArticleComment)
    private articleCommentRepository: Repository<ArticleComment>,
    private articleService: ArticlesService,
    private cls: ClsService,
  ) {}
  async create(slug, createArticleCommentDto: CreateArticleCommentDto) {
    const user = this.cls.get('user');
    const comment = this.articleCommentRepository.create(
      createArticleCommentDto,
    );
    comment.article = await this.articleService.findOne(slug);
    comment.author = user;

    return await this.articleCommentRepository.save(comment);
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
