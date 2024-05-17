import type { Travel } from '../types/travel.interface';
import { TravelsResponse } from "../types/travels-response.interface";

export default {
  async findAll(): Promise<Travel[]> {
    const results: Promise<TravelsResponse> = await GqlGetTravels()
    return results.travels.nodes
  },

  async findOneBySlug(slug: String): Promise<Travel> {
    const results: Promise<TravelsResponse> = await GqlGetTravelBySlug({ slug: slug })

    return results.travel
  },

}
