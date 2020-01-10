import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldTeamComponent } from './field-team.component';

describe('FieldTeamComponent', () => {
  let component: FieldTeamComponent;
  let fixture: ComponentFixture<FieldTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
