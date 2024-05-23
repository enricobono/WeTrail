import { Field, InputType, Int } from '@nestjs/graphql';
import { IsUUID, Max, Min } from 'class-validator';

@InputType()
export class PayBookingInput {
  @Field()
  @IsUUID('4')
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  address: string;

  @Field()
  city: string;

  @Field()
  province: string;

  @Field()
  country: string;

  @Field()
  zipCode: string;

  @Field()
  creditCardNumber: string;

  @Field()
  creditCardName: string;

  @Field(() => Int)
  @Min(0)
  @Max(12)
  expirationMonth: number;

  @Field(() => Int)
  @Min(24)
  @Max(34)
  expirationYear: number;
}
