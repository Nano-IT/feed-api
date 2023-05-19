import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({example: 'article body'})
  body: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({example: 'article description'})
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({example: 'article title'})
  title: string;

  @IsString()
  @ApiProperty({example: 'article yamaha json'})
  tagList: string;
}
