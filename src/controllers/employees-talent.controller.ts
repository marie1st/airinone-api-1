import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Employees,
  Talent,
} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesTalentController {
  constructor(
    @repository(EmployeesRepository) protected employeesRepository: EmployeesRepository,
  ) { }

  @get('/employees/{id}/talent', {
    responses: {
      '200': {
        description: 'Employees has one Talent',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Talent),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Talent>,
  ): Promise<Talent> {
    return this.employeesRepository.talent(id).get(filter);
  }

  @patch('/employees/{id}/talent', {
    responses: {
      '200': {
        description: 'Employees.Talent PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Talent, {partial: true}),
        },
      },
    })
    talent: Partial<Talent>,
    @param.query.object('where', getWhereSchemaFor(Talent)) where?: Where<Talent>,
  ): Promise<Count> {
    return this.employeesRepository.talent(id).patch(talent, where);
  }

  @del('/employees/{id}/talent', {
    responses: {
      '200': {
        description: 'Employees.Talent DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Talent)) where?: Where<Talent>,
  ): Promise<Count> {
    return this.employeesRepository.talent(id).delete(where);
  }
}
