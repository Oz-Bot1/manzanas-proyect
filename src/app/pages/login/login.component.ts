import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  inventario() {
    this.router.navigate(['/inventario']);
  }
  crearUsuario() {
    this.router.navigate(['/crearUsuario']);
  }
  constructor(private router: Router) {}
}
