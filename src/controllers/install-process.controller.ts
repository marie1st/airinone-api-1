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
import {InstallProcess} from '../models';
import {InstallProcessRepository} from '../repositories';

export class InstallProcessController {
  constructor(
    @repository(InstallProcessRepository)
    public installProcessRepository : InstallProcessRepository,
  ) {}

  @post('/install-processes', {
    responses: {
      '200': {
        description: 'InstallProcess model instance',
        content: {'application/json': {schema: getModelSchemaRef(InstallProcess)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InstallProcess, {
            title: 'NewInstallProcess',
            exclude: ['id'],
          }),
        },
      },
    })
    installProcess: Omit<InstallProcess, 'id'>,
  ): Promise<InstallProcess> {
    return this.installProcessRepository.create(installProcess);
  }

  @get('/install-processes', {
    responses: {
      '200': {
        description: 'Array of InstallProcess model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(InstallProcess, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(InstallProcess) filter?: Filter<InstallProcess>,
  ): Promise<InstallProcess[]> {
    return this.installProcessRepository.find(filter);
  }

  @get('/install-processes/{id}', {
    responses: {
      '200': {
        description: 'InstallProcess model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InstallProcess, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(InstallProcess, {exclude: 'where'}) filter?: FilterExcludingWhere<InstallProcess>
  ): Promise<InstallProcess> {
    return this.installProcessRepository.findById(id, filter);
  }

  @patch('/install-processes/{id}', {
    responses: {
      '204': {
        description: 'InstallProcess PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InstallProcess, {partial: true}),
        },
      },
    })
    installProcess: InstallProcess,
  ): Promise<void> {
    await this.installProcessRepository.updateById(id, installProcess);
  }

  @del('/install-processes/{id}', {
    responses: {
      '204': {
        description: 'InstallProcess DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.installProcessRepository.deleteById(id);
  }
}
