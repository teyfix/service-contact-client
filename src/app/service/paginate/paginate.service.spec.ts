import { TestBed } from '@angular/core/testing';

import { PaginateService } from './paginate.service';

describe('PaginateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaginateService = TestBed.get(PaginateService);
    expect(service).toBeTruthy();
  });
});
