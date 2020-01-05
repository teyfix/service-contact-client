import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorControlsComponent } from './paginator-controls.component';

describe('PaginatorControlsComponent', () => {
  let component: PaginatorControlsComponent;
  let fixture: ComponentFixture<PaginatorControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
