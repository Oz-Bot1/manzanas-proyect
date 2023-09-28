import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarRoutingModule } from './agregar-routing.module';
import { AgregarComponent } from './agregar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregarComponent
  ],
  imports: [
    CommonModule,
    AgregarRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AgregarModule { }
