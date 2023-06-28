// user.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserService', () => {
  let userService: UserService;

  const mockUserRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((user) =>
        Promise.resolve({ ...user, id: Date.now() }),
      ),
    find: jest.fn().mockResolvedValue([]),
    findOne: jest.fn().mockResolvedValue(new User()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      age: 25,
      order: [],
    };

    const user = await userService.create(createUserDto);

    expect(user).toBeDefined();
    expect(user.name).toEqual(createUserDto.name);
    expect(user.email).toEqual(createUserDto.email);
    expect(user.age).toEqual(createUserDto.age);
    expect(mockUserRepository.create).toBeCalledWith(createUserDto);
    expect(mockUserRepository.save).toBeCalled();
  });

  it('should find all users', async () => {
    const result = await userService.findAll();
    expect(result).toEqual([]);
    expect(mockUserRepository.find).toBeCalledWith({ relations: ['order'] });
  });

  it('should find one user', async () => {
    const result = await userService.findOne(1);
    expect(result).toBeInstanceOf(User);
    expect(mockUserRepository.findOne).toBeCalledWith({ where: { id: 1 } });
  });
});
