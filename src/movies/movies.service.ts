import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from './movie.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieDto } from './dto/movie.dto';
import { UserDetail } from './user-details.entity';
import { Repository } from 'typeorm';
import { UserMovieStatusDto } from './dto/user-movie-status.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(MovieRepository)
    private movieRepository: MovieRepository,
    @InjectRepository(UserDetail)
    private statusRepository: Repository<UserDetail>,
  ) {}

  async getAll() {
    return this.movieRepository.findAll();
  }

  async getAllByUser(userId?: number) {
    return userId
      ? this.movieRepository.findAllByUser(userId)
      : this.movieRepository.findAll();
  }

  async getById(id, userId?: number) {
    const movie = userId
      ? await this.movieRepository.findByIdByUser(id, userId)
      : await this.movieRepository.findById(id);
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }
  async createMovie(movieDto: MovieDto): Promise<Movie> {
    const movie = this.movieRepository.create(movieDto);
    await this.movieRepository.save(movie);
    return movie;
  }

  async updateUserStatus(
    status: UserMovieStatusDto,
    id: number,
    userId: number,
  ) {
    const foundedStatus = await this.statusRepository.findOne({
      where: { movieId: id, userId },
    });
    if (!foundedStatus) {
      const newStatus = this.statusRepository.create({
        ...status,
        movieId: id,
        userId,
      });
      await this.statusRepository.save(newStatus);
      console.log(
        `Status for movie with id ${id} and user with id ${userId} successfully created`,
      );
      return newStatus;
    }
    Object.assign(foundedStatus, { ...status, movieId: id, userId });
    await this.statusRepository.save(foundedStatus);
    console.log(
      `Status for movie with id ${id} and user with id ${userId} successfully updated`,
    );
    return foundedStatus;
  }
}
