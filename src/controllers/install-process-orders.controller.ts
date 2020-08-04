import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InstallProcess,
  Orders,
} from '../models';
import {InstallProcessRepository} from '../repositories';

export class InstallProcessOrdersController {
  constructor(
    @repository(InstallProcessRepository)
    public installProcessRepository: InstallProcessRepository,
  ) { }

  @get('/install-processes/{id}/orders', {
    responses: {
      '200': {
        description: 'Orders belonging to InstallProcess',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async getOrders(
    @param.path.number('id') id: typeof InstallProcess.prototype.id,
  ): Promise<Orders> {
    return this.installProcessRepository.orders(id);
  }
}
