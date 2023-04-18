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

@Entity()
export class ArticleComment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int', nullable: true})
  authorId: number;

  @ManyToOne(() => User)
  @JoinColumn({name: 'authorId'})
  author: User;

  @Column({type: 'int', nullable: true})
  articleId: number;

  @ManyToOne(() => Article)
  @JoinColumn({name: 'articleId'})
  article: Article;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
