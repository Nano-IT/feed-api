import {ApiProperty} from '@nestjs/swagger';

export class ArticleResponseDto {
  @ApiProperty({example: 'article body'})
  body: string;

  @ApiProperty({example: 'article body'})
  id: string;

  @ApiProperty({example: 'article description'})
  description: string;

  @ApiProperty({example: 'article title'})
  title: string;

  @ApiProperty({example: ['article', 'yamaha', 'json']})
  tagList: string[];
}
