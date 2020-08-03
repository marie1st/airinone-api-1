import {Entity, model, property} from '@loopback/repository';

@model()
export class Stores extends Entity {
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
  store_name: string;

  @property({
    type: 'string',
    required: true,
  })
  phone_number: string;

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

  constructor(data?: Partial<Stores>) {
    super(data);
  }
}

export interface StoresRelations {
  // describe navigational properties here
}

export type StoresWithRelations = Stores & StoresRelations;
