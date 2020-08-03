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
import {Customers} from '../models';
import {CustomersRepository} from '../repositories';

export class CustomersController {
  constructor(
    @repository(CustomersRepository)
    public customersRepository : CustomersRepository,
  ) {}

  @post('/customers', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {'application/json': {schema: getModelSchemaRef(Customers)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {
            title: 'NewCustomers',
            exclude: ['id'],
          }),
        },
      },
    })
    customers: Omit<Customers, 'id'>,
  ): Promise<Customers> {
    return this.customersRepository.create(customers);
  }

  @get('/customers', {
    responses: {
      '200': {
        description: 'Array of Customers model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Customers, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Customers) filter?: Filter<Customers>,
  ): Promise<Customers[]> {
    return this.customersRepository.find(filter);
  }

  @get('/customers/{id}', {
    responses: {
      '200': {
        description: 'Customers model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Customers, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Customers, {exclude: 'where'}) filter?: FilterExcludingWhere<Customers>
  ): Promise<Customers> {
    return this.customersRepository.findById(id, filter);
  }

  @patch('/customers/{id}', {
    responses: {
      '204': {
        description: 'Customers PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Customers, {partial: true}),
        },
      },
    })
    customers: Customers,
  ): Promise<void> {
    await this.customersRepository.updateById(id, customers);
  }

  @del('/customers/{id}', {
    responses: {
      '204': {
        description: 'Customers DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.customersRepository.deleteById(id);
  }
}
