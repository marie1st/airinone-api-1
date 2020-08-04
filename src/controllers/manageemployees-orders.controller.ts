import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Manageemployees,
  Orders,
} from '../models';
import {ManageemployeesRepository} from '../repositories';

export class ManageemployeesOrdersController {
  constructor(
    @repository(ManageemployeesRepository)
    public manageemployeesRepository: ManageemployeesRepository,
  ) { }

  @get('/manageemployees/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to Manageemployees',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof Manageemployees.prototype.id,
  ): Promise<Orders> {
    return this.manageemployeesRepository.orders(id);
  }
}
