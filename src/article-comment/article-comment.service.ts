import {Injectable} from '@nestjs/common';
import {CreateArticleCommentDto} from './dto/create-article-comment.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {ArticleComment} from './entities/article-comment.entity';
import {ArticlesService} from '@/articles/services/articles.service';
import {ArticleCommentResponseDto} from '@/article-comment/dto/article-comment-response.dto';
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
    const articleComments = await this.articleCommentRepository.find({
      where: {article: {slug}},
      relations: {
        author: true,
      },
    });
    return articleComments.map((item) => new ArticleCommentResponseDto(item));
  }
}
