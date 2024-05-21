import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { TravelsService } from '../travels/travels.service';
import { createMock } from '@golevelup/ts-jest';
import { EntityManager } from '@mikro-orm/core';
import { Travel } from "../travels/entities/travel.entity";
import { CreateBookingInput } from "./dto/create-booking.input";
import { Booking } from "./entities/booking.entity";
import { NotFoundException } from "@nestjs/common";

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

  it('createBooking should create a new booking', async () => {
    const dto: CreateBookingInput = {
      travelSlug: 'travel-1',
      seats: 1
    };

    const travel = {
      id: '00000000-0000-4000-b000-000000000002',
      price: 100000
    } as Travel

    travelsService.findOneBySlug = jest
      .fn()
      .mockResolvedValueOnce(travel);

    em.create = jest.fn().mockImplementation((entity, data) => data);

    const result = await sut.create(dto);

    expect(em.create).toHaveBeenCalled();
    expect(em.persistAndFlush).toHaveBeenCalled();
    expect(result.status).toBe('reserved');
  });

  it('createBooking should throw an exception when the travel does not exist', async () => {
    const dto: CreateBookingInput = {
      travelSlug: 'travel-1',
      seats: 1
    };

    travelsService.findOneBySlug = jest
      .fn()
      .mockResolvedValueOnce(null);

    try {
      await sut.create(dto);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
      expect(error).toHaveProperty('message', 'Travel not found');
    }

    expect(em.create).not.toHaveBeenCalled();
    expect(em.persistAndFlush).not.toHaveBeenCalled();
  });

  it('findOneById should return a booking', async () => {
    const id = '00000000-0000-4000-b000-000000000001'

    em.findOne = jest
      .fn()
      .mockResolvedValueOnce({
        id: id,
        travelId: '00000000-0000-4000-b000-000000000002'
      });

    const results = await sut.findOneById('00000000-0000-4000-b000-000000000001');
    // console.log(results);

    expect(results).toBeInstanceOf(Object);
    expect(results.id).toBe('00000000-0000-4000-b000-000000000001');
    expect(results.travelId).toBe('00000000-0000-4000-b000-000000000002');
    expect(em.findOne).toHaveBeenCalledWith(Booking, { id });
  });

  it('delete should delete a booking', async () => {
    const booking = { id: '00000000-0000-4000-b000-000000000001' } as Booking

    em.removeAndFlush = jest
      .fn()
      .mockResolvedValueOnce({
        booking
      });

    await sut.delete(booking);

    expect(em.removeAndFlush).toHaveBeenCalledWith(booking);
  });
});
