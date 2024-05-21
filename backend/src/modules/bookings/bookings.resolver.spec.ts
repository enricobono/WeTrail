import { Test, TestingModule } from '@nestjs/testing';
import { BookingsResolver } from './bookings.resolver';
import { BookingsService } from './bookings.service';
import { createMock } from '@golevelup/ts-jest';
import { NotFoundException } from "@nestjs/common";
import { CreateBookingInput } from "./dto/create-booking.input";

describe('BookingsResolver', () => {
  let sut: BookingsResolver;
  let bookingsService: BookingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsResolver,
        { provide: BookingsService, useValue: createMock<BookingsService>() },
      ],
    }).compile();

    sut = module.get<BookingsResolver>(BookingsResolver);
    bookingsService = module.get<BookingsService>(BookingsService);
  });

  it('create should save a new booking', async () => {
    const dto: CreateBookingInput = {
      travelSlug: 'travel-1',
      seats: 1
    };

    bookingsService.create = jest
      .fn()
      .mockResolvedValueOnce({ travelId: 'travel-1', seats: 1 });

    const results = await sut.createBooking(dto);

    expect(results).toBeInstanceOf(Object);
    expect(results.travelId).toBe('travel-1');
    expect(results.seats).toBe(1);
    expect(bookingsService.create).toHaveBeenCalledWith(dto);
  });

  it('findOneById should return a booking', async () => {
    bookingsService.findOneById = jest
      .fn()
      .mockResolvedValueOnce({ id: '00000000-0000-4000-b000-000000000001', seats: 1 });

    const results = await sut.findOneById('00000000-0000-4000-b000-000000000001');

    expect(results).toBeInstanceOf(Object);
    expect(results.id).toBe('00000000-0000-4000-b000-000000000001');
    expect(results.seats).toBe(1);
    expect(bookingsService.findOneById).toHaveBeenCalledTimes(1);
  });

  it('findOneById should throw an exception if no booking found', async () => {
    bookingsService.findOneById = jest
      .fn()
      .mockResolvedValueOnce(null);

    try {
      await sut.findOneById('00000000-0000-4000-b000-000000000001');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error).toHaveProperty('message', 'Booking not found');
    }

    expect(bookingsService.findOneById).toHaveBeenCalledTimes(1);
  });

  it('delete should delete a booking', async () => {
    const booking = { id: '00000000-0000-4000-b000-000000000001', seats: 1 };
    bookingsService.findOneById = jest
      .fn()
      .mockResolvedValueOnce(booking);

    await sut.deleteOneById('00000000-0000-4000-b000-000000000001');

    expect(bookingsService.delete).toHaveBeenCalledWith(booking);
  });

  it('delete should throw an exception if no booking found', async () => {
    bookingsService.findOneById = jest
      .fn()
      .mockResolvedValueOnce(null);

    try {
      await sut.deleteOneById('00000000-0000-4000-b000-000000000001');
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error).toHaveProperty('message', 'Booking not found');
    }

    expect(bookingsService.findOneById).toHaveBeenCalledTimes(1);
    expect(bookingsService.delete).not.toHaveBeenCalled();
  });
});