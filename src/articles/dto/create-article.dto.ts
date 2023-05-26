import {IsNotEmpty, IsString, Length} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 1024)
  @ApiProperty({example: 'article body'})
  body: string;

  @IsNotEmpty()
  @Length(2, 512)
  @IsString()
  @ApiProperty({example: 'article description'})
  description: string;

  @IsNotEmpty()
  @Length(2, 128)
  @IsString()
  @ApiProperty({example: 'article title'})
  title: string;

  @Length(2, 128)
  @IsString()
  @ApiProperty({example: 'article yamaha json'})
  tagList: string;
}
