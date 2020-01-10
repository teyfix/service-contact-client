import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteFaultComponent } from './write-fault.component';

describe('WriteFaultComponent', () => {
  let component: WriteFaultComponent;
  let fixture: ComponentFixture<WriteFaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteFaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteFaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
