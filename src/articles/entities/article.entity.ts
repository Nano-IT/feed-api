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
import {Exclude, Expose, Transform} from 'class-transformer';
import {ClsServiceManager} from 'nestjs-cls';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'bigint', nullable: false})
  authorId: bigint;

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
  author: User;

  @Column({type: 'text'})
  body: string;

  @Column({type: 'varchar'})
  description: string;

  @Column({unique: true})
  slug: string;

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

  @Expose()
  get favorited(): boolean {
    const cls = ClsServiceManager.getClsService();
    const currentUser = cls.get('user');
    return this.users.some((item) => item.id === currentUser?.id);
  }

  @Expose()
  get favoritesCount(): number {
    return this.users.length;
  }

  @Expose()
  get tagList(): string[] {
    return this.tags?.map((tag) => tag.name);
  }
}
