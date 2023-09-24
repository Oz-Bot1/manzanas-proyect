import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class CrearUsuarioService {

  constructor(private http: HttpClient) { }

  registrarUser(usuario: string, nombre: string, contrasenia: string, apellidoPat: string, apellidoMat: string, correo: string, telefono: string): Observable<any>{
    const params = {
      usuario: usuario,
      nombre: nombre,
      contrasenia: contrasenia,
      apellidoPat: apellidoPat,
      apellidoMat: apellidoMat,
      correo: correo,
      telefono: telefono
    };
    return this.http.post<any>(`${urlApi}/registrarUsuario`, params);
  }
}
