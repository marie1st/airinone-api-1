import {Entity, model, property} from '@loopback/repository';

@model()
export class Education extends Entity {
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

  constructor(data?: Partial<Education>) {
    super(data);
  }
}

export interface EducationRelations {
  // describe navigational properties here
}

export type EducationWithRelations = Education & EducationRelations;
