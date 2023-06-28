// user.resolver.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { User } from './user.entity';

describe('UserResolver', () => {
  let userResolver: UserResolver;

  const mockUserService = {
    create: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ ...dto, id: Date.now() })),
    findAll: jest.fn().mockResolvedValue([
      {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        age: 25,
        order: [],
      },
    ]),
    findOne: jest.fn().mockResolvedValue(new User()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userResolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(userResolver).toBeDefined();
  });

  it('should create a user', async () => {
    const createUserInput = {
      name: 'Test User',
      email: 'test@example.com',
      age: 25,
      order: [],
    };

    const newUser = await userResolver.createUser(createUserInput);

    expect(newUser).toBeDefined();
    expect(newUser.name).toEqual(createUserInput.name);
    expect(newUser.email).toEqual(createUserInput.email);
    expect(newUser.age).toEqual(createUserInput.age);
    expect(mockUserService.create).toBeCalledWith(createUserInput);
  });

  it('should find all users', async () => {
    const result = await userResolver.getUsers();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toEqual(1);
    expect(result[0].name).toEqual('Test User');
    expect(result[0].email).toEqual('test@example.com');
    expect(result[0].age).toEqual(25);
    expect(mockUserService.findAll).toBeCalled();
  });

  it('should find one user', async () => {
    const result = await userResolver.getUser(1);
    expect(result).toBeInstanceOf(User);
    expect(mockUserService.findOne).toBeCalledWith(1);
  });
});
