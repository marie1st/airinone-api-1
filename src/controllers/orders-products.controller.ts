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
  Orders,
  Products,
} from '../models';
import {OrdersRepository} from '../repositories';

export class OrdersProductsController {
  constructor(
    @repository(OrdersRepository) protected ordersRepository: OrdersRepository,
  ) { }

  @get('/orders/{id}/products', {
    responses: {
      '200': {
        description: 'Orders has one Products',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Products),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Products>,
  ): Promise<Products> {
    return this.ordersRepository.products(id).get(filter);
  }

  @patch('/orders/{id}/products', {
    responses: {
      '200': {
        description: 'Orders.Products PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Products, {partial: true}),
        },
      },
    })
    products: Partial<Products>,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.ordersRepository.products(id).patch(products, where);
  }

  @del('/orders/{id}/products', {
    responses: {
      '200': {
        description: 'Orders.Products DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where<Products>,
  ): Promise<Count> {
    return this.ordersRepository.products(id).delete(where);
  }
}
