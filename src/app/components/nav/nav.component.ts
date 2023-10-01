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
    this.router.navigate(['/ventas']);
  }

  inventario() {
    this.router.navigate(['/inventario']);
  }

  actividades() {
    this.router.navigate(['/actividadesAdmin']);
  }

  eventos() {
    this.router.navigate(['/eventos']);
  }

  logout() {
    this.login.logout();
  }

  agregarProducto() {
    this.router.navigate(['/agregar']);
  }

  agregarActividad(){
    this.router.navigate(['/agregarActividad']);
  }

  agregarEvento(){
    this.router.navigate(['/agregarEvento']);
  }

  agregarPunto(){
    this.router.navigate(['/agregarPunto']);
  }

  agregarProductor(){
    this.router.navigate(['/agregarProductor']);

  }

  liberar() {
    this.router.navigate(['/liberar']);
  }

}
