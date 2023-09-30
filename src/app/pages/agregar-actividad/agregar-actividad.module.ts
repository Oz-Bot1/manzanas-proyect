import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarActividadRoutingModule } from './agregar-actividad-routing.module';
import { AgregarActividadComponent } from './agregar-actividad.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarActividadComponent
  ],
  imports: [
    CommonModule,
    AgregarActividadRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AgregarActividadModule { }
