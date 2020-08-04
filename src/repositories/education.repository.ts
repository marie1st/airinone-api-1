import {DefaultCrudRepository} from '@loopback/repository';
import {Education, EducationRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class EducationRepository extends DefaultCrudRepository<
  Education,
  typeof Education.prototype.id,
  EducationRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Education, dataSource);
  }
}
