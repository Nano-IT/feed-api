import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  SerializeOptions,
} from '@nestjs/common';
import {ArticlesService} from '@/articles/services/articles.service';
import {CreateArticleDto} from '@/articles/dto/create-article.dto';
import {UpdateArticleDto} from '@/articles/dto/update-article.dto';
import {GROUP_ARTICLE, GROUP_ARTICLE_LIST} from '@/articles/consts';
import {GROUP_USER_PROFILE} from '@/user/consts';
import {ApiBearerAuth, ApiResponse, ApiTags} from '@nestjs/swagger';
import {ArticleResponseDto} from '@/articles/dto/article-response.dto';

@Controller('articles')
@ApiTags('Articles')
@ApiBearerAuth()
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @SerializeOptions({
    groups: [GROUP_ARTICLE],
  })
  @Post()
  @ApiResponse({type: ArticleResponseDto})
  async create(@Body() article: CreateArticleDto) {
    const {title, description, body, tagList} = article;
    return await this.articlesService.create({
      title,
      description,
      body,
      tagList,
    });
  }

  @SerializeOptions({
    groups: [GROUP_ARTICLE_LIST, GROUP_USER_PROFILE],
  })
  @Get()
  @ApiResponse({type: ArticleResponseDto, isArray: true})
  findAll(
    @Query('limit') take = 10,
    @Query('offset') skip = 0,
    @Query('author') author,
    @Query('favorited') favorited,
    @Query('tag') tag,
  ) {
    return this.articlesService.findAll({take, skip, author, favorited, tag});
  }

  @SerializeOptions({
    groups: [GROUP_ARTICLE_LIST, GROUP_USER_PROFILE],
  })
  @Get('/feed')
  @ApiResponse({type: ArticleResponseDto, isArray: true})
  feed(
    @Query('limit') take = 10,
    @Query('offset') skip = 0,
    @Query('author') author,
    @Query('favorited') favorited,
  ) {
    return this.articlesService.findAll({take, skip, author, favorited}, true);
  }

  @Get(':slug')
  @SerializeOptions({
    groups: [GROUP_ARTICLE, GROUP_USER_PROFILE],
  })
  @ApiResponse({type: ArticleResponseDto})
  findOne(@Param('slug') slug: string) {
    return this.articlesService.findOne(slug);
  }

  @Put(':slug')
  @SerializeOptions({
    groups: [GROUP_ARTICLE, GROUP_USER_PROFILE],
  })
  @ApiResponse({type: ArticleResponseDto})
  update(@Param('slug') slug: string, @Body() body: UpdateArticleDto) {
    const {tagList, ...payload} = body;
    return this.articlesService.update(slug, payload, tagList);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string) {
    return this.articlesService.remove(slug);
  }
}
