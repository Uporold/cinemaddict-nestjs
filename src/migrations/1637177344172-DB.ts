import { MigrationInterface, QueryRunner } from 'typeorm';
import { movies } from '../common/mock';

export class DB1637177344172 implements MigrationInterface {
  name = 'DB1637177344172';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comment" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "emotion" character varying NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "movieId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "movie" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "actors" text array NOT NULL, "ageRating" integer NOT NULL, "alternateTitle" character varying NOT NULL, "description" character varying NOT NULL, "director" character varying NOT NULL, "genres" text array NOT NULL, "poster" character varying NOT NULL, "releaseDate" TIMESTAMP NOT NULL, "countries" text array NOT NULL, "runtime" integer NOT NULL, "rating" double precision NOT NULL, "writers" text array NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_detail" ("id" SERIAL NOT NULL, "isFavorite" boolean NOT NULL DEFAULT false, "isWatched" boolean NOT NULL DEFAULT false, "isInWatchlist" boolean NOT NULL DEFAULT false, "watchingDate" TIMESTAMP, "userId" integer NOT NULL, "movieId" integer NOT NULL, CONSTRAINT "PK_673613c95633d9058a44041794d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "login" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "unique_user_login_constraint" UNIQUE ("login"), CONSTRAINT "unique_user_email_constraint" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_detail" ADD CONSTRAINT "FK_455dfebe9344ffecf1c8e8e054d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_detail" ADD CONSTRAINT "FK_a6081dab80dfe6a1ec02a8dd68a" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    for (let i = 0; i < movies.length; i++) {
      await queryRunner.query(
        `INSERT INTO movie (title, actors, "ageRating", "alternateTitle", description, director, genres, poster, "releaseDate", countries, runtime, rating, writers) VALUES ('${movies[i].title}', '{${movies[i].actors}}', ${movies[i].ageRating}, '${movies[i].alternateTitle}', '${movies[i].description}', '${movies[i].director}', '{${movies[i].genres}}', '${movies[i].poster}', '${movies[i].releaseDate}', '{${movies[i].countries}}', ${movies[i].runtime}, ${movies[i].rating}, '{${movies[i].writers}}')`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_detail" DROP CONSTRAINT "FK_a6081dab80dfe6a1ec02a8dd68a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_detail" DROP CONSTRAINT "FK_455dfebe9344ffecf1c8e8e054d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "user_detail"`);
    await queryRunner.query(`DROP TABLE "movie"`);
    await queryRunner.query(`DROP TABLE "comment"`);
  }
}
