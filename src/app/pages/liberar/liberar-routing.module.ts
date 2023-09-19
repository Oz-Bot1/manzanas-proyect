import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiberarComponent } from './liberar.component';

const routes: Routes = [{ path: '', component: LiberarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LiberarRoutingModule { }
