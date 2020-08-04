import {DefaultCrudRepository} from '@loopback/repository';
import {Talent, TalentRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TalentRepository extends DefaultCrudRepository<
  Talent,
  typeof Talent.prototype.id,
  TalentRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Talent, dataSource);
  }
}
