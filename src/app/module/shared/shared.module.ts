import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

const SharedModules = [
  CommonModule,
  ReactiveFormsModule
];

@NgModule({
  imports: SharedModules,
  exports: SharedModules
})
export class SharedModule {
}
