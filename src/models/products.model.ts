import {Entity, model, property} from '@loopback/repository';

@model()
export class Products extends Entity {
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
  product_brand: string;

  @property({
    type: 'string',
    required: true,
  })
  product_generation: string;

  @property({
    type: 'string',
    required: true,
  })
  product_name: string;

  @property({
    type: 'number',
    required: true,
  })
  product_price: number;

  @property({
    type: 'number',
  })
  ordersId?: number;

  constructor(data?: Partial<Products>) {
    super(data);
  }
}

export interface ProductsRelations {
  // describe navigational properties here
}

export type ProductsWithRelations = Products & ProductsRelations;
