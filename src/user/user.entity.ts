import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from '../product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  email: string;

  @Field((type) => Int)
  @Column()
  age: number;

  @Field(() => [Product], { nullable: true })
  @OneToMany(() => Product, (product) => product.user)
  order?: Product[];
}
