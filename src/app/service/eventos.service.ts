import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { Observable } from 'rxjs';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) { }

  listaPuntos(): Observable<any>{
    const params = {
    };
    return this.http.post<any>(`${urlApi}/Dashboard/listaPuntosVenta`, params);
  }

  listaEventos(): Observable<any>{
    const params = {
    };
    return this.http.post<any>(`${urlApi}/Dashboard/listaEventos`, params);
  }

  buscarPunto(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Dashboard/buscarPuntoVenta`, params);
  }

  buscarEvento(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Dashboard/buscarEvento`, params);
  }

  actualizarPunto(id: number, nombre: string, foto: string, latitud: string, longitud: string, estatus: string, horario: string): Observable<any> {
    const params = {
      id: id,
      nombre: nombre,
      foto: foto,
      latitud: latitud,
      longitud: longitud,
      estatus: estatus,
      horario: horario
    };
    return this.http.post<any>(`${urlApi}/PuntoVenta/actualizar`, params);
  }

  actualizarEvento(id: string, nombre: string, foto: string, latitud: string, longitud: string, descripcion: string, fechaInicio: string, fechaFin: string): Observable<any> {
    const params = {
      id: id,
      nombre: nombre,
      foto: foto,
      latitud: latitud,
      longitud: longitud,
      descripcion: descripcion,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin
    };
    return this.http.post<any>(`${urlApi}/Eventos/actualizar`, params);
  }

  eliminarPunto(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/PuntoVenta/eliminar`, params);
  }

  eliminarEvento(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Eventos/eliminar`, params);
  }
}
