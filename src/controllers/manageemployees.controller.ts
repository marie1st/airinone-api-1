import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Manageemployees} from '../models';
import {ManageemployeesRepository} from '../repositories';

export class ManageemployeesController {
  constructor(
    @repository(ManageemployeesRepository)
    public manageemployeesRepository : ManageemployeesRepository,
  ) {}

  @post('/manageemployees', {
    responses: {
      '200': {
        description: 'Manageemployees model instance',
        content: {'application/json': {schema: getModelSchemaRef(Manageemployees)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manageemployees, {
            title: 'NewManageemployees',
            exclude: ['id'],
          }),
        },
      },
    })
    manageemployees: Omit<Manageemployees, 'id'>,
  ): Promise<Manageemployees> {
    return this.manageemployeesRepository.create(manageemployees);
  }

  @get('/manageemployees', {
    responses: {
      '200': {
        description: 'Array of Manageemployees model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Manageemployees, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Manageemployees) filter?: Filter<Manageemployees>,
  ): Promise<Manageemployees[]> {
    return this.manageemployeesRepository.find(filter);
  }

  @get('/manageemployees/{id}', {
    responses: {
      '200': {
        description: 'Manageemployees model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Manageemployees, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Manageemployees, {exclude: 'where'}) filter?: FilterExcludingWhere<Manageemployees>
  ): Promise<Manageemployees> {
    return this.manageemployeesRepository.findById(id, filter);
  }

  @patch('/manageemployees/{id}', {
    responses: {
      '204': {
        description: 'Manageemployees PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Manageemployees, {partial: true}),
        },
      },
    })
    manageemployees: Manageemployees,
  ): Promise<void> {
    await this.manageemployeesRepository.updateById(id, manageemployees);
  }

  @del('/manageemployees/{id}', {
    responses: {
      '204': {
        description: 'Manageemployees DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.manageemployeesRepository.deleteById(id);
  }
}
