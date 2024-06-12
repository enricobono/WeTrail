import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { TravelsService } from '../travels/travels.service';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking-input';
import { PayBookingInput } from './dto/pay-booking-input';
import { BookingConstants } from './booking.constants';

@Injectable()
export class BookingsService {
  constructor(
    private em: EntityManager,
    private travelsService: TravelsService,
  ) {}

  async create(createBookingInput: CreateBookingInput) {
    const { travelSlug, email, seats } = createBookingInput;

    const travel = await this.travelsService.findOneBySlug(travelSlug);
    if (!travel) {
      throw new NotFoundException('Travel not found');
    }

    const reservedSeats = await this.findReservedSeatsByTravelId(travel.id);
    if (reservedSeats >= BookingConstants.MAX_SEATS_PER_TRAVEL) {
      throw new BadRequestException('No available seats for this travel');
    }

    if (seats > BookingConstants.MAX_SEATS_PER_TRAVEL - reservedSeats) {
      throw new BadRequestException(
        'No all the requested seats are available for this travel',
      );
    }

    const now = new Date();
    const expiredAt = new Date();
    expiredAt.setMinutes(
      expiredAt.getMinutes() + BookingConstants.EXPIRATION_INTERVAL,
    );

    const booking = this.em.create(Booking, {
      travelId: travel.id,
      status: 'reserved',
      email: email,
      seats: seats,
      grandTotal: travel.price * seats,
      createdAt: now,
      expiredAt: expiredAt,
      updatedAt: now,
    });

    await this.em.persistAndFlush(booking);

    return booking;
  }

  async pay(id: string, payBookingInput: PayBookingInput) {
    const booking = await this.findOneById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    // Process the credit card payment...
    // const paymentDetails = await PaymentProcessor.pay({
    //   booking.creditCardNumber,
    //   booking.creditCardName,
    //   booking.expirationMonth,
    //   booking.expirationYear
    // });

    // Fake payment processor response
    const paymentDetails = {
      processor: 'stripe',
      id: 'pm_1MqLiJLkdIwHu7ixUEgbFdYF',
    };

    if (Math.random() > 0.8) {
      throw new BadRequestException('Simulate payment failure');
    }

    booking.status = 'paid';
    booking.firstName = payBookingInput.firstName;
    booking.lastName = payBookingInput.lastName;
    booking.email = payBookingInput.email;
    booking.phoneNumber = payBookingInput.phoneNumber;
    booking.address = payBookingInput.address;
    booking.city = payBookingInput.city;
    booking.province = payBookingInput.province;
    booking.country = payBookingInput.country;
    booking.zipCode = payBookingInput.zipCode;

    booking.paymentProcessor = paymentDetails.processor;
    booking.paymentId = paymentDetails.id;

    booking.updatedAt = new Date();

    await this.em.flush();
    return booking;
  }

  async findOneById(id: string) {
    return await this.em.findOne(Booking, { id });
  }

  async delete(booking: Booking) {
    await this.em.removeAndFlush(booking);
  }

  async findReservedSeatsByTravelId(travelId: string): Promise<number> {
    const results = await this.em.getConnection().execute(
      `SELECT SUM(b.seats) AS reserved_seats
       FROM bookings b
       WHERE travel_id = ?
         AND (status = ? OR expired_at >= NOW())
       GROUP BY travel_id`,
      [travelId, 'paid'],
    );

    if (results.length === 0) {
      return 0;
    }

    return results[0].reserved_seats;
  }
}
