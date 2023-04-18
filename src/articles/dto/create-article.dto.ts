import {IsNotEmpty, IsString} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  tagList: string;

  @IsNotEmpty()
  @IsString()
  title: string;
}