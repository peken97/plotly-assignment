import { InputType, Field } from '@nestjs/graphql';
import { CreateProductInput } from 'src/product/dto/create-product.input';

@InputType()
export class CreateUserInput {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  age: number;

  @Field(() => [CreateProductInput], { nullable: true })
  order: CreateProductInput[];
}
