import {DefaultCrudRepository} from '@loopback/repository';
import {Position, PositionRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PositionRepository extends DefaultCrudRepository<
  Position,
  typeof Position.prototype.id,
  PositionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Position, dataSource);
  }
}
