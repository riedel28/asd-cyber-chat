import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { Public } from 'src/common/decorators/public.decorator';

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
  async deleteComment(@Param('id', ParseIntPipe) id: number) {
    await this.commentsService.deleteComment(id);
  }
}
