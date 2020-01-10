import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorControlsComponent } from './component/paginator-controls/paginator-controls.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { ConfirmDirective } from 'src/app/module/shared/directive/confirm/confirm.directive';
import { InputComponent } from './component/input/input.component';
import { TypeaheadComponent } from './component/typeahead/typeahead.component';
import { DataTableComponent } from 'src/app/module/shared/component/data-table/data-table.component';
import { LoadingComponent } from 'src/app/module/shared/component/loading/loading.component';
import { InputErrorComponent } from 'src/app/module/shared/component/input-error/input-error.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { HintComponent } from 'src/app/module/shared/component/hint/hint.component';
import { CheckListComponent } from './component/check-list/check-list.component';

const SharedModules = [
  NgbModule,
  FormsModule,
  CommonModule,
  ReactiveFormsModule,
  FontAwesomeModule,
  TranslateModule,
];

const SharedComponents = [
  DataTableComponent,
  PaginatorControlsComponent,
  LoadingComponent,
  ConfirmDirective,
  InputComponent,
  TypeaheadComponent,
  InputErrorComponent,
  HintComponent,
  CheckListComponent,
];

@NgModule({
  declarations: SharedComponents,
  imports: [SharedModules, RouterModule],
  exports: [SharedModules, SharedComponents],
})
export class SharedModule {
  constructor(faIconLibrary: FaIconLibrary) {
    faIconLibrary.addIconPacks(fas);
  }
}
