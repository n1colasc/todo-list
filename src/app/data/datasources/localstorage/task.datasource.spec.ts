import { TestBed } from '@angular/core/testing';

import { TaskDataSource } from './task.datasource';

describe('TaskDataSource', () => {
  let service: TaskDataSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskDataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
