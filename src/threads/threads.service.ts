import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import type { Repository } from 'typeorm';
import { Comment } from '../comments/comments.entity';
import type { CreateCommentDto } from '../comments/dto/create-comment.dto';
import type { CreateThreadDto } from './dto/create-thread.dto';
import { ThreadResponseDto } from './dto/thread-response.dto';
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

  async getAllThreads(): Promise<ThreadResponseDto[]> {
    const threads = await this.threads.find({ order: { createdAt: 'DESC' } });
    return plainToInstance(ThreadResponseDto, threads, {
      excludeExtraneousValues: true,
    });
  }

  async getThreadById(id: string): Promise<ThreadResponseDto | null> {
    const thread = await this.threads.findOneBy({ id });
    return plainToInstance(ThreadResponseDto, thread, {
      excludeExtraneousValues: true,
    });
  }

  async createThread(dto: CreateThreadDto): Promise<ThreadResponseDto> {
    const thread = this.threads.create(dto);
    const saved = await this.threads.save(thread);
    return plainToInstance(ThreadResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async updateThread(
    id: string,
    dto: UpdateThreadDto,
  ): Promise<ThreadResponseDto> {
    const thread = await this.threads.findOneBy({ id });
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }

    const saved = await this.threads.save(this.threads.merge(thread, dto));
    return plainToInstance(ThreadResponseDto, saved, {
      excludeExtraneousValues: true,
    });
  }

  async addCommentToThread(
    id: string,
    dto: CreateCommentDto,
  ): Promise<ThreadResponseDto> {
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

    const threadWithComments = await this.threads.findOneOrFail({
      where: { id },
      relations: { comments: true },
    });
    return plainToInstance(ThreadResponseDto, threadWithComments, {
      excludeExtraneousValues: true,
    });
  }

  async deleteThread(id: string): Promise<ThreadResponseDto> {
    const thread = await this.threads.findOne({
      where: { id },
      relations: { comments: true },
    });
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }

    await this.threads.delete(id);
    return plainToInstance(ThreadResponseDto, thread, {
      excludeExtraneousValues: true,
    });
  }
}
