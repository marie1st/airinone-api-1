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
import {SingleUseEquipmentDropdown} from '../models';
import {SingleUseEquipmentDropdownRepository} from '../repositories';

export class SingleUseEqDropdownController {
  constructor(
    @repository(SingleUseEquipmentDropdownRepository)
    public singleUseEquipmentDropdownRepository : SingleUseEquipmentDropdownRepository,
  ) {}

  @post('/single-use-equipment-dropdowns', {
    responses: {
      '200': {
        description: 'SingleUseEquipmentDropdown model instance',
        content: {'application/json': {schema: getModelSchemaRef(SingleUseEquipmentDropdown)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SingleUseEquipmentDropdown, {
            title: 'NewSingleUseEquipmentDropdown',
            exclude: ['id'],
          }),
        },
      },
    })
    singleUseEquipmentDropdown: Omit<SingleUseEquipmentDropdown, 'id'>,
  ): Promise<SingleUseEquipmentDropdown> {
    return this.singleUseEquipmentDropdownRepository.create(singleUseEquipmentDropdown);
  }

  @get('/single-use-equipment-dropdowns', {
    responses: {
      '200': {
        description: 'Array of SingleUseEquipmentDropdown model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SingleUseEquipmentDropdown, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SingleUseEquipmentDropdown) filter?: Filter<SingleUseEquipmentDropdown>,
  ): Promise<SingleUseEquipmentDropdown[]> {
    return this.singleUseEquipmentDropdownRepository.find(filter);
  }

  @get('/single-use-equipment-dropdowns/{id}', {
    responses: {
      '200': {
        description: 'SingleUseEquipmentDropdown model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SingleUseEquipmentDropdown, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SingleUseEquipmentDropdown, {exclude: 'where'}) filter?: FilterExcludingWhere<SingleUseEquipmentDropdown>
  ): Promise<SingleUseEquipmentDropdown> {
    return this.singleUseEquipmentDropdownRepository.findById(id, filter);
  }

  @patch('/single-use-equipment-dropdowns/{id}', {
    responses: {
      '204': {
        description: 'SingleUseEquipmentDropdown PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SingleUseEquipmentDropdown, {partial: true}),
        },
      },
    })
    singleUseEquipmentDropdown: SingleUseEquipmentDropdown,
  ): Promise<void> {
    await this.singleUseEquipmentDropdownRepository.updateById(id, singleUseEquipmentDropdown);
  }

  @del('/single-use-equipment-dropdowns/{id}', {
    responses: {
      '204': {
        description: 'SingleUseEquipmentDropdown DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.singleUseEquipmentDropdownRepository.deleteById(id);
  }
}
