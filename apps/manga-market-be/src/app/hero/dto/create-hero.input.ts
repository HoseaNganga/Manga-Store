import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateHeroInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
