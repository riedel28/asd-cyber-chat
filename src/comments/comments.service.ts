import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
  ) {}

  getCommentById(id: number) {
    return this.comments.findOneBy({ id });
  }

  async deleteComment(id: number) {
    const result = await this.comments.delete(id);
    return (result.affected ?? 0) > 0;
  }
}
