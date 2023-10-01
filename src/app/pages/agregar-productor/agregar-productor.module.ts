import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarProductorRoutingModule } from './agregar-productor-routing.module';
import { AgregarProductorComponent } from './agregar-productor.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarProductorComponent
  ],
  imports: [
    CommonModule,
    AgregarProductorRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AgregarProductorModule { }
