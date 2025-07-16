import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from './product.entity';

@ObjectType()
export class PaginatedProducts {
  @Field(() => [Product])
  results!: Product[];

  @Field(() => Int)
  totalCount!: number;

  @Field(() => Int)
  totalPages!: number;

  @Field(() => Int)
  currentPage!: number;
}
