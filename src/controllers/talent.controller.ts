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
import {Talent} from '../models';
import {TalentRepository} from '../repositories';

export class TalentController {
  constructor(
    @repository(TalentRepository)
    public talentRepository : TalentRepository,
  ) {}

  @post('/talents', {
    responses: {
      '200': {
        description: 'Talent model instance',
        content: {'application/json': {schema: getModelSchemaRef(Talent)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Talent, {
            title: 'NewTalent',
            exclude: ['id'],
          }),
        },
      },
    })
    talent: Omit<Talent, 'id'>,
  ): Promise<Talent> {
    return this.talentRepository.create(talent);
  }

  @get('/talents', {
    responses: {
      '200': {
        description: 'Array of Talent model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Talent, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Talent) filter?: Filter<Talent>,
  ): Promise<Talent[]> {
    return this.talentRepository.find(filter);
  }

  @get('/talents/{id}', {
    responses: {
      '200': {
        description: 'Talent model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Talent, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Talent, {exclude: 'where'}) filter?: FilterExcludingWhere<Talent>
  ): Promise<Talent> {
    return this.talentRepository.findById(id, filter);
  }

  @patch('/talents/{id}', {
    responses: {
      '204': {
        description: 'Talent PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Talent, {partial: true}),
        },
      },
    })
    talent: Talent,
  ): Promise<void> {
    await this.talentRepository.updateById(id, talent);
  }

  @del('/talents/{id}', {
    responses: {
      '204': {
        description: 'Talent DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.talentRepository.deleteById(id);
  }
}
