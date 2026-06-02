import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Thread } from './threads/threads.entity';
import { Comment } from './comments/comments.entity';
import { User } from './users/users.entity';

export const AppDataSource = new DataSource({
  type: 'better-sqlite3',
  database: './data/db.sqlite',
  entities: [Thread, Comment, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // Absolutely critical to disable this here
});
