import { CreateTaskUseCase } from './create-task.use-case';
import { TaskEntity } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

describe('CreateTaskUseCase', () => {
  let useCase: CreateTaskUseCase;
  let mockRepository: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('TaskRepository', ['add']);

    useCase = new CreateTaskUseCase(mockRepository);
  });

  it('should call repository.add with the given task', () => {
    const task: TaskEntity = {
      id: 1,
      title: 'Test task',
      description: 'Test description',
      completed: false,
      categoryId: 1,
      date: 'viernes, 30 de mayo de 2025',
    };

    useCase.execute(task);

    expect(mockRepository.add).toHaveBeenCalledWith(task);
  });
});
