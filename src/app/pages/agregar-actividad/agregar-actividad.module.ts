import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarActividadRoutingModule } from './agregar-actividad-routing.module';
import { AgregarActividadComponent } from './agregar-actividad.component';


@NgModule({
  declarations: [
    AgregarActividadComponent
  ],
  imports: [
    CommonModule,
    AgregarActividadRoutingModule
  ]
})
export class AgregarActividadModule { }
