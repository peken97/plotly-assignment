import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { UserService } from '../user/user.service';
import { CreateProductInput } from './dto/create-product.input';

@Resolver(() => Product)
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  @Mutation((returns) => Product)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    const newProduct = await this.productService.create(createProductInput);

    return newProduct;
  }

  @Query(() => [Product])
  async getProducts() {
    return this.productService.findAll();
  }
}
