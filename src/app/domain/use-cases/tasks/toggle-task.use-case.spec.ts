import { ToggleTaskUseCase } from './toggle-task.use-case';
import { TaskEntity } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

describe('ToggleTaskUseCase', () => {
  let useCase: ToggleTaskUseCase;
  let mockRepository: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('TaskRepository', ['toggle']);

    useCase = new ToggleTaskUseCase(mockRepository);
  });

  it('should call repository.toggle with the given task', () => {
    const task: TaskEntity = {
      id: 1,
      title: 'Test task',
      description: 'Test description',
      completed: false,
      categoryId: 1,
      date: 'viernes, 30 de mayo de 2025',
    };

    useCase.execute(task);

    expect(mockRepository.toggle).toHaveBeenCalledWith(task);
  });
});
