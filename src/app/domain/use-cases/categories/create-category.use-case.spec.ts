import { CreateCategoryUseCase } from './create-category.use-case';
import { CategoryEntity } from '../../entities/category.entity';
import { CategoryRepository } from '../../repositories/category.repository';

describe('CreateCategoryUseCase', () => {
  let useCase: CreateCategoryUseCase;
  let mockRepository: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('CategoryRepository', ['add']);

    useCase = new CreateCategoryUseCase(mockRepository);
  });

  it('should call repository.add with the given task', () => {
    const category: CategoryEntity = {
      id: 1,
      name: 'test category',
    };

    useCase.execute(category);

    expect(mockRepository.add).toHaveBeenCalledWith(category);
  });
});
