import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Orders} from './orders.model';
import {MechanicEquipment} from './mechanic-equipment.model';

@model()
export class MechanicEquipmentDropdown extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  equipments_quantity: number;

  @property({
    type: 'boolean',
    required: true,
  })
  is_approved: boolean;

  @belongsTo(() => Orders)
  ordersId: number;

  @hasOne(() => MechanicEquipment)
  mechanicEquipment: MechanicEquipment;

  constructor(data?: Partial<MechanicEquipmentDropdown>) {
    super(data);
  }
}

export interface MechanicEquipmentDropdownRelations {
  // describe navigational properties here
}

export type MechanicEquipmentDropdownWithRelations = MechanicEquipmentDropdown & MechanicEquipmentDropdownRelations;
