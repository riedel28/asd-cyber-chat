import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepository: CommentsRepository) {}

  getCommentById(id: number) {
    return this.commentsRepository.getAllById(id);
  }

  deleteComment(id: number) {
    return this.commentsRepository.markAsDeleted(id);
  }
}
