import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuotesController } from './quotes/quotes.controller';
import { QuotesService } from './quotes.service';
import { ThreadsModule } from './threads/threads.module';
import { CommentsModule } from './comments/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Thread } from './threads/threads.entity';
import { Comment } from './comments/comments.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth-guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThreadsModule,
    CommentsModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: '../data/db.sqlite',
      entities: [Thread, Comment, User],
      synchronize: true,
      logging: false,
      enableWAL: true,
      statementCacheSize: 100,
    }),
    AuthModule,
  ],
  controllers: [AppController, QuotesController],
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    AppService,
    QuotesService,
  ],
})
export class AppModule {}
