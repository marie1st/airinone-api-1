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
import {SingleUseEquipment} from '../models';
import {SingleUseEquipmentRepository} from '../repositories';

export class SingleUseEqController {
  constructor(
    @repository(SingleUseEquipmentRepository)
    public singleUseEquipmentRepository : SingleUseEquipmentRepository,
  ) {}

  @post('/single-use-equipments', {
    responses: {
      '200': {
        description: 'SingleUseEquipment model instance',
        content: {'application/json': {schema: getModelSchemaRef(SingleUseEquipment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SingleUseEquipment, {
            title: 'NewSingleUseEquipment',
            exclude: ['id'],
          }),
        },
      },
    })
    singleUseEquipment: Omit<SingleUseEquipment, 'id'>,
  ): Promise<SingleUseEquipment> {
    return this.singleUseEquipmentRepository.create(singleUseEquipment);
  }

  @get('/single-use-equipments', {
    responses: {
      '200': {
        description: 'Array of SingleUseEquipment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SingleUseEquipment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SingleUseEquipment) filter?: Filter<SingleUseEquipment>,
  ): Promise<SingleUseEquipment[]> {
    return this.singleUseEquipmentRepository.find(filter);
  }

  @get('/single-use-equipments/{id}', {
    responses: {
      '200': {
        description: 'SingleUseEquipment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SingleUseEquipment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SingleUseEquipment, {exclude: 'where'}) filter?: FilterExcludingWhere<SingleUseEquipment>
  ): Promise<SingleUseEquipment> {
    return this.singleUseEquipmentRepository.findById(id, filter);
  }

  @patch('/single-use-equipments/{id}', {
    responses: {
      '204': {
        description: 'SingleUseEquipment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SingleUseEquipment, {partial: true}),
        },
      },
    })
    singleUseEquipment: SingleUseEquipment,
  ): Promise<void> {
    await this.singleUseEquipmentRepository.updateById(id, singleUseEquipment);
  }

  @del('/single-use-equipments/{id}', {
    responses: {
      '204': {
        description: 'SingleUseEquipment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.singleUseEquipmentRepository.deleteById(id);
  }
}
