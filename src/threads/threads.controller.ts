import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { type CreateThreadPayload } from './threads.service';
import { type Comment } from 'src/comments/comments.repository';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Get()
  getAllThreads() {
    return this.threadsService.getAllThreads();
  }

  @Post()
  createThread(@Body() body: CreateThreadPayload) {
    return this.threadsService.createThread(body);
  }

  @Get(':id')
  getThreadById(@Param('id', ParseIntPipe) id: number) {
    const thread = this.threadsService.getThreadById(id);
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }
    return thread;
  }

  @Post(':id/comments')
  addCommentToThread(
    @Param('id', ParseIntPipe) id: number,
    @Body() comment: Omit<Comment, 'id' | 'createdAt'>,
  ) {
    return this.threadsService.addComment(id, comment);
  }

  @Delete(':id')
  deleteThread(@Param('id', ParseIntPipe) id: number) {
    const deletedId = this.threadsService.deleteThread(id);
    if (!deletedId) {
      throw new NotFoundException(`Thread not found.`);
    }
    return deletedId;
  }
}
