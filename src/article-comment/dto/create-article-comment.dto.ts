import {IsNotEmpty, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateArticleCommentDto {
  @IsNotEmpty()
  @Length(2, 256)
  @ApiProperty({example: 'An example of article comment'})
  body: string;
}
