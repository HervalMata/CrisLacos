import { TestBed } from '@angular/core/testing';

import { CategoryInsertService } from './category-insert.service';

describe('CategoryInsertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryInsertService = TestBed.get(CategoryInsertService);
    expect(service).toBeTruthy();
  });
});
