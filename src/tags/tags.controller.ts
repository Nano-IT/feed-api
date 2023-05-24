import {Controller, Get} from '@nestjs/common';
import {TagsService} from './tags.service';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';

@Controller('tags')
@ApiTags('Article tags')
@ApiBearerAuth()
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getArticlePopularTags() {
    const tags = await this.tagsService.findAll();
    return tags.map(({name}) => name);
  }
}
