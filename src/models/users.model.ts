import {Entity, model, property, belongsTo, hasOne} from '@loopback/repository';
import {Roles} from './roles.model';
import {Useraddress} from './useraddress.model';
import {Customers} from './customers.model';
import {Employees} from './employees.model';
import {Stores} from './stores.model';

@model()
export class Users extends Entity {
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
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  created: string;

  @hasOne(() => Roles)
  rolesId: Roles;

  @hasOne(() => Useraddress)
  useraddress: Useraddress;

  @hasOne(() => Customers)
  customers: Customers;

  @hasOne(() => Employees)
  employees: Employees;

  @hasOne(() => Stores)
  stores: Stores;

  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
