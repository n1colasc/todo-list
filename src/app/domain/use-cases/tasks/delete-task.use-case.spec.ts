import { DeleteTaskUseCase } from './delete-task.use-case';
import { TaskEntity } from '../../entities/task.entity';
import { TaskRepository } from '../../repositories/task.repository';

describe('DeleteTaskUseCase', () => {
  let useCase: DeleteTaskUseCase;
  let mockRepository: jasmine.SpyObj<TaskRepository>;

  beforeEach(() => {
    mockRepository = jasmine.createSpyObj('TaskRepository', ['delete']);

    useCase = new DeleteTaskUseCase(mockRepository);
  });

  it('should call repository.delete with the given task', () => {
    const task: TaskEntity = {
      id: 1,
      title: 'Test task',
      description: 'Test description',
      completed: false,
      categoryId: 1,
      date: 'viernes, 30 de mayo de 2025',
    };

    useCase.execute(task);

    expect(mockRepository.delete).toHaveBeenCalledWith(task);
  });
});
