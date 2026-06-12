import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Comment } from './comments.entity';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let comments: jest.Mocked<Pick<Repository<Comment>, 'delete' | 'findOneBy'>>;

  beforeEach(async () => {
    comments = {
      delete: jest.fn(),
      findOneBy: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(Comment),
          useValue: comments,
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
