import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Public } from 'src/common/decorators/public.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Public()
  @Get(':id')
  async getCommentById(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentsService.getCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment not found.`);
    }
    return comment;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: AuthenticatedUser },
  ) {
    await this.commentsService.deleteComment(id, req.user.username);
  }
}
