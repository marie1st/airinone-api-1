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
import {Position} from '../models';
import {PositionRepository} from '../repositories';

export class PositionController {
  constructor(
    @repository(PositionRepository)
    public positionRepository : PositionRepository,
  ) {}

  @post('/positions', {
    responses: {
      '200': {
        description: 'Position model instance',
        content: {'application/json': {schema: getModelSchemaRef(Position)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Position, {
            title: 'NewPosition',
            exclude: ['id'],
          }),
        },
      },
    })
    position: Omit<Position, 'id'>,
  ): Promise<Position> {
    return this.positionRepository.create(position);
  }

  @get('/positions', {
    responses: {
      '200': {
        description: 'Array of Position model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Position, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Position) filter?: Filter<Position>,
  ): Promise<Position[]> {
    return this.positionRepository.find(filter);
  }

  @get('/positions/{id}', {
    responses: {
      '200': {
        description: 'Position model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Position, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Position, {exclude: 'where'}) filter?: FilterExcludingWhere<Position>
  ): Promise<Position> {
    return this.positionRepository.findById(id, filter);
  }

  @del('/positions/{id}', {
    responses: {
      '204': {
        description: 'Position DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.positionRepository.deleteById(id);
  }
}
