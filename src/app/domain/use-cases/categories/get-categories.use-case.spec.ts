import { GetCategoriesUseCase } from './get-categories.use-case';
import { CategoryRepository } from '../../repositories/category.repository';

describe('GetCategoriesUseCase', () => {
  let useCase: GetCategoriesUseCase;
  let mockRepository: jasmine.SpyObj<CategoryRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('CategoryRepository', ['get']);

    useCase = new GetCategoriesUseCase(mockRepository);
  });

  it('should call repository.get with the given task', () => {
    useCase.execute();

    expect(mockRepository.get).toHaveBeenCalledWith();
  });
});
