import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaultRecordComponent } from './fault-record.component';

describe('FaultRecordComponent', () => {
  let component: FaultRecordComponent;
  let fixture: ComponentFixture<FaultRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaultRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaultRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
