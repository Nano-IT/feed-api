import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import {ArticlesService} from '@/articles/services/articles.service';
import {CreateArticleDto} from '@/articles/dto/create-article.dto';
import {UpdateArticleDto} from '@/articles/dto/update-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() article: CreateArticleDto) {
    const {title, description, body, tagList} = article;
    return this.articlesService.create({title, description, body, tagList});
  }

  @Get()
  findAll(
    @Query('limit') take = 10,
    @Query('offset') skip = 0,
    @Query('author') author,
    @Query('favorited') favorited,
    @Query('tag') tag,
  ) {
    return this.articlesService.findAll({take, skip, author, favorited, tag});
  }

  @Get('/feed')
  feed(
    @Query('limit') take = 10,
    @Query('offset') skip = 0,
    @Query('author') author,
    @Query('favorited') favorited,
  ) {
    return this.articlesService.findAll({take, skip, author, favorited}, true);
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.articlesService.findOne(slug);
  }

  @Put(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(slug, updateArticleDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.articlesService.remove(slug);
  }
}
