import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @Field((type) => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Field((type) => Int)
  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.order, { cascade: ['update'] })
  @Field(() => User, { nullable: true })
  user: User;
}
