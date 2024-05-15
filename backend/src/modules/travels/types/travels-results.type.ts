import { ObjectType } from '@nestjs/graphql';

import { TravelType } from './travel.type';
import {Results} from "../../shared/types/results.type";

@ObjectType()
export class TravelsResults extends Results(TravelType) {}
