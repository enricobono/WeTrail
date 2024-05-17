import type { Travel } from '../types/travel.interface';
import { TravelsResponse } from "../types/travels-response.interface";

export default {
  async findAll(): Promise<Travel[]> {
    const results :Promise<TravelsResponse>= await GqlGetTravels()

    return results.travels.nodes
  }
  // return Client.get(`${resource}`);
  // },
  // getTravel(id) {
  //   return Client.get(`${resource}/${id}`);
  // },
  // create(payload) {
  //   return Client.post(`${resource}`, payload);
  // },
  // update(payload, id) {
  //   return Client.put(`${resource}/${id}`, payload);
  // },

}
