import { InjectionToken } from '@angular/core';
import { TaskEntity } from '../entities/task.entity';

export interface TaskRepository {
  add(task: TaskEntity): void;
  delete(task: TaskEntity): void;
  get(): TaskEntity[];
  toggle(task: TaskEntity): void;
  update(task: TaskEntity): void;
}

export const TASK_REPOSITORY = new InjectionToken<TaskRepository>('TaskRepository');