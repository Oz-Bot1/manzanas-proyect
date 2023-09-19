import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LiberarRoutingModule } from './liberar-routing.module';
import { LiberarComponent } from './liberar.component';


@NgModule({
  declarations: [
    LiberarComponent
  ],
  imports: [
    CommonModule,
    LiberarRoutingModule
  ]
})
export class LiberarModule { }
