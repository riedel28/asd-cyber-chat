import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Comment } from '../comments/comments.entity';
import type { CreateCommentDto } from '../comments/dto/create-comment.dto';
import type { CreateThreadDto } from './dto/create-thread.dto';
import type { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './threads.entity';

export type CreateThreadPayload = Omit<Thread, 'id' | 'createdAt'>;

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threads: Repository<Thread>,
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
  ) {}

  getAllThreads() {
    return this.threads.find({ order: { createdAt: 'DESC' } });
  }

  getThreadById(id: string) {
    return this.threads.findOneBy({ id });
  }

  async createThread(dto: CreateThreadDto): Promise<Thread> {
    const thread = this.threads.create(dto);
    return this.threads.save(thread);
  }

  async updateThread(id: string, dto: UpdateThreadDto): Promise<Thread> {
    const thread = await this.threads.preload({ id, ...dto });
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }

    return this.threads.save(thread);
  }

  async addCommentToThread(id: string, dto: CreateCommentDto): Promise<Thread> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }

    const comment = this.comments.create({
      body: dto.body,
      author: dto.author,
      thread,
    });
    await this.comments.save(comment);

    return this.threads.findOneOrFail({
      where: { id },
      relations: { comments: true },
    });
  }

  async deleteThread(id: string): Promise<Thread> {
    const thread = await this.threads.findOne({
      where: { id },
      relations: { comments: true },
    });
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }

    await this.threads.delete(id);
    return thread;
  }
}
