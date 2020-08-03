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
  Users,
  Stores,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersStoresController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/stores', {
    responses: {
      '200': {
        description: 'Users has one Stores',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Stores),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Stores>,
  ): Promise<Stores> {
    return this.usersRepository.stores(id).get(filter);
  }

  @patch('/users/{id}/stores', {
    responses: {
      '200': {
        description: 'Users.Stores PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Stores, {partial: true}),
        },
      },
    })
    stores: Partial<Stores>,
    @param.query.object('where', getWhereSchemaFor(Stores)) where?: Where<Stores>,
  ): Promise<Count> {
    return this.usersRepository.stores(id).patch(stores, where);
  }

  @del('/users/{id}/stores', {
    responses: {
      '200': {
        description: 'Users.Stores DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Stores)) where?: Where<Stores>,
  ): Promise<Count> {
    return this.usersRepository.stores(id).delete(where);
  }
}
