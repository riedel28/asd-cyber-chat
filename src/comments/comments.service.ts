import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import type { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { CommentResponseDto } from './dto/comment-response.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly comments: Repository<Comment>,
  ) {}

  async getCommentById(id: number): Promise<CommentResponseDto | null> {
    const comment = await this.comments.findOneBy({ id });
    return plainToInstance(CommentResponseDto, comment, {
      excludeExtraneousValues: true,
    });
  }

  async deleteComment(id: number): Promise<void> {
    const result = await this.comments.delete(id);
    if ((result.affected ?? 0) === 0) {
      throw new NotFoundException(`Comment not found.`);
    }
  }
}
