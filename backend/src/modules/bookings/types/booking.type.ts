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
  travelId: string;

  @Field()
  status: string;

  @Field(() => Int)
  seats: number;

  @Field(() => Int)
  grandTotal: number;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  address: string;

  @Field({ nullable: true })
  city: string;

  @Field({ nullable: true })
  province: string;

  @Field({ nullable: true })
  country: string;

  @Field({ nullable: true })
  zipCode: string;

  @Field({ nullable: true })
  paymentProcessor: string;

  @Field({ nullable: true })
  paymentId: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  expiredAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
