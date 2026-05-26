import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  providers: [CommentsRepository, CommentsService],
  controllers: [CommentsController],
  exports: [CommentsRepository],
})
export class CommentsModule {}
