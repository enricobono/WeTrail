import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingType } from './types/booking.type';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking-input';
import { PayBookingInput } from './dto/pay-booking-input';

@Resolver(() => BookingType)
export class BookingsResolver {
  constructor(private readonly bookingsService: BookingsService) {}

  @Mutation(() => BookingType)
  async createBooking(
    @Args('createBookingInput') createBookingInput: CreateBookingInput,
  ) {
    return await this.bookingsService.create(createBookingInput);
  }

  @Mutation(() => BookingType, { name: 'payBooking' })
  async payBooking(@Args('payBookingInput') payBookingInput: PayBookingInput) {
    return await this.bookingsService.pay(payBookingInput.id, payBookingInput);
  }

  @Query(() => BookingType, { name: 'getBookingById' })
  async findOneById(@Args('id') id: string): Promise<Booking> {
    console.log('bookings.resolver findOneById()');

    const booking = await this.bookingsService.findOneById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  @Mutation(() => BookingType, { name: 'deleteBookingById' })
  async deleteOneById(@Args('id') id: string) {
    const booking = await this.bookingsService.findOneById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    await this.bookingsService.delete(booking);
  }
}
