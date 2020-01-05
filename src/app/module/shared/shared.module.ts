import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const SharedModules = [
  NgbModule,
  CommonModule,
  ReactiveFormsModule
];

@NgModule({
  imports: SharedModules,
  exports: SharedModules
})
export class SharedModule {
}
