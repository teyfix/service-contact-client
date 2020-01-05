import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorControlsComponent } from './component/paginator-controls/paginator-controls.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { LoadingComponent } from './component/loading/loading.component';
import { ConfirmDirective } from 'src/app/module/shared/directive/confirm/confirm.directive';

const SharedModules = [
  NgbModule,
  FormsModule,
  CommonModule,
  ReactiveFormsModule,
  FontAwesomeModule,
];

@NgModule({
  imports: SharedModules,
  exports: [
    SharedModules,
    ConfirmDirective,
    PaginatorControlsComponent,
  ],
  declarations: [PaginatorControlsComponent, LoadingComponent, ConfirmDirective],
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIconPacks(fas);
  }
}
