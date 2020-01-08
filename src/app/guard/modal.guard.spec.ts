import { TestBed, async, inject } from '@angular/core/testing';

import { ModalGuard } from './modal.guard';

describe('ModalGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalGuard]
    });
  });

  it('should ...', inject([ModalGuard], (guard: ModalGuard) => {
    expect(guard).toBeTruthy();
  }));
});
