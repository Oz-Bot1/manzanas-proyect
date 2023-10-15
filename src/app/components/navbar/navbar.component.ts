import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
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
  logout() {
    this.loginService.logout();
  }
  constructor(private router: Router, private loginService: LoginService) { }
  ngOnInit(): void {
    const isLoggedInString = localStorage.getItem('isLoggedIn');
    if (isLoggedInString === 'true') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
