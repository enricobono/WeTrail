import { Test, TestingModule } from '@nestjs/testing';
import { TravelsResolver } from './travels.resolver';
import { TravelsService } from './travels.service';
import { createMock } from '@golevelup/ts-jest';
import { TravelsResults } from "./types/travels-results.type";
import { TravelType } from "./types/travel.type";

describe('TravelsResolver', () => {
  let sut: TravelsResolver;
  let travelsService: TravelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TravelsResolver,
        { provide: TravelsService, useValue: createMock<TravelsService>() },
      ],
    }).compile();

    sut = module.get<TravelsResolver>(TravelsResolver);
    travelsService = module.get<TravelsService>(TravelsService);
  });

  describe('Travels resolver', () => {
    it('findAll should return all the travels', async () => {
      travelsService.findAll = jest
        .fn()
        .mockResolvedValueOnce([{ id: 'travel-1', name: 'Test travel' }]);

      const results = await sut.findAll();

      expect(results).toBeInstanceOf(TravelsResults);
      expect(results.nodes[0]).toBeInstanceOf(Object);
      expect(results.nodes[0].id).toBe('travel-1');
      expect(results.nodes[0].name).toBe('Test travel');
      expect(travelsService.findAll).toHaveBeenCalledTimes(1);
    });

    it('findOneBySlug should return a travel', async () => {
      travelsService.findOneBySlug = jest
        .fn()
        .mockResolvedValueOnce({ id: 'travel-1', name: 'Test travel' });

      const results = await sut.findOneBySlug('travel-1');

      expect(results).toBeInstanceOf(Object);
      expect(results).toBeInstanceOf(Object);
      expect(results.id).toBe('travel-1');
      expect(results.name).toBe('Test travel');
      expect(travelsService.findOneBySlug).toHaveBeenCalledTimes(1);
    });
  });
});
