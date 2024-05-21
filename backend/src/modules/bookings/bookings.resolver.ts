import {
  Args,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingType } from './types/booking.type';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking.input';

@Resolver(() => BookingType)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation(() => BookingType)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput) {
    console.log('bookingResolver.createBooking()');
    console.log(createBookingInput);

    const booking = await this.bookingsService.create(createBookingInput);
    console.log(booking);
    
    return booking;
  }

  @Query(() => BookingType, { name: 'getBookingById' })
  async findOneById(
    @Args('id') id: string,
  ): Promise<Booking> {
    console.log('bookings.resolver findOneById()');

    const booking = await this.bookingsService.findOneById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  @Query(() => BookingType, { name: 'deleteBookingById' })
  async deleteOneById(
    @Args('id') id: string,
  ) {
    console.log('bookings.resolver deleteOneById()');

    const booking = await this.bookingsService.findOneById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    await this.bookingsService.delete(booking);
  }
}
