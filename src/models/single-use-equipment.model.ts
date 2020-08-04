import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: true}})
export class SingleUseEquipment extends Entity {
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
    type: 'string',
    required: true,
  })
  brand: string;

  @property({
    type: 'string',
    required: true,
  })
  model: string;

  @property({
    type: 'string',
  })
  detail?: string;

  @property({
    type: 'string',
    required: true,
  })
  unit: string;

  @property({
    type: 'number',
  })
  singleUseEquipmentDropdownId?: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SingleUseEquipment>) {
    super(data);
  }
}

export interface SingleUseEquipmentRelations {
  // describe navigational properties here
}

export type SingleUseEquipmentWithRelations = SingleUseEquipment & SingleUseEquipmentRelations;
