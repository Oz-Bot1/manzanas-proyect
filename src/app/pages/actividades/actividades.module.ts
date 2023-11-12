import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesRoutingModule } from './actividades-routing.module';
import { ActividadesComponent } from './actividades.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActividadesComponent
  ],
  imports: [
    CommonModule,
    ActividadesRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ActividadesModule { }
