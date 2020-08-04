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
  Customers,
  Orders,
} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersOrdersController {
  constructor(
    @repository(CustomersRepository) protected customersRepository: CustomersRepository,
  ) { }

  @get('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Array of Customers has many Orders',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Orders)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Orders>,
  ): Promise<Orders[]> {
    return this.customersRepository.orders(id).find(filter);
  }

  @del('/customers/{id}/orders', {
    responses: {
      '200': {
        description: 'Customers.Orders DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Orders)) where?: Where<Orders>,
  ): Promise<Count> {
    return this.customersRepository.orders(id).delete(where);
  }
}
