import {DefaultCrudRepository} from '@loopback/repository';
import {Stores, StoresRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class StoresRepository extends DefaultCrudRepository<
  Stores,
  typeof Stores.prototype.id,
  StoresRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Stores, dataSource);
  }
}
