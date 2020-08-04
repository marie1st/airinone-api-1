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
  Manageemployees,
  Employees,
} from '../models';
import {ManageemployeesRepository} from '../repositories';

export class ManageemployeesEmployeesController {
  constructor(
    @repository(ManageemployeesRepository) protected manageemployeesRepository: ManageemployeesRepository,
  ) { }

  @get('/manageemployees/{id}/employees', {
    responses: {
      '200': {
        description: 'Array of Manageemployees has many Employees',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employees)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employees>,
  ): Promise<Employees[]> {
    return this.manageemployeesRepository.employees(id).find(filter);
  }

  @del('/manageemployees/{id}/employees', {
    responses: {
      '200': {
        description: 'Manageemployees.Employees DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employees)) where?: Where<Employees>,
  ): Promise<Count> {
    return this.manageemployeesRepository.employees(id).delete(where);
  }
}
