import {Entity, model, property} from '@loopback/repository';

@model()
export class Talent extends Entity {
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

  constructor(data?: Partial<Talent>) {
    super(data);
  }
}

export interface TalentRelations {
  // describe navigational properties here
}

export type TalentWithRelations = Talent & TalentRelations;
