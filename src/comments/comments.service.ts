import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { User } from '../auth/user.entity';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async getMovieComments(movieId: number) {
    return await this.commentRepository.find({ where: { movieId } });
  }

  async create(movieId: number, user: User, commentDto: CommentDto) {
    const comment = this.commentRepository.create({
      movieId,
      user,
      ...commentDto,
    });
    await this.commentRepository.save(comment);
    return comment;
  }

  async delete(commentId, userId) {
    const res = await this.commentRepository.delete({
      id: commentId,
      user: { id: userId },
    });
    if (res.affected === 0) {
      throw new NotFoundException(
        `Comment with ID ${commentId} not found or your have not permissions to delete it`,
      );
    }
  }
}
