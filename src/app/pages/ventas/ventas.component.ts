import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent {

  ventas() {
    this.router.navigate(['/ventas']);
  }

  inventario() {
    this.router.navigate(['/inventario']);
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

  }

  agregarProductor(){

  }

  liberar() {
    this.router.navigate(['/liberar']);
  }
  constructor(private router: Router, private login: LoginService){}

}
