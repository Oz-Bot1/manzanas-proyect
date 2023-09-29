import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarProductorRoutingModule } from './agregar-productor-routing.module';
import { AgregarProductorComponent } from './agregar-productor.component';


@NgModule({
  declarations: [
    AgregarProductorComponent
  ],
  imports: [
    CommonModule,
    AgregarProductorRoutingModule
  ]
})
export class AgregarProductorModule { }
