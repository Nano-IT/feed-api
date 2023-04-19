import {Controller, Get, Post, Body, Param, Delete} from '@nestjs/common';
import {ArticleCommentService} from './article-comment.service';
import {CreateArticleCommentDto} from './dto/create-article-comment.dto';

@Controller('articles/:slug')
export class ArticleCommentController {
  constructor(private readonly articlesCommentService: ArticleCommentService) {}

  @Get('comments')
  getArticleComments(@Param('slug') slug: string) {
    return this.articlesCommentService.getArticleComments(slug);
  }

  @Post('comments')
  createArticleComments(
    @Param('slug') slug: string,
    @Body() body: CreateArticleCommentDto,
  ) {
    return this.articlesCommentService.create(slug, body);
  }

  @Delete('comments/:id')
  deleteArticleComments(@Param('slug') slug: string, @Param(':id') id: number) {
    return this.articlesCommentService.remove(slug, id);
  }
}
