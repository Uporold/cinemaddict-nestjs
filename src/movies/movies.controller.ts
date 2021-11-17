import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MoviesService } from './movies.service';
import { UserMovieStatusDto } from './dto/user-movie-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('movies')
export class MoviesController {
  constructor(private movieService: MoviesService) {}

  @Get()
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  getAllByUser(@GetUser() user: User) {
    return this.movieService.getAllByUser(user.id);
  }

  @Get(':id')
  @UseGuards(AuthGuard(['jwt', 'anonymous']))
  getById(@GetUser() user: User, @Param('id') id: number) {
    return this.movieService.getById(id, user.id);
  }

  // For testing
  @Post()
  create(@Body() movieDto: MovieDto) {
    return this.movieService.createMovie(movieDto);
  }

  @Patch('/:id/status')
  @UseGuards(JwtAuthGuard)
  updateUserStatus(
    @Body() status: UserMovieStatusDto,
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ) {
    return this.movieService.updateUserStatus(status, id, user.id);
  }
}
