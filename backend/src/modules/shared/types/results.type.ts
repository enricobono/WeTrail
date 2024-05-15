import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';

export interface IResultsType<T> {
  nodes: T[];
}

export function Results<T>(classRef: Type<T>): Type<IResultsType<T>> {
  @ObjectType({ isAbstract: true })
  abstract class ResultsType implements IResultsType<T> {
    constructor(nodes: T[]) {
      this.nodes = nodes;
    }

    @Field(() => [classRef], { nullable: true })
    nodes: T[];
  }
  return ResultsType as Type<IResultsType<T>>;
}
