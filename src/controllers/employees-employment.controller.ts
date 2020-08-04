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
  Employment,
} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesEmploymentController {
  constructor(
    @repository(EmployeesRepository) protected employeesRepository: EmployeesRepository,
  ) { }

  @get('/employees/{id}/employment', {
    responses: {
      '200': {
        description: 'Employees has one Employment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employment),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employment>,
  ): Promise<Employment> {
    return this.employeesRepository.employment(id).get(filter);
  }

  @patch('/employees/{id}/employment', {
    responses: {
      '200': {
        description: 'Employees.Employment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employment, {partial: true}),
        },
      },
    })
    employment: Partial<Employment>,
    @param.query.object('where', getWhereSchemaFor(Employment)) where?: Where<Employment>,
  ): Promise<Count> {
    return this.employeesRepository.employment(id).patch(employment, where);
  }

  @del('/employees/{id}/employment', {
    responses: {
      '200': {
        description: 'Employees.Employment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employment)) where?: Where<Employment>,
  ): Promise<Count> {
    return this.employeesRepository.employment(id).delete(where);
  }
}
