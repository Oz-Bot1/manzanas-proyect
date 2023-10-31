import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiberarRoutingModule } from './liberar-routing.module';
import { LiberarComponent } from './liberar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LiberarComponent
  ],
  imports: [
    CommonModule,
    LiberarRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LiberarModule { }
