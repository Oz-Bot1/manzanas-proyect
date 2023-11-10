import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private router: Router, private login: LoginService) {}
  ventas() {
    this.router.navigate(['/admin/ventas']);
  }

  inventario() {
    this.router.navigate(['/admin/inventario']);
  }

  actividades() {
    this.router.navigate(['/admin/actividadesAdmin']);
  }

  eventos() {
    this.router.navigate(['/admin/eventos']);
  }

  logout() {
    this.login.logout();
  }

  agregarProducto() {
    this.router.navigate(['/admin/agregar']);
  }

  agregarDerivado() {
    this.router.navigate(['/admin/agregarDerivado']);
  }

  agregarActividad(){
    this.router.navigate(['/admin/agregarActividad']);
  }

  agregarEvento(){
    this.router.navigate(['/admin/agregarEvento']);
  }

  agregarPunto(){
    this.router.navigate(['/admin/agregarPunto']);
  }

  agregarProductor(){
    this.router.navigate(['/admin/agregarProductor']);

  }

  liberar() {
    this.router.navigate(['/admin/liberar']);
  }

}
