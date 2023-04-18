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

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int', nullable: true})
  authorId: number;

  @ManyToOne(() => User)
  @JoinColumn({name: 'authorId'})
  author: User;

  @Column()
  body: string;

  @Column()
  description: string;

  @Column({unique: true})
  slug: string;

  @Column({unique: true})
  title: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'article_like',
    inverseJoinColumn: {
      foreignKeyConstraintName: 'userId',
      referencedColumnName: 'id',
    },
  })
  users?: User[];

  @ManyToMany(() => Tag, {createForeignKeyConstraints: false})
  @JoinTable({
    name: 'article_tag',
    inverseJoinColumn: {
      foreignKeyConstraintName: 'tagId',
      referencedColumnName: 'id',
    },
  })
  tags?: Tag[];
}
