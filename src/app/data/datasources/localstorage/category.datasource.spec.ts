import { TestBed } from '@angular/core/testing';

import { CategoryDataSource } from './category.datasource';

describe('DataService', () => {
  let service: CategoryDataSource;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryDataSource);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
