import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';

@Module({
  providers: [CommentsRepository, CommentsService],
  controllers: [CommentsController],
  exports: [CommentsRepository],
})
export class CommentsModule {}
