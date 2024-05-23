import type { Travel } from '../types/travel.interface';
import { TravelResponse } from "../types/travel-response.interface";
import { TravelsResponse } from "../types/travels-response.interface";

export default {
  async findAll(): Promise<Travel[]> {
    const results: Promise<TravelsResponse> = await GqlGetTravels()
    return results.travels.nodes
  },

  async findOneBySlug(slug: String): Promise<Travel> {
    const results: Promise<TravelResponse> = await GqlGetTravelBySlug({ slug: slug })

    return results.getTravelBySlug
  },

  async find(id: String): Promise<Travel | null> {
      const results: Promise<TravelResponse> = await GqlGetTravelById({ id: id })

      return results.getTravelById
  }
}
