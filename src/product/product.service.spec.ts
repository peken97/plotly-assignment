// product.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { UserService } from '../user/user.service';
import { Product } from './product.entity';
import { User } from '../user/user.entity';

describe('ProductService', () => {
  let productService: ProductService;
  let userService: UserService;

  const mockProductRepository = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((product) =>
        Promise.resolve({ ...product, id: Date.now() }),
      ),
    find: jest.fn().mockResolvedValue([]),
  };

  const mockUserService = {
    findOne: jest.fn().mockResolvedValue(new User()),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    productService = module.get<ProductService>(ProductService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(productService).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductDto = {
      name: 'Test Product',
      price: 10.99,
      userId: 1,
    };

    const product = await productService.create(createProductDto);

    expect(product).toBeDefined();
    expect(product.name).toEqual(createProductDto.name);
    expect(product.price).toEqual(createProductDto.price);
    expect(mockProductRepository.create).toBeCalledWith(createProductDto);
    expect(mockProductRepository.save).toBeCalled();
    expect(mockUserService.findOne).toBeCalledWith(createProductDto.userId);
  });

  it('should find all products', async () => {
    const result = await productService.findAll();
    expect(result).toEqual([]);
    expect(mockProductRepository.find).toBeCalledWith({ relations: ['user'] });
  });

  it('should find user', async () => {
    const result = await productService.findUser(1);
    expect(result).toBeInstanceOf(User);
    expect(mockUserService.findOne).toBeCalledWith(1);
  });
});
