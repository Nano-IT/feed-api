import {Exclude, Expose, Transform} from 'class-transformer';
import {Article} from '@/articles/entities/article.entity';
import {User} from '@/user/entities/user.entity';
import {ClsServiceManager} from 'nestjs-cls';

export class ArticleResponseDto extends Article {
  currentUser: User;
  @Exclude()
  id: number;

  @Expose()
  get tagList(): string[] {
    return this.tags.map((tag) => tag.name);
  }

  @Expose()
  get favorited(): boolean {
    return this.users.some(
      (item) => item.username === this.currentUser?.username,
    );
  }

  @Expose()
  get favoritesCount(): number {
    return this.users.length;
  }

  @Transform((data) => {
    const cls = ClsServiceManager.getClsService();
    const currentUser = cls.get('user');
    const following = data.value.followers?.some(
      (item) => item.username === currentUser?.username,
    );
    return {...data.value, following};
  })
  author;

  constructor(partial: Partial<Article>) {
    super();
    Object.assign(this, partial);
    const cls = ClsServiceManager.getClsService();
    this.currentUser = cls.get('user');
  }
}
