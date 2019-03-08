import { TestBed } from '@angular/core/testing';

import { CategoryDeleteService } from './category-delete.service';

describe('CategoryDeleteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryDeleteService = TestBed.get(CategoryDeleteService);
    expect(service).toBeTruthy();
  });
});
