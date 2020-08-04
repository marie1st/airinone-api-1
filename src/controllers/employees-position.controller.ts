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
  Position,
} from '../models';
import {EmployeesRepository} from '../repositories';

export class EmployeesPositionController {
  constructor(
    @repository(EmployeesRepository) protected employeesRepository: EmployeesRepository,
  ) { }

  @get('/employees/{id}/position', {
    responses: {
      '200': {
        description: 'Employees has one Position',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Position),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Position>,
  ): Promise<Position> {
    return this.employeesRepository.position(id).get(filter);
  }

  @patch('/employees/{id}/position', {
    responses: {
      '200': {
        description: 'Employees.Position PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Position, {partial: true}),
        },
      },
    })
    position: Partial<Position>,
    @param.query.object('where', getWhereSchemaFor(Position)) where?: Where<Position>,
  ): Promise<Count> {
    return this.employeesRepository.position(id).patch(position, where);
  }

  @del('/employees/{id}/position', {
    responses: {
      '200': {
        description: 'Employees.Position DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Position)) where?: Where<Position>,
  ): Promise<Count> {
    return this.employeesRepository.position(id).delete(where);
  }
}
