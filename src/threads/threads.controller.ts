import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

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

  @Patch(':id')
  async updateThread(@Param('id') id: string, @Body() dto: UpdateThreadDto) {
    return this.threadsService.updateThread(id, dto);
  }

  @Post(':id/comments')
  async addCommentToThread(
    @Param('id') id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.threadsService.addCommentToThread(id, dto);
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
