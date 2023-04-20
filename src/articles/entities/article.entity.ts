import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from '@/user/entities/user.entity';
import {Tag} from '@/tags/entities/tag.entity';
import {Exclude, Expose, Transform, Type} from 'class-transformer';
import {ClsServiceManager} from 'nestjs-cls';
import {GROUP_ARTICLE, GROUP_ARTICLE_LIST} from '@/articles/consts';
import {ValidateNested} from 'class-validator';

@Entity()
export class Article {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({type: 'bigint', nullable: false})
  authorId: bigint;

  @Expose({groups: [GROUP_ARTICLE_LIST, GROUP_ARTICLE]})
  @ValidateNested()
  @Transform((data) => {
    const cls = ClsServiceManager.getClsService();
    const currentUser = cls.get('user');
    const following = data.value.followers?.some(
      (item) => item.username === currentUser?.username,
    );
    return {...data.value, following};
  })
  @ManyToOne(() => User)
  @JoinColumn({name: 'authorId'})
  @Type(() => User)
  author: User;

  @Expose({groups: [GROUP_ARTICLE_LIST, GROUP_ARTICLE]})
  @Column({type: 'text'})
  body: string;

  @Expose({groups: [GROUP_ARTICLE_LIST, GROUP_ARTICLE]})
  @Column({type: 'text'})
  description: string;

  @Expose({groups: [GROUP_ARTICLE_LIST, GROUP_ARTICLE]})
  @Column({unique: true})
  slug: string;

  @Expose({groups: [GROUP_ARTICLE_LIST, GROUP_ARTICLE]})
  @Column({unique: true})
  title: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @Exclude()
  @ManyToMany(() => User)
  @JoinTable({
    name: 'article_like',
    inverseJoinColumn: {
      foreignKeyConstraintName: 'userId',
      referencedColumnName: 'id',
    },
  })
  users?: User[];

  @Exclude()
  @ManyToMany(() => Tag, {createForeignKeyConstraints: false})
  @JoinTable({
    name: 'article_tag',
    inverseJoinColumn: {
      foreignKeyConstraintName: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags?: Tag[];

  @Expose({groups: [GROUP_ARTICLE_LIST, GROUP_ARTICLE]})
  get favorited(): boolean {
    const cls = ClsServiceManager.getClsService();
    const currentUser = cls.get('user');
    return this.users.some((item) => item.id === currentUser?.id);
  }

  @Expose({groups: [GROUP_ARTICLE_LIST, GROUP_ARTICLE]})
  get favoritesCount(): number {
    return this.users.length;
  }

  @Expose({groups: [GROUP_ARTICLE_LIST, GROUP_ARTICLE]})
  get tagList(): string[] {
    return this.tags?.map((tag) => tag.name);
  }
}
