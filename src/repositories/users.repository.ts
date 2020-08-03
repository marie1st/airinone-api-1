import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Users, UsersRelations, Roles, Useraddress, Customers, Employees, Stores} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {RolesRepository} from './roles.repository';
import {UseraddressRepository} from './useraddress.repository';
import {CustomersRepository} from './customers.repository';
import {EmployeesRepository} from './employees.repository';
import {StoresRepository} from './stores.repository';

export class UsersRepository extends DefaultCrudRepository<
  Users,
  typeof Users.prototype.id,
  UsersRelations
> {

  public readonly rolesId: HasOneRepositoryFactory<Roles, typeof Users.prototype.id>;

  public readonly useraddress: HasOneRepositoryFactory<Useraddress, typeof Users.prototype.id>;

  public readonly customers: HasOneRepositoryFactory<Customers, typeof Users.prototype.id>;

  public readonly employees: HasOneRepositoryFactory<Employees, typeof Users.prototype.id>;

  public readonly stores: HasOneRepositoryFactory<Stores, typeof Users.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>, @repository.getter('UseraddressRepository') protected useraddressRepositoryGetter: Getter<UseraddressRepository>, @repository.getter('CustomersRepository') protected customersRepositoryGetter: Getter<CustomersRepository>, @repository.getter('EmployeesRepository') protected employeesRepositoryGetter: Getter<EmployeesRepository>, @repository.getter('StoresRepository') protected storesRepositoryGetter: Getter<StoresRepository>,
  ) {
    super(Users, dataSource);
    this.stores = this.createHasOneRepositoryFactoryFor('stores', storesRepositoryGetter);
    this.registerInclusionResolver('stores', this.stores.inclusionResolver);
    this.employees = this.createHasOneRepositoryFactoryFor('employees', employeesRepositoryGetter);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
    this.customers = this.createHasOneRepositoryFactoryFor('customers', customersRepositoryGetter);
    this.registerInclusionResolver('customers', this.customers.inclusionResolver);
    this.useraddress = this.createHasOneRepositoryFactoryFor('useraddress', useraddressRepositoryGetter);
    this.registerInclusionResolver('useraddress', this.useraddress.inclusionResolver);
    this.rolesId = this.createHasOneRepositoryFactoryFor('rolesId', rolesRepositoryGetter);
    this.registerInclusionResolver('rolesId', this.rolesId.inclusionResolver);
  }
}
