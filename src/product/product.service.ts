import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { User } from 'src/user/user.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    private userService: UserService,
  ) {}
  async create(createProductInput: CreateProductInput): Promise<Product> {
    const product = this.productsRepository.create(createProductInput);
    const user = await this.userService.findOne(createProductInput.userId);
    product.user = user;
    return this.productsRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productsRepository.find({
      relations: ['user'],
    });
    return products;
  }

  async findUser(id: number): Promise<User> {
    return this.userService.findOne(id);
  }
}
