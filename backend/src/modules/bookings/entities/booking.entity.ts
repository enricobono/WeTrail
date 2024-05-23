import {
  DateTimeType,
  Entity,
  IntegerType,
  PrimaryKey,
  Property,
  UuidType,
} from '@mikro-orm/core';
import { v4 } from 'uuid';
import { IsEmail, IsNotEmpty, Max, Min } from 'class-validator';

@Entity({ tableName: 'bookings' })
export class Booking {
  @PrimaryKey({ type: UuidType })
  id: string = v4();

  @Property()
  @IsNotEmpty()
  travelId: string;

  @Property()
  status: string;

  @Property({ type: IntegerType })
  @Min(1)
  @Max(5)
  seats: number;

  @Property({ type: IntegerType })
  grandTotal: number;

  @Property({ nullable: true })
  @IsNotEmpty()
  firstName: string;

  @Property({ nullable: true })
  @IsNotEmpty()
  lastName: string;

  @Property()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Property({ nullable: true })
  @IsNotEmpty()
  phoneNumber: string;

  @Property({ nullable: true })
  @IsNotEmpty()
  address: string;

  @Property({ nullable: true })
  @IsNotEmpty()
  city: string;

  @Property({ nullable: true })
  @IsNotEmpty()
  province: string;

  @Property({ nullable: true })
  @IsNotEmpty()
  country: string;

  @Property({ nullable: true })
  @IsNotEmpty()
  zipCode: string;

  @Property({ nullable: true })
  paymentProcessor: string;

  @Property({ nullable: true })
  paymentId: string;

  @Property({ type: DateTimeType, nullable: true })
  createdAt: Date;

  @Property({ type: DateTimeType, nullable: true })
  expiredAt: Date;

  @Property({ type: DateTimeType, nullable: true })
  updatedAt: Date;
}
