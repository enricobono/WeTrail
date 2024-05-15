import { Injectable } from '@nestjs/common';
import { Travel } from './entities/travel.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { OrderDefinition } from "@mikro-orm/core";

@Injectable()
export class TravelsService {
  constructor(private em: EntityManager) {
  }

  async findAll() {
    console.log('travels.service: findAll travels');

    const orderBy: OrderDefinition<Travel> = { startingDate: 'ASC' };

    const [nodes] = await this.em.findAndCount(Travel, {}, { orderBy });
    return nodes;
  }

  async findOne(id: string) {
    const travel = await this.em.findOne(Travel, { id });
    return travel;
  }
}
