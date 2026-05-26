import type { Comment } from 'src/comments/comments.entity';

export class CreateThreadDto {
  title: string;

  body: string;

  author: string;

  comments: Comment[];
}

export class UpdateThreadDto {
  title?: string;

  body?: string;

  author?: string;
}
