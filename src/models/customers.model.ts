import {Entity, model, property, hasMany} from '@loopback/repository';
import {Orders} from './orders.model';

@model()
export class Customers extends Entity {
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
  first_name: string;

  @property({
    type: 'string',
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
    required: true,
  })
  phone_number: string;

  @property({
    type: 'string',
  })
  date_of_birth: string;

  @property({
    type: 'string',
  })
  career?: string;

  @property({
    type: 'string',
    required: true,
  })
  pid: string;

  @property({
    type: 'string',
  })
  id_line?: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
  })
  facebook?: string;

  @property({
    type: 'number',
  })
  usersId?: number;

  @hasMany(() => Orders)
  orders: Orders[];

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;
