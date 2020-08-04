import {DefaultCrudRepository} from '@loopback/repository';
import {SingleUseEquipment, SingleUseEquipmentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class SingleUseEquipmentRepository extends DefaultCrudRepository<
  SingleUseEquipment,
  typeof SingleUseEquipment.prototype.id,
  SingleUseEquipmentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(SingleUseEquipment, dataSource);
  }
}
