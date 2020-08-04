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
  Education,
} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesEducationController {
  constructor(
    @repository(EmployeesRepository) protected employeesRepository: EmployeesRepository,
  ) { }

  @get('/employees/{id}/education', {
    responses: {
      '200': {
        description: 'Employees has one Education',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Education),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Education>,
  ): Promise<Education> {
    return this.employeesRepository.education(id).get(filter);
  }

  @patch('/employees/{id}/education', {
    responses: {
      '200': {
        description: 'Employees.Education PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Education, {partial: true}),
        },
      },
    })
    education: Partial<Education>,
    @param.query.object('where', getWhereSchemaFor(Education)) where?: Where<Education>,
  ): Promise<Count> {
    return this.employeesRepository.education(id).patch(education, where);
  }

  @del('/employees/{id}/education', {
    responses: {
      '200': {
        description: 'Employees.Education DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Education)) where?: Where<Education>,
  ): Promise<Count> {
    return this.employeesRepository.education(id).delete(where);
  }
}
