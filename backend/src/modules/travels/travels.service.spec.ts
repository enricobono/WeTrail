import { Test, TestingModule } from '@nestjs/testing';
import { TravelsService } from './travels.service';
import { createMock } from '@golevelup/ts-jest';
import { EntityManager } from '@mikro-orm/postgresql';
import { Travel } from './entities/travel.entity';

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

  describe('travels service', () => {
    it('findAll should return all the travels', async () => {
      em.findAndCount = jest
        .fn()
        .mockResolvedValueOnce([[{ id: 'travel-1', name: 'Test travel' }], 1]);

      const results = await sut.findAll();

      expect(results).toBeInstanceOf(Array);
      expect(results[0].id).toBe('travel-1');
      expect(results[0].name).toBe('Test travel');
      expect(em.findAndCount).toHaveBeenCalledWith(Travel, {}, { orderBy: { startingDate: 'ASC' } });
    });

    it('findOneBySlug should return a travel', async () => {
      em.findOne = jest
        .fn()
        .mockResolvedValueOnce({ id: 'travel-1', name: 'Test travel' });

      const slug = 'travel-1'
      const results = await sut.findOneBySlug(slug);
      console.log(results);

      expect(results).toBeInstanceOf(Object);
      expect(results.id).toBe('travel-1');
      expect(results.name).toBe('Test travel');
      expect(em.findOne).toHaveBeenCalledWith(Travel, { slug });
    });
  });
});
