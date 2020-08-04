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
  Religion,
} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesReligionController {
  constructor(
    @repository(EmployeesRepository) protected employeesRepository: EmployeesRepository,
  ) { }

  @get('/employees/{id}/religion', {
    responses: {
      '200': {
        description: 'Employees has one Religion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Religion),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Religion>,
  ): Promise<Religion> {
    return this.employeesRepository.religion(id).get(filter);
  }

  @patch('/employees/{id}/religion', {
    responses: {
      '200': {
        description: 'Employees.Religion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Religion, {partial: true}),
        },
      },
    })
    religion: Partial<Religion>,
    @param.query.object('where', getWhereSchemaFor(Religion)) where?: Where<Religion>,
  ): Promise<Count> {
    return this.employeesRepository.religion(id).patch(religion, where);
  }

  @del('/employees/{id}/religion', {
    responses: {
      '200': {
        description: 'Employees.Religion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Religion)) where?: Where<Religion>,
  ): Promise<Count> {
    return this.employeesRepository.religion(id).delete(where);
  }
}
