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
  totalPax: number;

  @Property({ type: IntegerType })
  reservedPax: number;

  @Property({ type: IntegerType })
  mood_nature: number;

  @Property({ type: IntegerType })
  mood_relax: number;

  @Property({ type: IntegerType })
  mood_history: number;

  @Property({ type: IntegerType })
  mood_culture: number;

  @Property({ type: IntegerType })
  mood_party: number;
}
