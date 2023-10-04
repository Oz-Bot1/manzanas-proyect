import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarDerivadoRoutingModule } from './agregar-derivado-routing.module';
import { AgregarDerivadoComponent } from './agregar-derivado.component';


@NgModule({
  declarations: [
    AgregarDerivadoComponent
  ],
  imports: [
    CommonModule,
    AgregarDerivadoRoutingModule
  ]
})
export class AgregarDerivadoModule { }
