import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import type { CreateThreadDto } from './threads.dto';
import type { CreateCommentDto } from 'src/comments/comments.dto';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Get()
  getAllThreads() {
    return this.threadsService.getAllThreads();
  }

  @Post()
  createThread(@Body() dto: CreateThreadDto) {
    return this.threadsService.createThread(dto);
  }

  @Get(':id')
  async getThreadById(@Param('id') id: string) {
    const thread = await this.threadsService.getThreadById(id);
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }
    return thread;
  }

  @Post(':id/comments')
  async addCommentToThread(
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return await this.threadsService.addCommentToThread(id, dto);
  }

  @Delete(':id')
  async deleteThread(@Param('id') id: string) {
    const thread = await this.threadsService.deleteThread(id);
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }
    return thread;
  }
}
