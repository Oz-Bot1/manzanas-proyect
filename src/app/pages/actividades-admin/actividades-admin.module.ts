import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesAdminRoutingModule } from './actividades-admin-routing.module';
import { ActividadesAdminComponent } from './actividades-admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ActividadesAdminComponent
  ],
  imports: [
    CommonModule,
    ActividadesAdminRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ActividadesAdminModule { }
