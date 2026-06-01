import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import type { Repository } from 'typeorm';
import { Comment } from '../comments/comments.entity';
import type { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import type { CreateCommentDto } from '../comments/dto/create-comment.dto';
import type { CreateThreadDto } from './dto/create-thread.dto';
import { ThreadResponseDto } from './dto/thread-response.dto';
import type { UpdateThreadDto } from './dto/update-thread.dto';
import { Thread } from './threads.entity';

export type CreateThreadPayload = Omit<Thread, 'id' | 'createdAt'>;
export type PaginatedThreadsResponse = {
  data: ThreadResponseDto[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

@Injectable()
export class ThreadsService {
  constructor(
    @InjectRepository(Thread)
    private readonly threads: Repository<Thread>,
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
  ) {}

  async findAll(
    pagination: PaginationQueryDto,
  ): Promise<PaginatedThreadsResponse> {
    const { page, limit, sort, author } = pagination;
    const [data, total] = await this.threads.findAndCount({
      order: { createdAt: sort === 'createdAt' ? 'ASC' : 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
      where: author ? { author } : {},
    });

    return {
      data: plainToInstance(ThreadResponseDto, data, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
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
    if (Object.keys(dto).length === 0) {
      throw new BadRequestException(`At least one field must be provided.`);
    }

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

  async deleteThread(id: string): Promise<void> {
    const thread = await this.threads.findOne({
      where: { id },
      relations: { comments: true },
    });
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }

    await this.comments
      .createQueryBuilder()
      .delete()
      .where('thread_id = :id', { id })
      .execute();
    await this.threads.delete(id);
  }
}
