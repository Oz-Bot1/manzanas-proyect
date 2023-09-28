import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarActividadComponent } from './agregar-actividad.component';

const routes: Routes = [{ path: '', component: AgregarActividadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarActividadRoutingModule { }
