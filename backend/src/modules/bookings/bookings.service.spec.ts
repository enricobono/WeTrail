import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { TravelsService } from '../travels/travels.service';
import { createMock } from '@golevelup/ts-jest';
import { EntityManager } from '@mikro-orm/postgresql';
import { Booking } from './entities/booking.entity';
import { CreateBookingInput } from './dto/create-booking-input';
import { Travel } from '../travels/entities/travel.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { PayBookingInput } from './dto/pay-booking-input';

describe('BookingsService', () => {
  let sut: BookingsService;
  let travelsService: TravelsService;
  let em: EntityManager;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        { provide: TravelsService, useValue: createMock<TravelsService>() },
        { provide: EntityManager, useValue: createMock<EntityManager>() },
      ],
    }).compile();

    sut = module.get<BookingsService>(BookingsService);
    travelsService = module.get<TravelsService>(TravelsService);
    em = module.get<EntityManager>(EntityManager);
  });

  it('should create a new booking on createBooking()', async () => {
    const dto: CreateBookingInput = {
      travelSlug: 'travel-1',
      email: 'email@example.com',
      seats: 1,
    };

    const travel = {
      id: '00000000-0000-4000-b000-000000000002',
      price: 100000,
    } as Travel;

    travelsService.findOneBySlug = jest.fn().mockResolvedValueOnce(travel);

    em.create = jest.fn().mockImplementation((entity, data) => data);

    const result = await sut.create(dto);

    expect(em.create).toHaveBeenCalled();
    expect(em.persistAndFlush).toHaveBeenCalled();
    expect(result.status).toBe('reserved');
  });

  it('should throw an exception when the travel does not exist on createBooking()', async () => {
    const dto: CreateBookingInput = {
      travelSlug: 'travel-1',
      email: 'email@example.com',
      seats: 1,
    };

    travelsService.findOneBySlug = jest.fn().mockResolvedValueOnce(null);

    try {
      await sut.create(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error).toHaveProperty('message', 'Travel not found');
    }

    expect(em.create).not.toHaveBeenCalled();
    expect(em.persistAndFlush).not.toHaveBeenCalled();
  });

  it('should throw an exception when no seats are available on createBooking()', async () => {
    const dto: CreateBookingInput = {
      travelSlug: 'travel-1',
      email: 'email@example.com',
      seats: 1,
    };

    const travel = {
      id: '00000000-0000-4000-b000-000000000002',
      price: 100000,
    } as Travel;

    travelsService.findOneBySlug = jest.fn().mockResolvedValueOnce(travel);
    sut.findReservedSeatsByTravelId = jest.fn().mockResolvedValueOnce(5);

    try {
      await sut.create(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error).toHaveProperty(
        'message',
        'No available seats for this travel',
      );
    }

    expect(em.create).not.toHaveBeenCalled();
    expect(em.persistAndFlush).not.toHaveBeenCalled();
  });

  it('should create a new booking on payBooking()', async () => {
    const dto: PayBookingInput = {
      id: '00000000-0000-4000-b000-000000000001',
      firstName: 'Roger',
      lastName: 'Waters',
      email: 'roger@example.com',
      phoneNumber: '+44 12 1234567',
      address: 'Abbey Rd, 1',
      city: 'London',
      province: 'Greater London',
      country: 'UK',
      zipCode: 'NW8 0AE',
      creditCardNumber: '4242424242424242',
      creditCardName: 'Roger Waters',
      expirationMonth: 8,
      expirationYear: 29,
    };

    const booking = {
      id: '00000000-0000-4000-b000-000000000002',
    } as Booking;

    sut.findOneById = jest.fn().mockResolvedValueOnce(booking);

    em.flush = jest.fn().mockImplementation((entity, data) => data);

    const result = await sut.pay('00000000-0000-4000-b000-000000000001', dto);

    expect(em.flush).toHaveBeenCalled();
    expect(result.status).toBe('paid');
  });

  it('should throw an exception when the booking does not exist on payBooking()', async () => {
    const dto: PayBookingInput = {
      id: '00000000-0000-4000-b000-000000000001',
      firstName: 'Roger',
      lastName: 'Waters',
      email: 'roger@example.com',
      phoneNumber: '+44 12 1234567',
      address: 'Abbey Rd, 1',
      city: 'London',
      province: 'Greater London',
      country: 'UK',
      zipCode: 'NW8 0AE',
      creditCardNumber: '4242424242424242',
      creditCardName: 'Roger Waters',
      expirationMonth: 8,
      expirationYear: 29,
    };

    sut.findOneById = jest.fn().mockResolvedValueOnce(null);

    try {
      await sut.pay('00000000-0000-4000-b000-000000000001', dto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error).toHaveProperty('message', 'Booking not found');
    }

    expect(em.flush).not.toHaveBeenCalled();
  });

  it('should return a booking on findOneById()', async () => {
    const id = '00000000-0000-4000-b000-000000000001';

    em.findOne = jest.fn().mockResolvedValueOnce({
      id: id,
      travelId: '00000000-0000-4000-b000-000000000002',
    });

    const results = await sut.findOneById(
      '00000000-0000-4000-b000-000000000001',
    );

    expect(results).toBeInstanceOf(Object);
    expect(results.id).toBe('00000000-0000-4000-b000-000000000001');
    expect(results.travelId).toBe('00000000-0000-4000-b000-000000000002');
    expect(em.findOne).toHaveBeenCalledWith(Booking, { id });
  });

  it('should delete a booking on delete()', async () => {
    const booking = { id: '00000000-0000-4000-b000-000000000001' } as Booking;

    em.removeAndFlush = jest.fn().mockResolvedValueOnce({
      booking,
    });

    await sut.delete(booking);

    expect(em.removeAndFlush).toHaveBeenCalledWith(booking);
  });
});
