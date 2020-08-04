import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MechanicEquipmentDropdown,
  Orders,
} from '../models';
import {MechanicEquipmentDropdownRepository} from '../repositories';

export class MechanicEquipmentDropdownOrdersController {
  constructor(
    @repository(MechanicEquipmentDropdownRepository)
    public mechanicEquipmentDropdownRepository: MechanicEquipmentDropdownRepository,
  ) { }

  @get('/mechanic-equipment-dropdowns/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to MechanicEquipmentDropdown',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof MechanicEquipmentDropdown.prototype.id,
  ): Promise<Orders> {
    return this.mechanicEquipmentDropdownRepository.orders(id);
  }
}
