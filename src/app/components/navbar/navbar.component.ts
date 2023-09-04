import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  home() {
    this.router.navigate(['/home']);
  }
  productos() {
    this.router.navigate(['/productos']);
  }
  contacto() {
    this.router.navigate(['/contacto']);
  }
  actividades() {
    this.router.navigate(['/actividades']);
  }
  quienesSomos() {
    this.router.navigate(['/quienesSomos']);
  }
  login() {
    this.router.navigate(['/login']);
  }
  carrito() {
    this.router.navigate(['/carrito']);
  }
  constructor(private router: Router) { }
}
