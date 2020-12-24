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
    length: 50,
    required: true,
  })
  first_name: string;

  @property({
    type: 'string',
    length: 50,
    required: true,
  })
  last_name: string;

  @property({
    type: 'string',
    length: 13,
    required: true,
  })
  phone_number: string;

  @property({
    type: 'string',
    length: 50,
  })
  id_line?: string;

  @property({
    type: 'string',
    length: 50,
  })
  occupation?: string;

  @property({
    type: 'string',
    length: 100,
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    length: 100,
  })
  facebook?: string;

  @property({
    type: 'string',
    length: 100,
  })
  profile_pic?: string;

  @property({
    type: 'string',
    length: 100,
  })
  id_card_pic: string;

  @property({
    type: 'string',
    length: 100,
  })
  address?: string;

  @property({
    type: 'string',
    length: 50,
  })
  country: string;

  @property({
    type: 'string',
    length: 50,
  })
  province: string;

  @property({
    type: 'string',
    length: 50,
  })
  subdistrict: string;

  @property({
    type: 'string',
    length: 50,
  })
  district: string;

  @property({
    type: 'string',
    length: 5,
  })
  postcode: string;

  @property ({
    type: 'date',
    dataType: 'timestamp',
    defaultFn: 'now',
  })
  created_at: Date;

  @hasMany(() => Orders, {keyFrom:'id'})
  orders: Orders[];

  constructor(data?: Partial<Customers>) {
    super(data);
  }
}

export interface CustomersRelations {
  // describe navigational properties here
}

export type CustomersWithRelations = Customers & CustomersRelations;
