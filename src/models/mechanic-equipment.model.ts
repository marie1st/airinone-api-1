import {Entity, model, property} from '@loopback/repository';

@model()
export class MechanicEquipment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  mechanicEquipmentDropdownId?: number;

  constructor(data?: Partial<MechanicEquipment>) {
    super(data);
  }
}

export interface MechanicEquipmentRelations {
  // describe navigational properties here
}

export type MechanicEquipmentWithRelations = MechanicEquipment & MechanicEquipmentRelations;
