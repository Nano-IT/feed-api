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
import {RequestUser} from '@/shared/decorators/request-user.decorator';
import {User} from '@/user/entities/user.entity';
import {Public} from '@/shared/decorators/public';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() article: CreateArticleDto, @RequestUser() user) {
    const {title, description, body, tagList} = article;
    return this.articlesService.create(
      {title, description, body, tagList},
      user,
    );
  }

  @Public()
  @Get()
  findAll(
    @Query('limit') take = 10,
    @Query('offset') skip = 0,
    @Query('author') author,
    @Query('favorited') favorited,
    @Query('tag') tag,
    @RequestUser() user,
  ) {
    return this.articlesService.findAll(
      {take, skip, author, favorited, tag},
      user,
    );
  }

  @Get('/feed')
  feed(
    @Query('limit') take = 10,
    @Query('offset') skip = 0,
    @Query('author') author,
    @Query('favorited') favorited,
    @RequestUser() user,
  ) {
    return this.articlesService.findAll(
      {take, skip, author, favorited},
      user,
      true,
    );
  }

  @Public()
  @Get(':slug')
  findOne(@Param('slug') slug: string, @RequestUser() user: User) {
    return this.articlesService.findOne(slug, user);
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
