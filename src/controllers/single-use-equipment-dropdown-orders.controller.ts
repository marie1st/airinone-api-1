import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SingleUseEquipmentDropdown,
  Orders,
} from '../models';
import {SingleUseEquipmentDropdownRepository} from '../repositories';

export class SingleUseEquipmentDropdownOrdersController {
  constructor(
    @repository(SingleUseEquipmentDropdownRepository)
    public singleUseEquipmentDropdownRepository: SingleUseEquipmentDropdownRepository,
  ) { }

  @get('/single-use-equipment-dropdowns/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to SingleUseEquipmentDropdown',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof SingleUseEquipmentDropdown.prototype.id,
  ): Promise<Orders> {
    return this.singleUseEquipmentDropdownRepository.orders(id);
  }
}
