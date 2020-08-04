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
import {Religion} from '../models';
import {ReligionRepository} from '../repositories';

export class ReligionController {
  constructor(
    @repository(ReligionRepository)
    public religionRepository : ReligionRepository,
  ) {}

  @post('/religions', {
    responses: {
      '200': {
        description: 'Religion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Religion)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Religion, {
            title: 'NewReligion',
            exclude: ['id'],
          }),
        },
      },
    })
    religion: Omit<Religion, 'id'>,
  ): Promise<Religion> {
    return this.religionRepository.create(religion);
  }

  @get('/religions', {
    responses: {
      '200': {
        description: 'Array of Religion model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Religion, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Religion) filter?: Filter<Religion>,
  ): Promise<Religion[]> {
    return this.religionRepository.find(filter);
  }

  @get('/religions/{id}', {
    responses: {
      '200': {
        description: 'Religion model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Religion, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Religion, {exclude: 'where'}) filter?: FilterExcludingWhere<Religion>
  ): Promise<Religion> {
    return this.religionRepository.findById(id, filter);
  }

  @patch('/religions/{id}', {
    responses: {
      '204': {
        description: 'Religion PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Religion, {partial: true}),
        },
      },
    })
    religion: Religion,
  ): Promise<void> {
    await this.religionRepository.updateById(id, religion);
  }

  @del('/religions/{id}', {
    responses: {
      '204': {
        description: 'Religion DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.religionRepository.deleteById(id);
  }
}
