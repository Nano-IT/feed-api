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
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: bigint;

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

  @Exclude()
  @CreateDateColumn()
  createdAt: string;

  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => User, {createForeignKeyConstraints: false})
  @JoinTable({
    name: 'user_follower',
    inverseJoinColumn: {
      referencedColumnName: 'id',
      name: 'followerId',
    },
  })
  followers: User[];
}
