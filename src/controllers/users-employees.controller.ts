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
  Users,
  Employees,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersEmployeesController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/employees', {
    responses: {
      '200': {
        description: 'Users has one Employees',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employees),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Employees>,
  ): Promise<Employees> {
    return this.usersRepository.employees(id).get(filter);
  }

  @patch('/users/{id}/employees', {
    responses: {
      '200': {
        description: 'Users.Employees PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employees, {partial: true}),
        },
      },
    })
    employees: Partial<Employees>,
    @param.query.object('where', getWhereSchemaFor(Employees)) where?: Where<Employees>,
  ): Promise<Count> {
    return this.usersRepository.employees(id).patch(employees, where);
  }

  @del('/users/{id}/employees', {
    responses: {
      '200': {
        description: 'Users.Employees DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Employees)) where?: Where<Employees>,
  ): Promise<Count> {
    return this.usersRepository.employees(id).delete(where);
  }
}
