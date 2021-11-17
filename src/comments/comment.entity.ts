import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Movie } from '../movies/movie.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @Column()
  emotion: string;

  @CreateDateColumn()
  creationDate: Date;

  @ManyToOne((type) => User, (user) => user.comments, {
    onDelete: 'CASCADE',
    eager: true,
  })
  user: User;

  @ManyToOne((type) => Movie, (movie) => movie.comments, {
    onDelete: 'CASCADE',
  })
  movie: Movie;
  @Column()
  movieId: number;
}
