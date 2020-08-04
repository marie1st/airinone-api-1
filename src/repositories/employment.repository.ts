import {DefaultCrudRepository} from '@loopback/repository';
import {Employment, EmploymentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmploymentRepository extends DefaultCrudRepository<
  Employment,
  typeof Employment.prototype.id,
  EmploymentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Employment, dataSource);
  }
}
