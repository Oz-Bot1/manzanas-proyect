import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), component: LayoutMainComponent },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), component: LayoutMainComponent },
  { path: 'productos', loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule) },
  { path: 'contacto', loadChildren: () => import('./pages/contacto/contacto.module').then(m => m.ContactoModule) },
  { path: 'actividades', loadChildren: () => import('./pages/actividades/actividades.module').then(m => m.ActividadesModule) },
  { path: 'quienesSomos', loadChildren: () => import('./pages/quienes-somos/quienes-somos.module').then(m => m.QuienesSomosModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
