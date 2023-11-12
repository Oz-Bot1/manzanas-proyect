import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuienesSomosRoutingModule } from './quienes-somos-routing.module';
import { QuienesSomosComponent } from './quienes-somos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    QuienesSomosComponent
  ],
  imports: [
    CommonModule,
    QuienesSomosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class QuienesSomosModule { }
