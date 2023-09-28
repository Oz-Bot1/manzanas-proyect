import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from './service/login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router, private cookie: CookieService) {}

  canActivate(): boolean {
    const rol = +this.cookie.get('idRol');
    if (this.loginService.isLoggedIn() && rol === 1) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
