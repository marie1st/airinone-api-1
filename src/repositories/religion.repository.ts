import {DefaultCrudRepository} from '@loopback/repository';
import {Religion, ReligionRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ReligionRepository extends DefaultCrudRepository<
  Religion,
  typeof Religion.prototype.id,
  ReligionRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Religion, dataSource);
  }
}
