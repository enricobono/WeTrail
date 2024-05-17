import type { Travel } from "./travel.interface";

export type TravelsResponse = {
  travels: {
    nodes: Travel[]
  }
}