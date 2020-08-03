import {DefaultCrudRepository} from '@loopback/repository';
import {Useraddress, UseraddressRelations} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UseraddressRepository extends DefaultCrudRepository<
  Useraddress,
  typeof Useraddress.prototype.id,
  UseraddressRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(Useraddress, dataSource);
  }
}
