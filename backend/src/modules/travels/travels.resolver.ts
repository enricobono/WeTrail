import {
  Args,
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
    const nodes = await this.travelsService.findAll();

    return new TravelsResults(nodes);
  }

  @Query(() => TravelType, { name: 'getTravelBySlug' })
  async findOneBySlug(
    @Args('slug') slug: string,
  ): Promise<Travel> {
    const travel = await this.travelsService.findOneBySlug(slug);

    if (!travel) {
      throw new NotFoundException('Travel not found');
    }

    return travel;
  }

  @Query(() => TravelType, { name: 'getTravelById' })
  async findOneById(
    @Args('id') id: string,
  ): Promise<Travel> {
    const travel = await this.travelsService.findOneById(id);

    if (!travel) {

      throw new NotFoundException('Travel not found');
    }

    return travel;
  }
}
