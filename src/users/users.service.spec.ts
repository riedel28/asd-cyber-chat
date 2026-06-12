import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { instanceToPlain } from 'class-transformer';
import type { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;
  let users: jest.Mocked<
    Pick<Repository<User>, 'create' | 'findOneBy' | 'save'>
  >;

  beforeEach(async () => {
    users = {
      create: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: users,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('hashes passwords before persisting a user', async () => {
    users.findOneBy.mockResolvedValue(null);
    users.create.mockImplementation((user) => user as User);
    users.save.mockImplementation((user) =>
      Promise.resolve({
        id: 'user-id',
        username: user.username,
        passwordHash: user.passwordHash,
      }),
    );

    const result = await service.createUser({
      username: 'sergio',
      password: 'super-secret',
    });

    expect(users.save).toHaveBeenCalledTimes(1);
    const savedUser = users.save.mock.calls[0][0] as User;
    expect(savedUser.username).toBe('sergio');
    expect(typeof savedUser.passwordHash).toBe('string');
    expect(savedUser.passwordHash).not.toBe('super-secret');
    await expect(
      bcrypt.compare('super-secret', savedUser.passwordHash),
    ).resolves.toBe(true);
    expect(result).toEqual({ id: 'user-id', username: 'sergio' });
  });

  it('finds a user by username for auth consumers', async () => {
    const user = {
      id: 'user-id',
      username: 'sergio',
      passwordHash: 'stored-hash',
    };
    users.findOneBy.mockResolvedValue(user);

    await expect(service.findByUsername('sergio')).resolves.toBe(user);
    expect(users.findOneBy).toHaveBeenCalledWith({ username: 'sergio' });
  });

  it('excludes passwordHash when a user entity is serialized', () => {
    const user = new User();
    user.id = 'user-id';
    user.username = 'sergio';
    user.passwordHash = 'stored-hash';

    expect(instanceToPlain(user)).toEqual({
      id: 'user-id',
      username: 'sergio',
    });
  });

  it('rejects duplicate usernames before hashing or saving', async () => {
    users.findOneBy.mockResolvedValue({
      id: 'existing-id',
      username: 'sergio',
      passwordHash: 'existing-hash',
    });

    await expect(
      service.createUser({ username: 'sergio', password: 'super-secret' }),
    ).rejects.toThrow('Username is already taken.');

    expect(users.create).not.toHaveBeenCalled();
    expect(users.save).not.toHaveBeenCalled();
  });
});
