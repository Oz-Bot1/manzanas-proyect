import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventarioRoutingModule } from './inventario-routing.module';
import { InventarioComponent } from './inventario.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InventarioComponent
  ],
  imports: [
    CommonModule,
    InventarioRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class InventarioModule { }
