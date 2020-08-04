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
  Department,
} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesDepartmentController {
  constructor(
    @repository(EmployeesRepository) protected employeesRepository: EmployeesRepository,
  ) { }

  @get('/employees/{id}/department', {
    responses: {
      '200': {
        description: 'Employees has one Department',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Department),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Department>,
  ): Promise<Department> {
    return this.employeesRepository.department(id).get(filter);
  }

  @patch('/employees/{id}/department', {
    responses: {
      '200': {
        description: 'Employees.Department PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Department, {partial: true}),
        },
      },
    })
    department: Partial<Department>,
    @param.query.object('where', getWhereSchemaFor(Department)) where?: Where<Department>,
  ): Promise<Count> {
    return this.employeesRepository.department(id).patch(department, where);
  }

  @del('/employees/{id}/department', {
    responses: {
      '200': {
        description: 'Employees.Department DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Department)) where?: Where<Department>,
  ): Promise<Count> {
    return this.employeesRepository.department(id).delete(where);
  }
}
