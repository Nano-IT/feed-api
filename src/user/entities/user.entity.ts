import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Exclude} from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({unique: true})
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column()
  username: string;

  @Column({nullable: true})
  bio: string | null;

  @Column({nullable: true})
  image: string | null;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: 'user_follower',
    inverseJoinColumn: {
      foreignKeyConstraintName: 'followerId',
      referencedColumnName: 'id',
      name: 'followerId',
    },
  })
  followers: User[];
}
