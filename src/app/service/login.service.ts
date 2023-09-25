import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../enviroments/environment';
import { tap } from 'rxjs';
const urlApi = environment.urlApi;
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isLoggedInFlag: boolean = false;

  bandera() {
    return this.isLoggedInFlag;
  }
 
  isLoggedIn() {
    return this.cookie.get("token");
  }

  flagChange(flag: boolean) {
    this.isLoggedInFlag = flag;
    return this.cookie.get("token");
  }

  logout() {
    this.cookie.deleteAll();
    this.isLoggedInFlag = false;
    this.router.navigate(['/login']);
  }

  constructor(private http: HttpClient, private router: Router, private cookie:CookieService) { }
  Login(usuario: string, contrasenia: string) {
    let formData = new FormData();
    formData.append('usuario', usuario);
    formData.append('contrasenia', contrasenia);

    return this.http.post<any>(`${urlApi}/login`, formData).pipe(tap  (response => {
      this.cookie.set('token', response.data.token);
      this.cookie.set('idRol', response.data.idRol);
      // Establecer la bandera de inicio de sesión
      this.flagChange(true);
    })
    );
  }
}
