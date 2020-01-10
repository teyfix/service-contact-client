import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteFaultRecordComponent } from './write-fault-record.component';

describe('WriteFaultRecordComponent', () => {
  let component: WriteFaultRecordComponent;
  let fixture: ComponentFixture<WriteFaultRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteFaultRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteFaultRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
