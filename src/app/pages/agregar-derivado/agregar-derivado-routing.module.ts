import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarDerivadoComponent } from './agregar-derivado.component';

const routes: Routes = [{ path: '', component: AgregarDerivadoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarDerivadoRoutingModule { }
