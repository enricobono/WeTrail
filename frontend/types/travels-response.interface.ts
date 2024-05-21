import type { Travel } from "./travel.interface";

export interface TravelsResponse {
  travels: {
    nodes: Travel[]
  }
}