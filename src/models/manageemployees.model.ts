import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Orders} from './orders.model';
import {Employees} from './employees.model';

@model()
export class Manageemployees extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @belongsTo(() => Orders)
  ordersId: number;

  @hasMany(() => Employees, {keyTo: 'workforces'})
  employees: Employees[];

  constructor(data?: Partial<Manageemployees>) {
    super(data);
  }
}

export interface ManageemployeesRelations {
  // describe navigational properties here
}

export type ManageemployeesWithRelations = Manageemployees & ManageemployeesRelations;
