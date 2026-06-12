import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Comment } from '../comments/comments.entity';
import { Thread } from './threads.entity';
import { ThreadsService } from './threads.service';

describe('ThreadsService', () => {
  let service: ThreadsService;
  let threads: jest.Mocked<
    Pick<
      Repository<Thread>,
      | 'create'
      | 'delete'
      | 'findAndCount'
      | 'findOne'
      | 'findOneBy'
      | 'findOneOrFail'
      | 'merge'
      | 'save'
    >
  >;
  let comments: jest.Mocked<
    Pick<Repository<Comment>, 'create' | 'createQueryBuilder' | 'save'>
  >;

  beforeEach(async () => {
    threads = {
      create: jest.fn(),
      delete: jest.fn(),
      findAndCount: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      findOneOrFail: jest.fn(),
      merge: jest.fn(),
      save: jest.fn(),
    };
    comments = {
      create: jest.fn(),
      createQueryBuilder: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ThreadsService,
        {
          provide: getRepositoryToken(Thread),
          useValue: threads,
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: comments,
        },
      ],
    }).compile();

    service = module.get<ThreadsService>(ThreadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
