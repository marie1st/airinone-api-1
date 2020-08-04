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
import {MechanicEquipment} from '../models';
import {MechanicEquipmentRepository} from '../repositories';

export class MechanicEqController {
  constructor(
    @repository(MechanicEquipmentRepository)
    public mechanicEquipmentRepository : MechanicEquipmentRepository,
  ) {}

  @post('/mechanic-equipments', {
    responses: {
      '200': {
        description: 'MechanicEquipment model instance',
        content: {'application/json': {schema: getModelSchemaRef(MechanicEquipment)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MechanicEquipment, {
            title: 'NewMechanicEquipment',
            exclude: ['id'],
          }),
        },
      },
    })
    mechanicEquipment: Omit<MechanicEquipment, 'id'>,
  ): Promise<MechanicEquipment> {
    return this.mechanicEquipmentRepository.create(mechanicEquipment);
  }

  @get('/mechanic-equipments', {
    responses: {
      '200': {
        description: 'Array of MechanicEquipment model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MechanicEquipment, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MechanicEquipment) filter?: Filter<MechanicEquipment>,
  ): Promise<MechanicEquipment[]> {
    return this.mechanicEquipmentRepository.find(filter);
  }

  @get('/mechanic-equipments/{id}', {
    responses: {
      '200': {
        description: 'MechanicEquipment model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MechanicEquipment, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MechanicEquipment, {exclude: 'where'}) filter?: FilterExcludingWhere<MechanicEquipment>
  ): Promise<MechanicEquipment> {
    return this.mechanicEquipmentRepository.findById(id, filter);
  }

  @patch('/mechanic-equipments/{id}', {
    responses: {
      '204': {
        description: 'MechanicEquipment PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MechanicEquipment, {partial: true}),
        },
      },
    })
    mechanicEquipment: MechanicEquipment,
  ): Promise<void> {
    await this.mechanicEquipmentRepository.updateById(id, mechanicEquipment);
  }

  @del('/mechanic-equipments/{id}', {
    responses: {
      '204': {
        description: 'MechanicEquipment DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mechanicEquipmentRepository.deleteById(id);
  }
}
