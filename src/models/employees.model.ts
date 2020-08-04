import {Entity, model, property, hasOne} from '@loopback/repository';
import {Religion} from './religion.model';
import {Position} from './position.model';
import {Department} from './department.model';
import {Employment} from './employment.model';
import {Education} from './education.model';
import {Talent} from './talent.model';

@model()
export class Employees extends Entity {
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
  date_of_birth?: string;

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
  start_date?: string;

  @property({
    type: 'number',
  })
  salary?: number;

  @property({
    type: 'string',
  })
  emergency_name?: string;

  @property({
    type: 'string',
  })
  emergency_phone_number?: string;

  @property({
    type: 'number',
  })
  usersId?: number;

  @property({
    type: 'number',
  })
  workforces?: number;

  @hasOne(() => Religion)
  religion: Religion;

  @hasOne(() => Position)
  position: Position;

  @hasOne(() => Department)
  department: Department;

  @hasOne(() => Employment)
  employment: Employment;

  @hasOne(() => Education)
  education: Education;

  @hasOne(() => Talent)
  talent: Talent;

  constructor(data?: Partial<Employees>) {
    super(data);
  }
}

export interface EmployeesRelations {
  // describe navigational properties here
}

export type EmployeesWithRelations = Employees & EmployeesRelations;
