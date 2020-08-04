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
import {MechanicEquipmentDropdown} from '../models';
import {MechanicEquipmentDropdownRepository} from '../repositories';

export class MechanicEqDropdownController {
  constructor(
    @repository(MechanicEquipmentDropdownRepository)
    public mechanicEquipmentDropdownRepository : MechanicEquipmentDropdownRepository,
  ) {}

  @post('/mechanic-equipment-dropdowns', {
    responses: {
      '200': {
        description: 'MechanicEquipmentDropdown model instance',
        content: {'application/json': {schema: getModelSchemaRef(MechanicEquipmentDropdown)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MechanicEquipmentDropdown, {
            title: 'NewMechanicEquipmentDropdown',
            exclude: ['id'],
          }),
        },
      },
    })
    mechanicEquipmentDropdown: Omit<MechanicEquipmentDropdown, 'id'>,
  ): Promise<MechanicEquipmentDropdown> {
    return this.mechanicEquipmentDropdownRepository.create(mechanicEquipmentDropdown);
  }

  @get('/mechanic-equipment-dropdowns', {
    responses: {
      '200': {
        description: 'Array of MechanicEquipmentDropdown model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MechanicEquipmentDropdown, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MechanicEquipmentDropdown) filter?: Filter<MechanicEquipmentDropdown>,
  ): Promise<MechanicEquipmentDropdown[]> {
    return this.mechanicEquipmentDropdownRepository.find(filter);
  }

  @get('/mechanic-equipment-dropdowns/{id}', {
    responses: {
      '200': {
        description: 'MechanicEquipmentDropdown model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MechanicEquipmentDropdown, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MechanicEquipmentDropdown, {exclude: 'where'}) filter?: FilterExcludingWhere<MechanicEquipmentDropdown>
  ): Promise<MechanicEquipmentDropdown> {
    return this.mechanicEquipmentDropdownRepository.findById(id, filter);
  }

  @patch('/mechanic-equipment-dropdowns/{id}', {
    responses: {
      '204': {
        description: 'MechanicEquipmentDropdown PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MechanicEquipmentDropdown, {partial: true}),
        },
      },
    })
    mechanicEquipmentDropdown: MechanicEquipmentDropdown,
  ): Promise<void> {
    await this.mechanicEquipmentDropdownRepository.updateById(id, mechanicEquipmentDropdown);
  }

  @del('/mechanic-equipment-dropdowns/{id}', {
    responses: {
      '204': {
        description: 'MechanicEquipmentDropdown DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mechanicEquipmentDropdownRepository.deleteById(id);
  }
}
