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
  Request,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Public()
  @Get()
  getAllThreads(@Query() pagination: PaginationQueryDto) {
    return this.threadsService.findAll(pagination);
  }

  @Post()
  createThread(
    @Body() dto: CreateThreadDto,
    @Request() req: { user: AuthenticatedUser },
  ) {
    return this.threadsService.createThread(dto, req.user.username);
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
    @Request() req: { user: AuthenticatedUser },
  ) {
    return this.threadsService.updateThread(id, dto, req.user.username);
  }

  @Post(':id/comments')
  async addCommentToThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateCommentDto,
    @Request() req: { user: AuthenticatedUser },
  ) {
    return this.threadsService.addCommentToThread(id, dto, req.user.username);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: AuthenticatedUser },
  ) {
    await this.threadsService.deleteThread(id, req.user.username);
  }
}
