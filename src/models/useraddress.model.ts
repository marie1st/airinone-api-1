import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Users} from './users.model';

@model()
export class Useraddress extends Entity {
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
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  subdistrict: string;

  @property({
    type: 'string',
    required: true,
  })
  district: string;

  @property({
    type: 'string',
    required: true,
  })
  province: string;

  @property({
    type: 'string',
    required: true,
  })
  post_code: string;

  @property({
    type: 'string',
    required: true,
  })
  country: string;

  constructor(data?: Partial<Useraddress>) {
    super(data);
  }
}

export interface UseraddressRelations {
  // describe navigational properties here
}

export type UseraddressWithRelations = Useraddress & UseraddressRelations;
