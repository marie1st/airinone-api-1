import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {InstallProcess, InstallProcessRelations, Orders} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrdersRepository} from './orders.repository';

export class InstallProcessRepository extends DefaultCrudRepository<
  InstallProcess,
  typeof InstallProcess.prototype.id,
  InstallProcessRelations
> {

  public readonly orders: BelongsToAccessor<Orders, typeof InstallProcess.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>,
  ) {
    super(InstallProcess, dataSource);
    this.orders = this.createBelongsToAccessorFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
