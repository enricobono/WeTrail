import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
export class BookingType {
  @Field(() => ID)
  id: string;

  @Field()
  travelId: string

  @Field()
  status: string;

  @Field(() => Int)
  seats: number;

  @Field(() => Int)
  grandTotal: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  address1: string;

  @Field()
  address2: string;

  @Field()
  city: string;

  @Field()
  province: string;

  @Field()
  country: string;

  @Field()
  zipCode: string;

  @Field()
  paymentProcessor: string;

  @Field()
  paymentId: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
