import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Product } from '../../products/entities/product.entity';

@ObjectType()
export class Genre {
  @Field(() => ID)
  id!: string;

  @Field()
  name!: string;

  @Field(() => [Product])
  products?: Product[];
}
