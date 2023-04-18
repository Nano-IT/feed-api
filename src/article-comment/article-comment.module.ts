import {Module} from '@nestjs/common';
import {ArticleCommentService} from './article-comment.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ArticleComment} from './entities/article-comment.entity';
import {ArticleCommentController} from './article-comment.controller';
import {ArticlesModule} from '@/articles/articles.module';

@Module({
  providers: [ArticleCommentService],
  imports: [TypeOrmModule.forFeature([ArticleComment]), ArticlesModule],
  exports: [ArticleCommentService],
  controllers: [ArticleCommentController],
})
export class ArticleCommentModule {}
