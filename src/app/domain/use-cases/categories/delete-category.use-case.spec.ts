import { DeleteCategoryUseCase } from './delete-category.use-case';
import { CategoryEntity } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';

describe('DeleteCategoryUseCase', () => {
  let useCase: DeleteCategoryUseCase;
  let mockRepository: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('CategoryRepository', ['delete']);

    useCase = new DeleteCategoryUseCase(mockRepository);
  });

  it('should call repository.delete with the given task', () => {
    const category: CategoryEntity = {
      id: 1,
      name: 'test category',
    };

    useCase.execute(category);

    expect(mockRepository.delete).toHaveBeenCalledWith(category);
  });
});
