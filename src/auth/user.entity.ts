import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { UserDetail } from '../movies/user-details.entity';
import { Comment } from '../comments/comment.entity';
import { classToPlain, Exclude } from 'class-transformer';
import {
  UNIQUE_USER_EMAIL_CONSTRAINT,
  UNIQUE_USER_LOGIN_CONSTRAINT,
} from './constraints';

@Entity()
@Unique(UNIQUE_USER_EMAIL_CONSTRAINT, ['email'])
@Unique(UNIQUE_USER_LOGIN_CONSTRAINT, ['login'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Exclude({ toPlainOnly: true })
  login: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @OneToMany((type) => UserDetail, (userDetail) => userDetail.user)
  userDetails: UserDetail[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  private toJSON() {
    return classToPlain(this);
  }
}
