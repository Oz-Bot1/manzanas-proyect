import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), component: LayoutMainComponent },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), component: LayoutMainComponent },
  { path: 'productos', loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule), component: LayoutMainComponent },
  { path: 'contacto', loadChildren: () => import('./pages/contacto/contacto.module').then(m => m.ContactoModule), component: LayoutMainComponent },
  { path: 'actividades', loadChildren: () => import('./pages/actividades/actividades.module').then(m => m.ActividadesModule), component: LayoutMainComponent },
  { path: 'quienesSomos', loadChildren: () => import('./pages/quienes-somos/quienes-somos.module').then(m => m.QuienesSomosModule), component: LayoutMainComponent },
  { path: 'carrito', loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoModule), component: LayoutMainComponent },
  { path: 'inventario', loadChildren: () => import('./pages/inventario/inventario.module').then(m => m.InventarioModule) },
  { path: 'crearUsuario', loadChildren: () => import('./pages/crear-usuario/crear-usuario.module').then(m => m.CrearUsuarioModule), component: LayoutMainComponent },
  { path: 'ventas', loadChildren: () => import('./pages/ventas/ventas.module').then(m => m.VentasModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
