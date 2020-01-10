import { TestBed } from '@angular/core/testing';

import { FaultRecordService } from './fault-record.service';

describe('FaultRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FaultRecordService = TestBed.get(FaultRecordService);
    expect(service).toBeTruthy();
  });
});
