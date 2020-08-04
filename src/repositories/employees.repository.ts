import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {Employees, EmployeesRelations, Religion, Position, Department, Employment, Education, Talent} from '../models';
import {DbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ReligionRepository} from './religion.repository';
import {PositionRepository} from './position.repository';
import {DepartmentRepository} from './department.repository';
import {EmploymentRepository} from './employment.repository';
import {EducationRepository} from './education.repository';
import {TalentRepository} from './talent.repository';

export class EmployeesRepository extends DefaultCrudRepository<
  Employees,
  typeof Employees.prototype.id,
  EmployeesRelations
> {

  public readonly religion: HasOneRepositoryFactory<Religion, typeof Employees.prototype.id>;

  public readonly position: HasOneRepositoryFactory<Position, typeof Employees.prototype.id>;

  public readonly department: HasOneRepositoryFactory<Department, typeof Employees.prototype.id>;

  public readonly employment: HasOneRepositoryFactory<Employment, typeof Employees.prototype.id>;

  public readonly education: HasOneRepositoryFactory<Education, typeof Employees.prototype.id>;

  public readonly talent: HasOneRepositoryFactory<Talent, typeof Employees.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('ReligionRepository') protected religionRepositoryGetter: Getter<ReligionRepository>, @repository.getter('PositionRepository') protected positionRepositoryGetter: Getter<PositionRepository>, @repository.getter('DepartmentRepository') protected departmentRepositoryGetter: Getter<DepartmentRepository>, @repository.getter('EmploymentRepository') protected employmentRepositoryGetter: Getter<EmploymentRepository>, @repository.getter('EducationRepository') protected educationRepositoryGetter: Getter<EducationRepository>, @repository.getter('TalentRepository') protected talentRepositoryGetter: Getter<TalentRepository>,
  ) {
    super(Employees, dataSource);
    this.talent = this.createHasOneRepositoryFactoryFor('talent', talentRepositoryGetter);
    this.registerInclusionResolver('talent', this.talent.inclusionResolver);
    this.education = this.createHasOneRepositoryFactoryFor('education', educationRepositoryGetter);
    this.registerInclusionResolver('education', this.education.inclusionResolver);
    this.employment = this.createHasOneRepositoryFactoryFor('employment', employmentRepositoryGetter);
    this.registerInclusionResolver('employment', this.employment.inclusionResolver);
    this.department = this.createHasOneRepositoryFactoryFor('department', departmentRepositoryGetter);
    this.registerInclusionResolver('department', this.department.inclusionResolver);
    this.position = this.createHasOneRepositoryFactoryFor('position', positionRepositoryGetter);
    this.registerInclusionResolver('position', this.position.inclusionResolver);
    this.religion = this.createHasOneRepositoryFactoryFor('religion', religionRepositoryGetter);
    this.registerInclusionResolver('religion', this.religion.inclusionResolver);
  }
}
