import {
  DateType,
  Entity,
  IntegerType,
  PrimaryKey,
  Property,
  Unique,
  UuidType,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({tableName:'travels'})
export class Travel {
  @PrimaryKey({ type: UuidType })
  id: string = v4();

  @Property()
  @Unique()
  slug: string;

  @Property()
  @Unique()
  name: string;

  @Property()
  description: string;

  @Property()
  image: string;

  @Property({ type: DateType })
  startingDate: Date;

  @Property({ type: DateType })
  endingDate: Date;

  @Property({ type: IntegerType })
  price: number;

  @Property({ type: IntegerType })
  totalSeats: number;

  @Property({ type: IntegerType })
  reservedSeats: number;

  @Property({ type: IntegerType })
  moodNature: number;

  @Property({ type: IntegerType })
  moodRelax: number;

  @Property({ type: IntegerType })
  moodHistory: number;

  @Property({ type: IntegerType })
  moodCulture: number;

  @Property({ type: IntegerType })
  moodParty: number;
}
