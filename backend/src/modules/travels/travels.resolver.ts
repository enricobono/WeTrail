import {
  Args,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { NotFoundException } from '@nestjs/common';
import { Travel } from './entities/travel.entity';
import { TravelType } from './types/travel.type';
import { TravelsService } from './travels.service';
import { TravelsResults } from "./types/travels-results.type";

@Resolver(() => TravelType)
export class TravelsResolver {
  constructor(
    private readonly travelsService: TravelsService,
  ) {
  }

  @Query(() => TravelsResults, { name: 'travels' })
  async findAll(): Promise<TravelsResults> {
    console.log('travels.resolver findAll()');

    const nodes = await this.travelsService.findAll();

    return new TravelsResults(nodes);
  }

  @Query(() => TravelType, { name: 'travel' })
  async findOne(
    @Args('id') id: string,
  ): Promise<Travel> {
    console.log('travels.resolver findOneById()');

    const travel = await this.travelsService.findOne(id);
    if (!travel) {
      throw new NotFoundException('Travel not found');
    }

    return travel;
  }
}
