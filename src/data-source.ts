import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Thread } from './threads/threads.entity';
import { Comment } from './comments/comments.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './data/db.sqlite',
  entities: [Thread, Comment],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Absolutely critical to disable this here
});
