import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductorComponent } from './agregar-productor.component';

const routes: Routes = [{ path: '', component: AgregarProductorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarProductorRoutingModule { }
