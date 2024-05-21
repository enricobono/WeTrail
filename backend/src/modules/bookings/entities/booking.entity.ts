import {
  DateTimeType,
  Entity,
  IntegerType,
  PrimaryKey,
  Property,
  UuidType,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity({ tableName: 'bookings' })
export class Booking {
  @PrimaryKey({ type: UuidType })
  id: string = v4();

  @Property()
  travelId: string

  @Property()
  status: string

  @Property({ type: IntegerType })
  seats: number;

  @Property({ type: IntegerType })
  grandTotal: number;

  @Property({ nullable: true })
  firstName: string

  @Property({ nullable: true })
  lastName: string

  @Property({ nullable: true })
  email: string

  @Property({ nullable: true })
  phoneNumber: string

  @Property({ nullable: true })
  address1: string

  @Property({ nullable: true })
  address2: string

  @Property({ nullable: true })
  city: string

  @Property({ nullable: true })
  province: string

  @Property({ nullable: true })
  country: string

  @Property({ nullable: true })
  zipCode: string

  @Property({ nullable: true })
  paymentProcessor: string

  @Property({ nullable: true })
  paymentId: string

  @Property({ type: DateTimeType, nullable: true })
  createdAt: Date;

  @Property({ type: DateTimeType, nullable: true })
  updatedAt: Date;
}
