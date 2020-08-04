import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Orders} from './orders.model';

@model()
export class InstallProcess extends Entity {
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
  status: string;

  @belongsTo(() => Orders)
  ordersId: number;

  constructor(data?: Partial<InstallProcess>) {
    super(data);
  }
}

export interface InstallProcessRelations {
  // describe navigational properties here
}

export type InstallProcessWithRelations = InstallProcess & InstallProcessRelations;
