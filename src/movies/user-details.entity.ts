import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Movie } from './movie.entity';
import { classToPlain, Exclude } from 'class-transformer';

@Entity()
export class UserDetail {
  @PrimaryGeneratedColumn()
  @Exclude({ toPlainOnly: true })
  id: number;

  @Column({ default: false })
  isFavorite: boolean;

  @Column({ default: false })
  isWatched: boolean;

  @Column({ default: false })
  isInWatchlist: boolean;

  @Column({ default: null })
  watchingDate: Date | null;

  @ManyToOne((type) => User, (user) => user.userDetails)
  user: User;
  @Column()
  @Exclude({ toPlainOnly: true })
  userId: number;

  @ManyToOne((type) => Movie, (movie) => movie.userDetails)
  movie: Movie;
  @Column()
  @Exclude({ toPlainOnly: true })
  movieId: number;

  @BeforeUpdate()
  @BeforeInsert()
  updateDate() {
    if (this.isWatched && !this.watchingDate) {
      this.watchingDate = new Date();
    } else if (!this.isWatched) {
      this.watchingDate = null;
    }
  }
  private toJSON() {
    return classToPlain(this);
  }
}
