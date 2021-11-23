import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env'),
});

export const options: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DOCKER === 'true' ? process.env.POSTGRES_HOST : 'localhost',
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
  synchronize: false,
  migrations: [`${__dirname}/../migrations/*{.ts,.js}`],
  migrationsRun: true,
  cli: {
    migrationsDir: 'src/migrations',
  },
};
console.log(options);
export default options;
