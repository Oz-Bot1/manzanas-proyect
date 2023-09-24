import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private token = sessionStorage.getItem("tokencito");
  private inactivityTimeout = 3 * 60 * 60 * 1000; // 3 horas de inactividad
  private inactivityTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private router: Router, private loginService: LoginService) {
    this.setupInactivityTimer();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.resetInactivityTimer();

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });

    return next.handle(authRequest);
  }

  private setupInactivityTimer() {
    if (this.inactivityTimer) {
      clearTimeout(this.inactivityTimer);
    }

    this.inactivityTimer = setTimeout(() => {
      this.logoutAndRedirect();
    }, this.inactivityTimeout);
  }

  private resetInactivityTimer() {
    this.setupInactivityTimer();
  }

  private logoutAndRedirect() {
    // Código para limpiar el token y redirigir al login
    this.loginService.logout();
  }
}
