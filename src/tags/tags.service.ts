import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Tag} from './entities/tag.entity';
import {In, Repository} from 'typeorm';

@Injectable()
export class TagsService {
  constructor(@InjectRepository(Tag) private tagRepository: Repository<Tag>) {}

  async findAll() {
    return await this.tagRepository.find({take: 15});
  }

  async createMany(tags: string[]) {
    const newTags = await this.getNoExistedTags(tags);
    await this.tagRepository.insert(newTags);
    return await this.findByName(tags);
  }

  async findByName(tags: string[]) {
    return await this.tagRepository.findBy({
      name: In(tags),
    });
  }

  async getNoExistedTags(tags: string[]) {
    const newTags = [];
    for (const name of tags) {
      const founded = await this.tagRepository.findOneBy({name});

      if (!founded) {
        newTags.push({name});
      }
    }

    return newTags;
  }
}
