import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':id')
  getCommentById(@Param('id', ParseIntPipe) id: number) {
    const comment = this.commentsService.getCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment not found.`);
    }
    return comment;
  }

  @Delete(':id')
  deleteComment(@Param('id', ParseIntPipe) id: number) {
    const deletedId = this.commentsService.deleteComment(id);
    if (!deletedId) {
      throw new NotFoundException(`Comment not found.`);
    }
    return deletedId;
  }
}
