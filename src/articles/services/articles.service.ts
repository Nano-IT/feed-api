import {Injectable} from '@nestjs/common';
import {UpdateArticleDto} from '@/articles/dto/update-article.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Article} from '@/articles/entities/article.entity';
import {Repository} from 'typeorm';
import {UtilsService} from '@/shared/services/utils.service';
import {CreateArticleDto} from '@/articles/dto/create-article.dto';
import {Tag} from '@/tags/entities/tag.entity';
import {TagsService} from '@/tags/tags.service';
import {ArticleResponseDto} from '@/articles/dto/article-response.dto';
import {ClsService} from 'nestjs-cls';

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
    const slug = this.utilsService.createSlug(createArticleDto.title);
    const created = await this.articleRepository.create({
      ...createArticleDto,
      slug,
    });
    created.authorId = currentUser.id;
    const response = await this.articleRepository.save(created);
    return await this.findOne(response.slug);
  }

  async findAll({skip, take, favorited, author, tag = ''}, feed = false) {
    let where = {};
    const currentUser = this.cls.get('user');

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
          users: {
            followers: true,
          },
          tags: true,
        },
      },
    );

    return {
      articles: articles.map((item) => new ArticleResponseDto(item)),
      articlesCount,
    };
  }

  async findOne(slug: string) {
    const article = await this.articleRepository.findOneOrFail({
      where: {slug},
      relations: {
        author: {
          followers: true,
        },
        users: true,
        tags: true,
      },
    });

    return new ArticleResponseDto(article);
  }

  async update(slug: string, article: UpdateArticleDto) {
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

    if (article.tagList) {
      foundedArticle.tags = await this.updateTags(article.tagList);
    }

    await this.articleRepository.save(foundedArticle);
    return new ArticleResponseDto(foundedArticle);
  }

  async remove(slug: string) {
    return await this.articleRepository.delete({slug});
  }

  async updateTags(tags: string): Promise<Tag[]> {
    const tagList = tags.trim().split(' ').filter(Boolean);
    return await this.tagsService.createMany(tagList);
  }
}
