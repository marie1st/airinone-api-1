import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Manageemployees, ManageemployeesRelations, Orders, Employees} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrdersRepository} from './orders.repository';
import {EmployeesRepository} from './employees.repository';

export class ManageemployeesRepository extends DefaultCrudRepository<
  Manageemployees,
  typeof Manageemployees.prototype.id,
  ManageemployeesRelations
> {

  public readonly orders: BelongsToAccessor<Orders, typeof Manageemployees.prototype.id>;

  public readonly employees: HasManyRepositoryFactory<Employees, typeof Manageemployees.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, @repository.getter('EmployeesRepository') protected employeesRepositoryGetter: Getter<EmployeesRepository>,
  ) {
    super(Manageemployees, dataSource);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeesRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
    this.orders = this.createBelongsToAccessorFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
