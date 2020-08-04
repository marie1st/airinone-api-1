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
import {Employment} from '../models';
import {EmploymentRepository} from '../repositories';

export class EmploymentController {
  constructor(
    @repository(EmploymentRepository)
    public employmentRepository : EmploymentRepository,
  ) {}

  @post('/employments', {
    responses: {
      '200': {
        description: 'Employment model instance',
        content: {'application/json': {schema: getModelSchemaRef(Employment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employment, {
            title: 'NewEmployment',
            exclude: ['id'],
          }),
        },
      },
    })
    employment: Omit<Employment, 'id'>,
  ): Promise<Employment> {
    return this.employmentRepository.create(employment);
  }

  @get('/employments', {
    responses: {
      '200': {
        description: 'Array of Employment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Employment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Employment) filter?: Filter<Employment>,
  ): Promise<Employment[]> {
    return this.employmentRepository.find(filter);
  }

  @get('/employments/{id}', {
    responses: {
      '200': {
        description: 'Employment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Employment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Employment, {exclude: 'where'}) filter?: FilterExcludingWhere<Employment>
  ): Promise<Employment> {
    return this.employmentRepository.findById(id, filter);
  }

  @patch('/employments/{id}', {
    responses: {
      '204': {
        description: 'Employment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Employment, {partial: true}),
        },
      },
    })
    employment: Employment,
  ): Promise<void> {
    await this.employmentRepository.updateById(id, employment);
  }

  @del('/employments/{id}', {
    responses: {
      '204': {
        description: 'Employment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.employmentRepository.deleteById(id);
  }
}
