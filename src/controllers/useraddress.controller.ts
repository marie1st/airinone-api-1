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
import {Useraddress} from '../models';
import {UseraddressRepository} from '../repositories';

export class UseraddressController {
  constructor(
    @repository(UseraddressRepository)
    public useraddressRepository : UseraddressRepository,
  ) {}

  @post('/useraddresses', {
    responses: {
      '200': {
        description: 'Useraddress model instance',
        content: {'application/json': {schema: getModelSchemaRef(Useraddress)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Useraddress, {
            title: 'NewUseraddress',
            exclude: ['id'],
          }),
        },
      },
    })
    useraddress: Omit<Useraddress, 'id'>,
  ): Promise<Useraddress> {
    return this.useraddressRepository.create(useraddress);
  }

  @get('/useraddresses', {
    responses: {
      '200': {
        description: 'Array of Useraddress model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Useraddress, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Useraddress) filter?: Filter<Useraddress>,
  ): Promise<Useraddress[]> {
    return this.useraddressRepository.find(filter);
  }

  @get('/useraddresses/{id}', {
    responses: {
      '200': {
        description: 'Useraddress model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Useraddress, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Useraddress, {exclude: 'where'}) filter?: FilterExcludingWhere<Useraddress>
  ): Promise<Useraddress> {
    return this.useraddressRepository.findById(id, filter);
  }

  @patch('/useraddresses/{id}', {
    responses: {
      '204': {
        description: 'Useraddress PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Useraddress, {partial: true}),
        },
      },
    })
    useraddress: Useraddress,
  ): Promise<void> {
    await this.useraddressRepository.updateById(id, useraddress);
  }

  @del('/useraddresses/{id}', {
    responses: {
      '204': {
        description: 'Useraddress DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.useraddressRepository.deleteById(id);
  }
}
