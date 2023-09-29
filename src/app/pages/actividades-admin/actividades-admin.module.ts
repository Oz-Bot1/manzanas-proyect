import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActividadesAdminRoutingModule } from './actividades-admin-routing.module';
import { ActividadesAdminComponent } from './actividades-admin.component';


@NgModule({
  declarations: [
    ActividadesAdminComponent
  ],
  imports: [
    CommonModule,
    ActividadesAdminRoutingModule
  ]
})
export class ActividadesAdminModule { }
