import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos-routing.module';
import { EventosComponent } from './eventos.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EventosComponent
  ],
  imports: [
    CommonModule,
    EventosRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class EventosModule { }
