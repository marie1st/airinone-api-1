import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Orders} from './orders.model';
import {SingleUseEquipment} from './single-use-equipment.model';

@model()
export class SingleUseEquipmentDropdown extends Entity {
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

  @hasOne(() => SingleUseEquipment)
  singleUseEquipment: SingleUseEquipment;

  constructor(data?: Partial<SingleUseEquipmentDropdown>) {
    super(data);
  }
}

export interface SingleUseEquipmentDropdownRelations {
  // describe navigational properties here
}

export type SingleUseEquipmentDropdownWithRelations = SingleUseEquipmentDropdown & SingleUseEquipmentDropdownRelations;
