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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { Public } from 'src/common/decorators/public.decorator';
import type { AuthenticatedUser } from '../auth/types/authenticated-user';
import { CommentResponseDto } from './dto/comment-response.dto';

@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by id' })
  @ApiOkResponse({
    description: 'The requested comment.',
    type: CommentResponseDto,
  })
  @ApiBadRequestResponse({ description: 'The comment id must be an integer.' })
  @ApiNotFoundResponse({ description: 'No comment exists with that id.' })
  async getCommentById(@Param('id', ParseIntPipe) id: number) {
    const comment = await this.commentsService.getCommentById(id);
    if (!comment) {
      throw new NotFoundException(`Comment not found.`);
    }
    return comment;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete one of your comments' })
  @ApiNoContentResponse({ description: 'The comment was deleted.' })
  @ApiBadRequestResponse({ description: 'The comment id must be an integer.' })
  @ApiUnauthorizedResponse({ description: 'A valid bearer token is required.' })
  @ApiForbiddenResponse({
    description: 'You can only delete your own comments.',
  })
  @ApiNotFoundResponse({ description: 'No comment exists with that id.' })
  async deleteComment(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: { user: AuthenticatedUser },
  ) {
    await this.commentsService.deleteComment(id, req.user.username);
  }
}
