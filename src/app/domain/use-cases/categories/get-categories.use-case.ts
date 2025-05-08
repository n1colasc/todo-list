import { CategoryEntity } from '../../entities/category.entity';
import { CATEGORY_REPOSITORY, CategoryRepository } from '../../repositories/category.repository';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class GetCategoriesUseCase {
  constructor(@Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository) {}

  execute(): CategoryEntity[] {
    return this.categoryRepository.get();
  }
}
