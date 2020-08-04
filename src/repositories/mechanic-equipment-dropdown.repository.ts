import {DefaultCrudRepository, repository, BelongsToAccessor, HasOneRepositoryFactory} from '@loopback/repository';
import {MechanicEquipmentDropdown, MechanicEquipmentDropdownRelations, Orders, MechanicEquipment} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OrdersRepository} from './orders.repository';
import {MechanicEquipmentRepository} from './mechanic-equipment.repository';

export class MechanicEquipmentDropdownRepository extends DefaultCrudRepository<
  MechanicEquipmentDropdown,
  typeof MechanicEquipmentDropdown.prototype.id,
  MechanicEquipmentDropdownRelations
> {

  public readonly orders: BelongsToAccessor<Orders, typeof MechanicEquipmentDropdown.prototype.id>;

  public readonly mechanicEquipment: HasOneRepositoryFactory<MechanicEquipment, typeof MechanicEquipmentDropdown.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('OrdersRepository') protected ordersRepositoryGetter: Getter<OrdersRepository>, @repository.getter('MechanicEquipmentRepository') protected mechanicEquipmentRepositoryGetter: Getter<MechanicEquipmentRepository>,
  ) {
    super(MechanicEquipmentDropdown, dataSource);
    this.mechanicEquipment = this.createHasOneRepositoryFactoryFor('mechanicEquipment', mechanicEquipmentRepositoryGetter);
    this.registerInclusionResolver('mechanicEquipment', this.mechanicEquipment.inclusionResolver);
    this.orders = this.createBelongsToAccessorFor('orders', ordersRepositoryGetter,);
    this.registerInclusionResolver('orders', this.orders.inclusionResolver);
  }
}
