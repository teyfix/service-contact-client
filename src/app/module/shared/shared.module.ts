import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorControlsComponent } from './component/paginator-controls/paginator-controls.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChevronLeft, faChevronRight, faEllipsisH, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { LoadingComponent } from './component/loading/loading.component';

const SharedModules = [
  NgbModule,
  CommonModule,
  ReactiveFormsModule,
  FontAwesomeModule,
];

@NgModule({
  imports: SharedModules,
  exports: [
    SharedModules,
    PaginatorControlsComponent,
  ],
  declarations: [PaginatorControlsComponent, LoadingComponent],
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIcons(faChevronLeft, faChevronRight, faEllipsisH, faSpinner);
  }
}
