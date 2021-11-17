import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { GetMovieId } from './decorators/get-movie-id.decorator';
import { GetUser } from '../auth/decorators/get-user-decorator';
import { User } from '../auth/user.entity';
import { CommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get(':movieId')
  getMovieComments(@GetMovieId() movieId: number) {
    return this.commentsService.getMovieComments(movieId);
  }

  @Post(':movieId')
  @UseGuards(JwtAuthGuard)
  create(
    @GetMovieId() movieId: number,
    @GetUser() user: User,
    @Body() commentDto: CommentDto,
  ) {
    return this.commentsService.create(movieId, user, commentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@GetUser() user: User, @Param('id') id: number) {
    return this.commentsService.delete(id, user.id);
  }
}
