import { InjectionToken } from '@angular/core';
import { CategoryEntity } from '../entities/category.entity';

export interface CategoryRepository {
  add(category: CategoryEntity): void;
  delete(category: CategoryEntity): void;
  get(): CategoryEntity[];
  update(category: CategoryEntity): void;
}

export const CATEGORY_REPOSITORY = new InjectionToken<CategoryRepository>('CategoryRepository');