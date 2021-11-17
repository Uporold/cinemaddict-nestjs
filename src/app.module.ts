import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './movies/movies.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import options from './common/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(options),
    AuthModule,
    MoviesModule,
    CommentsModule,
  ],
})
export class AppModule {}
