import { GetTasksUseCase } from './get-tasks.use-case';
import { TaskRepository } from '../../repositories/task.repository';

describe('GetTasksUseCase', () => {
  let useCase: GetTasksUseCase;
  let mockRepository: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('TaskRepository', ['get']);

    useCase = new GetTasksUseCase(mockRepository);
  });

  it('should call repository.get with the given task', () => {
    useCase.execute();

    expect(mockRepository.get).toHaveBeenCalledWith();
  });
});
