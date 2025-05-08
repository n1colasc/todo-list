import { UpdateCategoryUseCase } from './update-category.use-case';
import { CategoryEntity } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';

describe('UpdateCategoryUseCase', () => {
  let useCase: UpdateCategoryUseCase;
  let mockRepository: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('CategoryRepository', ['update']);

    useCase = new UpdateCategoryUseCase(mockRepository);
  });

  it('should call repository.update with the given task', () => {
    const category: CategoryEntity = {
      id: 1,
      name: 'test category update',
    };

    useCase.execute(category);

    expect(mockRepository.update).toHaveBeenCalledWith(category);
  });
});
