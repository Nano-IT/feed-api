import {ArticleComment} from '@/article-comment/entities/article-comment.entity';
import {Exclude} from 'class-transformer';

export class ArticleCommentResponseDto {
  @Exclude()
  createdAt: string;

  @Exclude()
  updatedAt: string;
  constructor(partial: Partial<ArticleComment>) {
    Object.assign(this, partial);
  }
}
