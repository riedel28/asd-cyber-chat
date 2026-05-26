import { Module } from '@nestjs/common';
// import { CommentsModule } from '../comments/comments.module';
import { ThreadsService } from './threads.service';
import { ThreadsController } from './threads.controller';
import { Comment } from 'src/comments/comments.entity';
import { Thread } from './threads.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Thread, Comment])],
  providers: [ThreadsService],
  controllers: [ThreadsController],
})
export class ThreadsModule {}
