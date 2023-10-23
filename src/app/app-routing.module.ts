import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';
import { AuthGuard } from './auth.guard';
import { AuthGuardLogin } from './auth-login.guard';
import { LayoutAdminComponent } from './layoutad/layout-admin/layout-admin.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule), component: LayoutMainComponent },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule), canActivate: [AuthGuardLogin] },
  { path: 'productos', loadChildren: () => import('./pages/productos/productos.module').then(m => m.ProductosModule), component: LayoutMainComponent},
  { path: 'actividades', loadChildren: () => import('./pages/actividades/actividades.module').then(m => m.ActividadesModule), component: LayoutMainComponent},
  { path: 'quienesSomos', loadChildren: () => import('./pages/quienes-somos/quienes-somos.module').then(m => m.QuienesSomosModule), component: LayoutMainComponent},
  { path: 'carrito', loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoModule), component: LayoutMainComponent},
  { path: 'inventario', loadChildren: () => import('./pages/inventario/inventario.module').then(m => m.InventarioModule), component: LayoutAdminComponent, canActivate: [AuthGuard]},
  { path: 'ventas', loadChildren: () => import('./pages/ventas/ventas.module').then(m => m.VentasModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'agregar', loadChildren: () => import('./pages/agregar/agregar.module').then(m => m.AgregarModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'liberar', loadChildren: () => import('./pages/liberar/liberar.module').then(m => m.LiberarModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'agregarActividad', loadChildren: () => import('./pages/agregar-actividad/agregar-actividad.module').then(m => m.AgregarActividadModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'actividadesAdmin', loadChildren: () => import('./pages/actividades-admin/actividades-admin.module').then(m => m.ActividadesAdminModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'eventos', loadChildren: () => import('./pages/eventos/eventos.module').then(m => m.EventosModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'agregarProductor', loadChildren: () => import('./pages/agregar-productor/agregar-productor.module').then(m => m.AgregarProductorModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'agregarEvento', loadChildren: () => import('./pages/agregar-evento/agregar-evento.module').then(m => m.AgregarEventoModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'agregarPunto', loadChildren: () => import('./pages/agregar-punto/agregar-punto.module').then(m => m.AgregarPuntoModule), component: LayoutAdminComponent, canActivate: [AuthGuard] },
  { path: 'agregarDerivado', loadChildren: () => import('./pages/agregar-derivado/agregar-derivado.module').then(m => m.AgregarDerivadoModule), component: LayoutAdminComponent, canActivate: [AuthGuard]  },
  { path: 'pedidos', loadChildren: () => import('./pages/pedidos/pedidos.module').then(m => m.PedidosModule), component: LayoutMainComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
