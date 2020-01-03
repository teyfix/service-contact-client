import { TestBed } from '@angular/core/testing';

import { DealerService } from './dealer.service';

describe('DealerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealerService = TestBed.get(DealerService);
    expect(service).toBeTruthy();
  });
});
