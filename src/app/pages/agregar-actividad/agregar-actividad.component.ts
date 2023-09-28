import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-agregar-actividad',
  templateUrl: './agregar-actividad.component.html',
  styleUrls: ['./agregar-actividad.component.scss']
})
export class AgregarActividadComponent {
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
