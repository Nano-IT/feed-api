import {Injectable} from '@nestjs/common';
import {UpdateArticleDto} from '@/articles/dto/update-article.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from '@/articles/entities/article.entity';
import {Repository} from 'typeorm';
import {UtilsService} from '@/shared/services/utils.service';
import {Tag} from '@/tags/entities/tag.entity';
import {TagsService} from '@/tags/tags.service';
import {ClsService} from 'nestjs-cls';
import {CreateArticleDto} from '@/articles/dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    private utilsService: UtilsService,
    private tagsService: TagsService,
    private cls: ClsService,
  ) {}

  async create(createArticleDto: CreateArticleDto) {
    const currentUser = this.cls.get('user');
    const {tagList, ...payload} = createArticleDto;
    const slug = this.utilsService.createSlug(createArticleDto.title);
    const created = await this.articleRepository.create({
      ...payload,
      slug,
    });
    if (tagList) {
      created.tags = await this.updateTags(tagList);
    }
    created.authorId = currentUser.id;
    const response = await this.articleRepository.save(created);
    return await this.findOne(response.slug);
  }

  async findAll({skip, take, favorited, author, tag = ''}, feed = false) {
    let where = {};

    if (favorited) {
      where = {
        users: {
          username: favorited,
        },
      };
    }

    if (author) {
      where = {
        ...where,
        author: {
          username: author,
        },
      };
    }

    if (feed) {
      const currentUser = this.cls.get('user');

      where = {
        ...where,
        users: {
          followers: {
            username: currentUser.username,
          },
        },
      };
    }

    if (tag) {
      where = {
        ...where,
        tags: {
          name: tag,
        },
      };
    }

    const [articles, articlesCount] = await this.articleRepository.findAndCount(
      {
        skip,
        take,
        where,
        order: {id: 'DESC'},
        relations: {
          author: true,
          users: true,
          tags: true,
        },
      },
    );

    return {
      articles,
      articlesCount,
    };
  }

  async findOne(slug: string) {
    return await this.articleRepository.findOneOrFail({
      where: {slug},
      relations: {
        author: {
          followers: true,
        },
        users: true,
        tags: true,
      },
    });
  }

  async update(slug: string, article: UpdateArticleDto, tagList) {
    const foundedArticle: Article = await this.articleRepository.findOneOrFail({
      where: {slug},
      relations: {
        author: {
          followers: true,
        },
        users: true,
        tags: true,
      },
    });

    if (article.title) {
      foundedArticle.title = article.title;
      foundedArticle.slug = this.utilsService.createSlug(article.title);
    }

    if (article.body) {
      foundedArticle.body = article.body;
    }

    if (article.description) {
      foundedArticle.description = article.description;
    }

    if (tagList) {
      foundedArticle.tags = await this.updateTags(tagList);
    }

    return await this.articleRepository.save(foundedArticle);
  }

  async remove(slug: string) {
    return await this.articleRepository.delete({slug});
  }

  async updateTags(tags: string): Promise<Tag[]> {
    const tagList = tags.trim().split(' ').filter(Boolean);
    return await this.tagsService.createMany(tagList);
  }
}
