import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private inactivityTimeout = 3 * 60 * 60 * 1000; // 3 horas de inactividad
  private inactivityTimer: ReturnType<typeof setTimeout> | null = null;

  constructor(private cookie: CookieService, private loginService: LoginService) {
    this.setupInactivityTimer();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.resetInactivityTimer();
    const token = this.cookie.get("token");

    const authRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
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
