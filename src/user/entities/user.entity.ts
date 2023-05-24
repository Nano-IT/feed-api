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
import {GROUP_ALL_USERS, GROUP_USER, GROUP_USER_PROFILE} from '@/user/consts';

@Entity()
export class User {
  @Exclude({toPlainOnly: true})
  @PrimaryGeneratedColumn({type: 'bigint'})
  id: bigint;

  @Expose({groups: [GROUP_USER, GROUP_ALL_USERS, GROUP_USER_PROFILE]})
  @Column({unique: true})
  email: string;

  @Exclude({toPlainOnly: true})
  @Column()
  password: string;

  @Expose({groups: [GROUP_USER, GROUP_ALL_USERS, GROUP_USER_PROFILE]})
  @Column()
  username: string;

  @Expose({groups: [GROUP_USER, GROUP_ALL_USERS, GROUP_USER_PROFILE]})
  @Column({nullable: true})
  bio: string | null;

  @Expose({groups: [GROUP_USER, GROUP_ALL_USERS, GROUP_USER_PROFILE]})
  @Column({nullable: true})
  image: string | null;

  @Expose({groups: [GROUP_USER, GROUP_ALL_USERS]})
  @CreateDateColumn()
  createdAt: string;

  @Expose({groups: [GROUP_USER, GROUP_ALL_USERS]})
  @UpdateDateColumn()
  updatedAt: string;

  @Expose({groups: [GROUP_USER]})
  @ManyToMany(() => User, {createForeignKeyConstraints: false})
  @JoinTable({
    name: 'user_follower',
    inverseJoinColumn: {
      referencedColumnName: 'id',
      name: 'followerId',
    },
  })
  followers: User[];

  @Expose({groups: [GROUP_USER, GROUP_ALL_USERS, GROUP_USER_PROFILE]})
  @Transform(({obj}) => {
    const cls = ClsServiceManager.getClsService();
    const currentUser = cls.get('user');
    return obj.followers?.some((item) => item.id === currentUser?.id);
  })
  following: boolean;
}
