import {DefaultCrudRepository} from '@loopback/repository';
import {MechanicEquipment, MechanicEquipmentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MechanicEquipmentRepository extends DefaultCrudRepository<
  MechanicEquipment,
  typeof MechanicEquipment.prototype.id,
  MechanicEquipmentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(MechanicEquipment, dataSource);
  }
}
