import { Injectable } from '@nestjs/common';

export type Comment = {
  id: number;
  author: string;
  body: string;
  createdAt: Date;
};

@Injectable()
export class CommentsRepository {
  private comments = new Map<number, Comment>();
  private nextId = 1;

  getAll() {
    return this.comments;
  }

  getAllById(id: number) {
    return this.comments.get(id);
  }

  create(comment: Omit<Comment, 'id' | 'createdAt'>) {
    const id = this.nextId++;
    const newComment: Comment = { ...comment, id, createdAt: new Date() };
    this.comments.set(id, newComment);

    return newComment;
  }

  update(id: number, updates: Partial<Comment>) {
    const comment = this.comments.get(id);
    if (!comment) return undefined;
    const updated = { ...comment, ...updates };
    this.comments.set(id, updated);

    return updated;
  }

  markAsDeleted(id: number) {
    const comment = this.comments.get(id);
    if (!comment) return undefined;
    comment.body = 'deleted';
    return comment;
  }

  delete(id: number) {
    return this.comments.delete(id);
  }
}
