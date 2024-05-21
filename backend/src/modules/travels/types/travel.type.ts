import {
  Field,
  GraphQLISODateTime,
  ID,
  InputType,
  Int,
  ObjectType,
} from '@nestjs/graphql';

@ObjectType()
@InputType({ isAbstract: true })
export class TravelType {
  @Field(() => ID)
  id: string;

  @Field()
  slug: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image: string;

  @Field(() => GraphQLISODateTime)
  startingDate: Date;

  @Field(() => GraphQLISODateTime)
  endingDate: Date;

  @Field(() => Int)
  price: number;

  @Field(() => Int)
  totalSeats: number;

  @Field(() => Int)
  reservedSeats: number;

  // We may move the mood* fields in a dedicated table with a one-to-many or many-to-many relation,
  // but the sample travels.json file suggests all those moods are mandatory for each Travel,
  // even if they are presented as a sub-object.
  // So we are keeping them here, to save some queries on the database
  @Field(() => Int)
  mood_nature: number;

  @Field(() => Int)
  mood_relax: number;

  @Field(() => Int)
  mood_history: number;

  @Field(() => Int)
  mood_culture: number;

  @Field(() => Int)
  mood_party: number;
}
