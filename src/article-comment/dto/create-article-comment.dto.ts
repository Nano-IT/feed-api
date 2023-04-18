import {IsNotEmpty, Length} from 'class-validator';

export class CreateArticleCommentDto {
  @IsNotEmpty()
  @Length(2, 256)
  body: string;
}
