import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {SingleUseEquipmentDropdown, SingleUseEquipmentDropdownRelations, Orders, SingleUseEquipment} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrdersRepository} from './orders.repository';
import {SingleUseEquipmentRepository} from './single-use-equipment.repository';

export class SingleUseEquipmentDropdownRepository extends DefaultCrudRepository<
  SingleUseEquipmentDropdown,
  typeof SingleUseEquipmentDropdown.prototype.id,
  SingleUseEquipmentDropdownRelations
> {

  public readonly orders: BelongsToAccessor<Orders, typeof SingleUseEquipmentDropdown.prototype.id>;

  public readonly singleUseEquipment: HasOneRepositoryFactory<SingleUseEquipment, typeof SingleUseEquipmentDropdown.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, @repository.getter('SingleUseEquipmentRepository') protected singleUseEquipmentRepositoryGetter: Getter<SingleUseEquipmentRepository>,
  ) {
    super(SingleUseEquipmentDropdown, dataSource);
    this.singleUseEquipment = this.createHasOneRepositoryFactoryFor('singleUseEquipment', singleUseEquipmentRepositoryGetter);
    this.registerInclusionResolver('singleUseEquipment', this.singleUseEquipment.inclusionResolver);
    this.orders = this.createBelongsToAccessorFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
