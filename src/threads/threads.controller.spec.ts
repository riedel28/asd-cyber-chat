import { Test, TestingModule } from '@nestjs/testing';
import { ThreadsController } from './threads.controller';
import { ThreadsService } from './threads.service';

describe('ThreadsController', () => {
  let controller: ThreadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThreadsController],
      providers: [
        {
          provide: ThreadsService,
          useValue: {
            addCommentToThread: jest.fn(),
            createThread: jest.fn(),
            deleteThread: jest.fn(),
            findAll: jest.fn(),
            getThreadById: jest.fn(),
            updateThread: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ThreadsController>(ThreadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
