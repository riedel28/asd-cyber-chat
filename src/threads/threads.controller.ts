import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Patch,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Public()
  @Get()
  getAllThreads(@Query() pagination: PaginationQueryDto) {
    return this.threadsService.findAll(pagination);
  }

  @Post()
  createThread(@Body() dto: CreateThreadDto) {
    return this.threadsService.createThread(dto);
  }

  @Public()
  @Get(':id')
  async getThreadById(@Param('id', ParseUUIDPipe) id: string) {
    const thread = await this.threadsService.getThreadById(id);
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }
    return thread;
  }

  @Patch(':id')
  async updateThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateThreadDto,
  ) {
    return this.threadsService.updateThread(id, dto);
  }

  @Post(':id/comments')
  async addCommentToThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateCommentDto,
  ) {
    return this.threadsService.addCommentToThread(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteThread(@Param('id', ParseUUIDPipe) id: string) {
    await this.threadsService.deleteThread(id);
  }
}
