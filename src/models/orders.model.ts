import {Entity, model, property, hasOne} from '@loopback/repository';
import {Products} from './products.model';

@model()
export class Orders extends Entity {
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
  order_code: string;

  @property({
    type: 'string',
    required: true,
  })
  order_form: string;

  @property({
    type: 'string',
    required: true,
  })
  appointment_date: string;

  @property({
    type: 'string',
    required: true,
  })
  order_type: string;

  @property({
    type: 'number',
    required: true,
  })
  products_quantity: number;

  @property({
    type: 'string',
    required: true,
  })
  order_detail: string;

  @property({
    type: 'boolean',
    required: true,
  })
  is_approved: boolean;

  @property({
    type: 'string',
  })
  review_detail?: string;

  @property({
    type: 'number',
  })
  review_point?: number;

  @property({
    type: 'number',
  })
  customersId?: number;

  @hasOne(() => Products)
  products: Products;

  constructor(data?: Partial<Orders>) {
    super(data);
  }
}

export interface OrdersRelations {
  // describe navigational properties here
}

export type OrdersWithRelations = Orders & OrdersRelations;
