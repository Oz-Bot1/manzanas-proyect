import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarPuntoComponent } from './agregar-punto.component';

const routes: Routes = [{ path: '', component: AgregarPuntoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarPuntoRoutingModule { }
