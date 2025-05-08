import { UpdateTaskUseCase } from './update-task.use-case';
import { TaskEntity } from '../../../domain/entities/task.entity';
import { TaskRepository } from '../../../domain/repositories/task.repository';

describe('UpdateTaskUseCase', () => {
  let useCase: UpdateTaskUseCase;
  let mockRepository: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('TaskRepository', ['update']);

    useCase = new UpdateTaskUseCase(mockRepository);
  });

  it('should call repository.update with the given task', () => {
    const task: TaskEntity = {
      id: 1,
      title: 'Test task edited',
      description: 'Test description edited',
      completed: true,
      categoryId: 1,
      date: 'viernes, 30 de mayo de 2025',
    };

    useCase.execute(task);

    expect(mockRepository.update).toHaveBeenCalledWith(task);
  });
});
