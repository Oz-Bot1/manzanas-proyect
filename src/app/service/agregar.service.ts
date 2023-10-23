import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class AgregarService {

  constructor(private http: HttpClient) { }

  registrarProducto(nombre: string, precioKilo: string, descripcion: string, foto: string, stock: string, nivel:string, estatus: string, precioCaja: string, precioTonelada: string): Observable<any> {
    const params = {
      nombre: nombre,
      precioKilo: precioKilo,
      descripcion: descripcion,
      foto: foto,
      stock: stock,
      nivelMadurez: nivel,
      estatus: estatus,
      precioCaja: precioCaja,
      precioTonelada: precioTonelada
    };
    return this.http.post<any>(`${urlApi}/Manzana/registrar`, params);
  }

  registrarActividad(nombre: string, descripcion: string, foto: string): Observable<any> {
    const params = {
      nombre: nombre,
      descripcion: descripcion,
      foto: foto,
    };
    return this.http.post<any>(`${urlApi}/Actividad/registrar`, params);
  }

  registrarEvento(nombre: string, descripcion: string, fechaInicio: string, fechaFin: string, latitud: string, longitud: string, foto: string): Observable<any> {
    const params = {
      nombre: nombre,
      descripcion: descripcion,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      latitud: latitud,
      longitud: longitud,
      foto: foto
    };
    return this.http.post<any>(`${urlApi}/Eventos/registrar`, params);
  }

  registrarProductor(usuario: string, nombre: string, contrasenia: string, apellidoPat: string, apellidoMat: string, correo: string, telefono: string): Observable<any>{
    const params = {
      usuario: usuario,
      nombre: nombre,
      contrasenia: contrasenia,
      apellidoPat: apellidoPat,
      apellidoMat: apellidoMat,
      correo: correo,
      telefono: telefono
    };
    return this.http.post<any>(`${urlApi}/registrarProductor`, params);
  }

  registrarPunto(nombre: string, foto: string, latitud: string, longitud: string, estatus: string, horario: string): Observable<any>{
    const params = {
      foto: foto,
      nombre: nombre,
      latitud: latitud,
      longitud: longitud,
      estatus: estatus,
      horario: horario
    };
    return this.http.post<any>(`${urlApi}/PuntoVenta/registrar`, params);
  }

  registrarDerivado(nombre: string, foto: string, descripcion: string): Observable<any>{
    const params = {
      nombre: nombre,
      foto: foto,
      descripcion: descripcion
    };
    return this.http.post<any>(`${urlApi}/DerivadosManzana/registrar`, params);
  }

  saveImage(foto: any): Observable<any> {
    const params = {
      foto: foto
    };
    return this.http.post<any>(`${urlApi}/saveImage/data`, params);
  }
}
