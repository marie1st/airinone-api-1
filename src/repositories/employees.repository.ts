import {DefaultCrudRepository} from '@loopback/repository';
import {Employees, EmployeesRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EmployeesRepository extends DefaultCrudRepository<
  Employees,
  typeof Employees.prototype.id,
  EmployeesRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Employees, dataSource);
  }
}
