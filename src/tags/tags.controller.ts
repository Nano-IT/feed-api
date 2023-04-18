import {Controller, Get} from '@nestjs/common';
import {TagsService} from './tags.service';
import {Public} from '@/shared/decorators/public';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Public()
  @Get()
  async getArticlePopularTags() {
    const tags = await this.tagsService.findAll();
    return tags.map(({name}) => name);
  }
}
