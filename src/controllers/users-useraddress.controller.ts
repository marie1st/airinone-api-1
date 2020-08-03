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
  Useraddress,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersUseraddressController {
  constructor(
    @repository(UsersRepository) protected usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/useraddress', {
    responses: {
      '200': {
        description: 'Users has one Useraddress',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Useraddress),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Useraddress>,
  ): Promise<Useraddress> {
    return this.usersRepository.useraddress(id).get(filter);
  }

  @patch('/users/{id}/useraddress', {
    responses: {
      '200': {
        description: 'Users.Useraddress PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Useraddress, {partial: true}),
        },
      },
    })
    useraddress: Partial<Useraddress>,
    @param.query.object('where', getWhereSchemaFor(Useraddress)) where?: Where<Useraddress>,
  ): Promise<Count> {
    return this.usersRepository.useraddress(id).patch(useraddress, where);
  }

  @del('/users/{id}/useraddress', {
    responses: {
      '200': {
        description: 'Users.Useraddress DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Useraddress)) where?: Where<Useraddress>,
  ): Promise<Count> {
    return this.usersRepository.useraddress(id).delete(where);
  }
}
