import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarEventoRoutingModule } from './agregar-evento-routing.module';
import { AgregarEventoComponent } from './agregar-evento.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarEventoComponent
  ],
  imports: [
    CommonModule,
    AgregarEventoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AgregarEventoModule { }
