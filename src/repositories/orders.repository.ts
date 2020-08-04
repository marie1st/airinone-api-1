import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Orders, OrdersRelations, Products} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProductsRepository} from './products.repository';

export class OrdersRepository extends DefaultCrudRepository<
  Orders,
  typeof Orders.prototype.id,
  OrdersRelations
> {

  public readonly products: HasOneRepositoryFactory<Products, typeof Orders.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ProductsRepository') protected productsRepositoryGetter: Getter<ProductsRepository>,
  ) {
    super(Orders, dataSource);
    this.products = this.createHasOneRepositoryFactoryFor('products', productsRepositoryGetter);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
