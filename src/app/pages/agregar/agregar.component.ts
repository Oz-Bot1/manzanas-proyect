import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {
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
    this.router.navigate(['/agregar'])
  }

  constructor(private router: Router){}
}
