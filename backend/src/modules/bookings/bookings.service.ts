import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/core';
import { TravelsService } from '../travels/travels.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from "./dto/create-booking.input";

@Injectable()
export class BookingsService {
  constructor(
    private em: EntityManager,
    private travelsService: TravelsService,
  ) {
  }

  async create(createBookingInput: CreateBookingInput) {
    const { travelSlug, seats } = createBookingInput;
    console.log(travelSlug);

    try {
      const travel = await this.travelsService.findOneBySlug(travelSlug);
      if (!travel) {
        throw new NotFoundException('Travel not found');
      }

      //todo:eb check if there are enough seats on this travel

      const booking = this.em.create(
        Booking,
        {
          travelId: travel.id,
          status: 'reserved',
          seats: seats,
          grandTotal: travel.price * seats,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      await this.em.persistAndFlush(booking);
      return booking;
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: string) {
    console.log('bookings.service: findOneById()');
    return await this.em.findOne(Booking, { id });
  }

  async delete(booking: Booking) {
    console.log('bookings.service: deleteOneById()');
    await this.em.removeAndFlush(booking);
  }
}
