import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarEventoComponent } from './agregar-evento.component';

const routes: Routes = [{ path: '', component: AgregarEventoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarEventoRoutingModule { }
