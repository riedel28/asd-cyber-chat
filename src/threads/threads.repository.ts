import { Injectable } from '@nestjs/common';
import type { Comment } from '../comments/comments.repository';

export type Thread = {
  id: number;
  title: string;
  author: string;
  body: string;
  createdAt: Date;
  comments: Comment[];
};

@Injectable()
export class ThreadsRepository {
  private threads = new Map<number, Thread>();
  private nextId = 1;

  getAll() {
    return Array.from(this.threads.values());
  }

  getAllById(id: number) {
    return this.threads.get(id);
  }

  create(thread: Omit<Thread, 'id' | 'createdAt'>) {
    const id = this.nextId++;
    const newThread: Thread = { ...thread, id, createdAt: new Date() };
    this.threads.set(id, newThread);

    return newThread;
  }

  update(id: number, updates: Partial<Thread>) {
    const thread = this.threads.get(id);
    if (!thread) return undefined;
    const updated = { ...thread, ...updates };
    this.threads.set(id, updated);

    return updated;
  }

  delete(id: number) {
    this.threads.delete(id);
    return id;
  }
}
