import { Field, InputType, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CreateBookingInput {
  @Field()
  travelSlug: string;

  @Field()
  email: string;

  @Field(() => Int)
  @Min(0)
  @Max(5)
  seats: number;
}
