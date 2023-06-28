// product.resolver.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { UserService } from '../user/user.service';
import { Product } from './product.entity';

describe('ProductResolver', () => {
  let productResolver: ProductResolver;

  const mockProductService = {
    create: jest
      .fn()
      .mockImplementation((dto) => Promise.resolve({ ...dto, id: Date.now() })),
    findAll: jest
      .fn()
      .mockResolvedValue([
        { id: 1, name: 'Test Product 1', price: 10.99, userId: 1 },
      ]),
  };

  const mockUserService = {}; // no methods to mock in the given context

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductResolver,
        {
          provide: ProductService,
          useValue: mockProductService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    productResolver = module.get<ProductResolver>(ProductResolver);
  });

  it('should be defined', () => {
    expect(productResolver).toBeDefined();
  });

  it('should create a product', async () => {
    const createProductInput = {
      name: 'Test Product',
      price: 10.99,
      userId: 1,
    };

    const newProduct = await productResolver.createProduct(createProductInput);

    expect(newProduct).toBeDefined();
    expect(newProduct.name).toEqual(createProductInput.name);
    expect(newProduct.price).toEqual(createProductInput.price);
    expect(mockProductService.create).toBeCalledWith(createProductInput);
  });

  it('should find all products', async () => {
    const result = await productResolver.getProducts();
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].id).toEqual(1);
    expect(result[0].name).toEqual('Test Product 1');
    expect(result[0].price).toEqual(10.99);
    expect(mockProductService.findAll).toBeCalled();
  });
});
