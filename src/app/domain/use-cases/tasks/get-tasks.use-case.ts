// src/app/domain/use-cases/get-tasks.use-case.ts
import { TASK_REPOSITORY, TaskRepository } from '../../repositories/task.repository';
import { TaskEntity } from '../../entities/task.entity';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class GetTasksUseCase {
  constructor(@Inject(TASK_REPOSITORY) private taskRepository: TaskRepository) {}

  execute(): TaskEntity[] {
    return this.taskRepository.get();
  }
}
