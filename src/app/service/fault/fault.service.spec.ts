import { TestBed } from '@angular/core/testing';

import { FaultService } from './fault.service';

describe('FaultService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaultService = TestBed.get(FaultService);
    expect(service).toBeTruthy();
  });
});
