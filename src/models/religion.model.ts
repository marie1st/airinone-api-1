import {Entity, model, property} from '@loopback/repository';

@model()
export class Religion extends Entity {
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

  constructor(data?: Partial<Religion>) {
    super(data);
  }
}

export interface ReligionRelations {
  // describe navigational properties here
}

export type ReligionWithRelations = Religion & ReligionRelations;
