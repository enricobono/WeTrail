import { Test, TestingModule } from '@nestjs/testing';
import { TravelsService } from './travels.service';
import { createMock } from '@golevelup/ts-jest';
import { EntityManager } from '@mikro-orm/postgresql';

describe('TravelsService', (): void => {
  let sut: TravelsService;
  let em: EntityManager;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelsService,
        { provide: EntityManager, useValue: createMock<EntityManager>() },
      ],
    }).compile();

    sut = module.get<TravelsService>(TravelsService);
    em = module.get<EntityManager>(EntityManager);
  });

  it('should return all the travels on findAll()', async () => {
    const connectionMock = {
      execute: () => {
        return [{ id: 'travel-1', name: 'Test travel', reserved_seats: 2 }];
      },
    };

    em.getConnection = jest.fn().mockImplementation(() => connectionMock);

    const results = await sut.findAll();

    expect(results).toBeInstanceOf(Array);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('travel-1');
    expect(results[0].name).toBe('Test travel');
    expect(results[0].reservedSeats).toBe(2);
  });

  it('should return a travel on findOneBySlug()', async () => {
    const connectionMock = {
      execute: () => {
        return [{ id: 'travel-1', name: 'Test travel', reserved_seats: 2 }];
      },
    };

    em.getConnection = jest.fn().mockImplementation(() => connectionMock);

    const slug = 'travel-1';
    const results = await sut.findOneBySlug(slug);

    expect(results).toBeInstanceOf(Object);
    expect(results.id).toBe('travel-1');
    expect(results.name).toBe('Test travel');
    expect(results.name).toBe('Test travel');
  });

  it('should return a travel on findOneById()', async () => {
    const connectionMock = {
      execute: () => {
        return [{ id: 'travel-1', name: 'Test travel', reserved_seats: 2 }];
      },
    };

    em.getConnection = jest.fn().mockImplementation(() => connectionMock);

    const id = '00000000-0000-4000-b000-000000000001';
    const results = await sut.findOneById(id);

    expect(results).toBeInstanceOf(Object);
    expect(results.id).toBe('travel-1');
    expect(results.name).toBe('Test travel');
    expect(results.name).toBe('Test travel');
  });
});
