import { CategoryEntity } from '../../entities/category.entity';
import { CATEGORY_REPOSITORY, CategoryRepository } from '../../repositories/category.repository';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(@Inject(CATEGORY_REPOSITORY) private categoryRepository: CategoryRepository) {}

  execute(task: CategoryEntity): void {
    this.categoryRepository.update(task);
  }
}
