import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadesAdminComponent } from './actividades-admin.component';

const routes: Routes = [{ path: '', component: ActividadesAdminComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActividadesAdminRoutingModule { }
