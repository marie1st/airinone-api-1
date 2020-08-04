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
  MechanicEquipmentDropdown,
  MechanicEquipment,
} from '../models';
import {MechanicEquipmentDropdownRepository} from '../repositories';

export class MechanicEquipmentDropdownMechanicEquipmentController {
  constructor(
    @repository(MechanicEquipmentDropdownRepository) protected mechanicEquipmentDropdownRepository: MechanicEquipmentDropdownRepository,
  ) { }

  @get('/mechanic-equipment-dropdowns/{id}/mechanic-equipment', {
    responses: {
      '200': {
        description: 'MechanicEquipmentDropdown has one MechanicEquipment',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MechanicEquipment),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<MechanicEquipment>,
  ): Promise<MechanicEquipment> {
    return this.mechanicEquipmentDropdownRepository.mechanicEquipment(id).get(filter);
  }

  @patch('/mechanic-equipment-dropdowns/{id}/mechanic-equipment', {
    responses: {
      '200': {
        description: 'MechanicEquipmentDropdown.MechanicEquipment PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MechanicEquipment, {partial: true}),
        },
      },
    })
    mechanicEquipment: Partial<MechanicEquipment>,
    @param.query.object('where', getWhereSchemaFor(MechanicEquipment)) where?: Where<MechanicEquipment>,
  ): Promise<Count> {
    return this.mechanicEquipmentDropdownRepository.mechanicEquipment(id).patch(mechanicEquipment, where);
  }

  @del('/mechanic-equipment-dropdowns/{id}/mechanic-equipment', {
    responses: {
      '200': {
        description: 'MechanicEquipmentDropdown.MechanicEquipment DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(MechanicEquipment)) where?: Where<MechanicEquipment>,
  ): Promise<Count> {
    return this.mechanicEquipmentDropdownRepository.mechanicEquipment(id).delete(where);
  }
}
