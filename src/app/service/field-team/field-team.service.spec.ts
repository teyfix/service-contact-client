import { TestBed } from '@angular/core/testing';

import { FieldTeamService } from './field-team.service';

describe('FieldTeamService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FieldTeamService = TestBed.get(FieldTeamService);
    expect(service).toBeTruthy();
  });
});
