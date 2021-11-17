import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserDetail } from './user-details.entity';
import { Comment } from '../comments/comment.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text', { array: true })
  actors: string[];

  @Column()
  ageRating: number;

  @Column()
  alternateTitle: string;

  @Column()
  description: string;

  @Column()
  director: string;

  @Column('text', { array: true })
  genres: string[];

  @Column()
  poster: string;

  @Column()
  releaseDate: Date;

  @Column('text', { array: true })
  countries: string[];

  @Column()
  runtime: number;

  @Column('float')
  rating: number;

  @Column('text', { array: true })
  writers: string[];

  @OneToOne((type) => UserDetail, (userDetail) => userDetail.movie)
  userDetails: UserDetail;

  @OneToMany((type) => Comment, (comment) => comment.movie)
  comments: Comment[];
}
