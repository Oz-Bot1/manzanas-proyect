import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    this.router.navigate(['/home']);
  }

  agregar() {
    this.router.navigate(['/agregar']);
  }

  liberar() {
    this.router.navigate(['/liberar']);
  }
  constructor(private router: Router){}

}
