import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarEventoRoutingModule } from './agregar-evento-routing.module';
import { AgregarEventoComponent } from './agregar-evento.component';


@NgModule({
  declarations: [
    AgregarEventoComponent
  ],
  imports: [
    CommonModule,
    AgregarEventoRoutingModule
  ]
})
export class AgregarEventoModule { }
