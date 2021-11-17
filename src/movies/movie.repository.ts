import { EntityRepository, Repository } from 'typeorm';
import { Movie } from './movie.entity';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {
  async findAll() {
    return this.createQueryBuilder('movie')
      .loadRelationCountAndMap('movie.commentsCount', 'movie.comments')
      .getMany();
  }

  async findAllByUser(id: number) {
    return this.createQueryBuilder('movie')
      .loadRelationCountAndMap('movie.commentsCount', 'movie.comments')
      .leftJoinAndSelect(
        'movie.userDetails',
        'userDetails',
        `userDetails.userId = ${id}`,
      )
      .getMany();
  }

  async findById(id) {
    return this.createQueryBuilder('movie')
      .where({ id })
      .loadRelationCountAndMap('movie.commentsCount', 'movie.comments')
      .getOne();
  }

  async findByIdByUser(id, userId) {
    return this.createQueryBuilder('movie')
      .where({ id })
      .loadRelationCountAndMap('movie.commentsCount', 'movie.comments')
      .leftJoinAndSelect(
        'movie.userDetails',
        'userDetails',
        `userDetails.userId = ${userId}`,
      )
      .getOne();
  }
}
