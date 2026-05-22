import { Module } from '@nestjs/common';
import { CommentsModule } from '../comments/comments.module';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { ThreadsRepository } from './threads.repository';

@Module({
  imports: [CommentsModule],
  providers: [ThreadsService, ThreadsRepository],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
