import { ObjectType, Field, Int, ID } from '@nestjs/graphql';

@ObjectType()
export class Hero {
  @Field(() => ID)
  id!: string;

  @Field()
  url!: string;
}
