import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteFieldTeamComponent } from './write-field-team.component';

describe('WriteFieldTeamComponent', () => {
  let component: WriteFieldTeamComponent;
  let fixture: ComponentFixture<WriteFieldTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteFieldTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteFieldTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
