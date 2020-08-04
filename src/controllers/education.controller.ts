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
import {Education} from '../models';
import {EducationRepository} from '../repositories';

export class EducationController {
  constructor(
    @repository(EducationRepository)
    public educationRepository : EducationRepository,
  ) {}

  @post('/educations', {
    responses: {
      '200': {
        description: 'Education model instance',
        content: {'application/json': {schema: getModelSchemaRef(Education)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Education, {
            title: 'NewEducation',
            exclude: ['id'],
          }),
        },
      },
    })
    education: Omit<Education, 'id'>,
  ): Promise<Education> {
    return this.educationRepository.create(education);
  }

  @get('/educations', {
    responses: {
      '200': {
        description: 'Array of Education model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Education, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Education) filter?: Filter<Education>,
  ): Promise<Education[]> {
    return this.educationRepository.find(filter);
  }

  @get('/educations/{id}', {
    responses: {
      '200': {
        description: 'Education model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Education, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Education, {exclude: 'where'}) filter?: FilterExcludingWhere<Education>
  ): Promise<Education> {
    return this.educationRepository.findById(id, filter);
  }

  @patch('/educations/{id}', {
    responses: {
      '204': {
        description: 'Education PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Education, {partial: true}),
        },
      },
    })
    education: Education,
  ): Promise<void> {
    await this.educationRepository.updateById(id, education);
  }

  @del('/educations/{id}', {
    responses: {
      '204': {
        description: 'Education DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.educationRepository.deleteById(id);
  }
}
