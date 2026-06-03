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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user';
import { ThreadResponseDto } from './dto/thread-response.dto';
import { PaginatedThreadsResponseDto } from './dto/paginated-threads-response.dto';

@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List discussion threads' })
  @ApiOkResponse({
    description: 'A paginated list of threads.',
    type: PaginatedThreadsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'One or more query parameters are invalid.',
  })
  getAllThreads(@Query() pagination: PaginationQueryDto) {
    return this.threadsService.findAll(pagination);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new discussion thread' })
  @ApiCreatedResponse({
    description: 'The thread was created.',
    type: ThreadResponseDto,
  })
  @ApiBadRequestResponse({ description: 'The thread payload is invalid.' })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  createThread(
    @Body() dto: CreateThreadDto,
    @Request() req: { user: AuthenticatedUser },
  ) {
    return this.threadsService.createThread(dto, req.user.username);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a thread by id' })
  @ApiOkResponse({
    description: 'The requested thread.',
    type: ThreadResponseDto,
  })
  @ApiBadRequestResponse({ description: 'The thread id must be a UUID.' })
  @ApiNotFoundResponse({ description: 'No thread exists with that id.' })
  async getThreadById(@Param('id', ParseUUIDPipe) id: string) {
    const thread = await this.threadsService.getThreadById(id);
    if (!thread) {
      throw new NotFoundException(`Thread not found.`);
    }
    return thread;
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update one of your threads' })
  @ApiOkResponse({
    description: 'The updated thread.',
    type: ThreadResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The thread id or update payload is invalid.',
  })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  @ApiForbiddenResponse({
    description: 'You can only update your own threads.',
  })
  @ApiNotFoundResponse({ description: 'No thread exists with that id.' })
  async updateThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateThreadDto,
    @Request() req: { user: AuthenticatedUser },
  ) {
    return this.threadsService.updateThread(id, dto, req.user.username);
  }

  @Post(':id/comments')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Add a comment to a thread' })
  @ApiCreatedResponse({
    description:
      'The comment was added and the thread with comments is returned.',
    type: ThreadResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'The thread id or comment payload is invalid.',
  })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  @ApiNotFoundResponse({ description: 'No thread exists with that id.' })
  async addCommentToThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateCommentDto,
    @Request() req: { user: AuthenticatedUser },
  ) {
    return this.threadsService.addCommentToThread(id, dto, req.user.username);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete one of your threads' })
  @ApiNoContentResponse({ description: 'The thread was deleted.' })
  @ApiBadRequestResponse({ description: 'The thread id must be a UUID.' })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  @ApiForbiddenResponse({
    description: 'You can only delete your own threads.',
  })
  @ApiNotFoundResponse({ description: 'No thread exists with that id.' })
  async deleteThread(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req: { user: AuthenticatedUser },
  ) {
    await this.threadsService.deleteThread(id, req.user.username);
  }
}
