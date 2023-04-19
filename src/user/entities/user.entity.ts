import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {Exclude, Expose, Transform} from 'class-transformer';
import {ClsServiceManager} from 'nestjs-cls';

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

  @Exclude()
  @ManyToMany(() => User, {createForeignKeyConstraints: false})
  @JoinTable({
    name: 'user_follower',
    inverseJoinColumn: {
      referencedColumnName: 'id',
      name: 'followerId',
    },
  })
  followers: User[];

  @Expose()
  @Transform(({obj}) => {
    const cls = ClsServiceManager.getClsService();
    const currentUser = cls.get('user');
    return obj.followers?.some((item) => item.id === currentUser?.id);
  })
  following: boolean;
}
