import {Entity, model, property} from '@loopback/repository';

@model()
export class Employment extends Entity {
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
  employeesId?: number;

  constructor(data?: Partial<Employment>) {
    super(data);
  }
}

export interface EmploymentRelations {
  // describe navigational properties here
}

export type EmploymentWithRelations = Employment & EmploymentRelations;
