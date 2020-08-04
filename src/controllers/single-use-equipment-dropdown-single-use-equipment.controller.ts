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
  SingleUseEquipmentDropdown,
  SingleUseEquipment,
} from '../models';
import {SingleUseEquipmentDropdownRepository} from '../repositories';

export class SingleUseEquipmentDropdownSingleUseEquipmentController {
  constructor(
    @repository(SingleUseEquipmentDropdownRepository) protected singleUseEquipmentDropdownRepository: SingleUseEquipmentDropdownRepository,
  ) { }

  @get('/single-use-equipment-dropdowns/{id}/single-use-equipment', {
    responses: {
      '200': {
        description: 'SingleUseEquipmentDropdown has one SingleUseEquipment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SingleUseEquipment),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<SingleUseEquipment>,
  ): Promise<SingleUseEquipment> {
    return this.singleUseEquipmentDropdownRepository.singleUseEquipment(id).get(filter);
  }

  @patch('/single-use-equipment-dropdowns/{id}/single-use-equipment', {
    responses: {
      '200': {
        description: 'SingleUseEquipmentDropdown.SingleUseEquipment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SingleUseEquipment, {partial: true}),
        },
      },
    })
    singleUseEquipment: Partial<SingleUseEquipment>,
    @param.query.object('where', getWhereSchemaFor(SingleUseEquipment)) where?: Where<SingleUseEquipment>,
  ): Promise<Count> {
    return this.singleUseEquipmentDropdownRepository.singleUseEquipment(id).patch(singleUseEquipment, where);
  }

  @del('/single-use-equipment-dropdowns/{id}/single-use-equipment', {
    responses: {
      '200': {
        description: 'SingleUseEquipmentDropdown.SingleUseEquipment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(SingleUseEquipment)) where?: Where<SingleUseEquipment>,
  ): Promise<Count> {
    return this.singleUseEquipmentDropdownRepository.singleUseEquipment(id).delete(where);
  }
}
