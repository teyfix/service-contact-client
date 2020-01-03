import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalServicesComponent } from './technical-services.component';

describe('TechnicalServicesComponent', () => {
  let component: TechnicalServicesComponent;
  let fixture: ComponentFixture<TechnicalServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
