import { TASK_REPOSITORY, TaskRepository } from '../../repositories/task.repository';
import { TaskEntity } from '../../entities/task.entity';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class UpdateTaskUseCase {
  constructor(@Inject(TASK_REPOSITORY) private taskRepository: TaskRepository) {}

  execute(task: TaskEntity): void {
    this.taskRepository.update(task);
  }
}
