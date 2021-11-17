import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieRepository } from './movie.repository';
import { UserDetail } from './user-details.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieRepository, UserDetail])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
