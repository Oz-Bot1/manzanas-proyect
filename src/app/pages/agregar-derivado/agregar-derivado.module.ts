import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarDerivadoRoutingModule } from './agregar-derivado-routing.module';
import { AgregarDerivadoComponent } from './agregar-derivado.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgregarDerivadoComponent
  ],
  imports: [
    CommonModule,
    AgregarDerivadoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AgregarDerivadoModule { }
