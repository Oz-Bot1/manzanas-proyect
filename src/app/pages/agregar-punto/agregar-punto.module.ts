import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarPuntoRoutingModule } from './agregar-punto-routing.module';
import { AgregarPuntoComponent } from './agregar-punto.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarPuntoComponent
  ],
  imports: [
    CommonModule,
    AgregarPuntoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AgregarPuntoModule { }
