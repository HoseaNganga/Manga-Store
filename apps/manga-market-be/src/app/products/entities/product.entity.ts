import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Genre } from '../../genre/entities/genre.entity';

@ObjectType()
export class Product {
  @Field(() => ID)
  id!: string;

  @Field()
  title!: string;

  @Field()
  author!: string;

  @Field(() => [Genre])
  genres!: Genre[];

  @Field()
  description!: string;

  @Field(() => Float)
  price!: number;

  @Field()
  stock!: number;

  @Field()
  coverUrl!: string;

  @Field(() => [String])
  images!: string[];

  @Field(() => Float, { nullable: true })
  rating?: number;

  @Field()
  releaseDate!: Date;

  @Field()
  featured!: boolean;

  @Field()
  stripePriceId!: string;

  @Field()
  createdAt!: Date;

  @Field()
  updatedAt!: Date;

  @Field()
  trending!: boolean;

  @Field()
  isNew!: boolean;
}
