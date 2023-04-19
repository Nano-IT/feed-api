import {Exclude, Expose, Transform, Type} from 'class-transformer';
import {Article} from '@/articles/entities/article.entity';
import {ClsServiceManager} from 'nestjs-cls';
import {User} from '@/user/entities/user.entity';
import {Tag} from '@/tags/entities/tag.entity';

export class ArticleResponseDto extends Article {
  @Exclude()
  currentUser: User;
  @Exclude()
  id: number;

  // @Expose()
  // get tagList(): string[] {
  //   return this.tags.map((tag) => tag.name);
  // }

  // @Expose()
  // get favorited(): boolean {
  //   return this.users.some((item) => item.id === this.currentUser?.id);
  // }
  //
  // @Expose()
  // get favoritesCount(): number {
  //   return this.users.length;
  // }
  //
  // @Transform((data) => {
  //   const cls = ClsServiceManager.getClsService();
  //   const currentUser = cls.get('user');
  //   const following = data.value.followers?.some(
  //     (item) => item.username === currentUser?.username,
  //   );
  //   return {...data.value, following};
  // })
  // @Type(() => User)
  // author: User;

  constructor(partial: Partial<Article>) {
    super();
    Object.assign(this, partial);
    const cls = ClsServiceManager.getClsService();
    this.currentUser = cls.get('user');
  }
}
