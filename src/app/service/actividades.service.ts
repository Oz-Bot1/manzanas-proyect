import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  constructor(private http: HttpClient) { }

  lista(): Observable<any> {
    const params = { };
    return this.http.post<any>(`${urlApi}/Dashboard/listaActividades`, params);
  }

  buscar(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Dashboard/buscarActividad`, params);
  }

  actualizar(id: number, nombre: string, descripcion: string, foto: string): Observable<any> {
    const params = {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
      foto: foto
    };
    return this.http.post<any>(`${urlApi}/Actividad/actualizar`, params);
  }

  eliminar(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Actividad/eliminar`, params);
  }
}
