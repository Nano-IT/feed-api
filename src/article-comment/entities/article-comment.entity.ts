import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {User} from '@/user/entities/user.entity';
import {Article} from '@/articles/entities/article.entity';
import {Exclude, Type} from 'class-transformer';

@Entity()
export class ArticleComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({type: 'int', nullable: true})
  authorId: number;

  @ManyToOne(() => User)
  @JoinColumn({name: 'authorId'})
  @Type(() => User)
  author: User;

  @Exclude()
  @Column({type: 'int', nullable: true})
  articleId: number;

  @Exclude()
  @ManyToOne(() => Article)
  @JoinColumn({name: 'articleId'})
  article: Article;

  @Column()
  body: string;

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;
}
