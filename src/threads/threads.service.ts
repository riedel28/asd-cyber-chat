import { Injectable, NotFoundException } from '@nestjs/common';
import { type Thread, ThreadsRepository } from './threads.repository';
import {
  CommentsRepository,
  type Comment,
} from 'src/comments/comments.repository';

export type CreateThreadPayload = Omit<Thread, 'id' | 'createdAt'>;

@Injectable()
export class ThreadsService {
  constructor(
    private readonly threadsRepository: ThreadsRepository,
    private readonly commentsRepository: CommentsRepository,
  ) {}

  getAllThreads() {
    return this.threadsRepository.getAll();
  }

  createThread(body: CreateThreadPayload) {
    return this.threadsRepository.create(body);
  }

  getThreadById(id: number) {
    const thread = this.threadsRepository.getAllById(id);

    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }

    return thread;
  }

  addComment(id: number, comment: Omit<Comment, 'id' | 'createdAt'>) {
    const thread = this.threadsRepository.getAllById(id);

    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }

    const newComment = this.commentsRepository.create(comment);
    if (thread.comments === undefined) {
      thread.comments = [];
    }
    thread.comments.push(newComment);
    return newComment;
  }

  deleteThread(id: number) {
    const thread = this.threadsRepository.getAllById(id);

    if (!thread) {
      return undefined;
    }

    for (const comment of thread.comments ?? []) {
      this.commentsRepository.delete(comment.id);
    }

    return this.threadsRepository.delete(id);
  }
}
