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

  buscar(empresa: string, fechaInicial: string, fechaFinal: string): Observable<any> {
    const params = {
      empresa: empresa,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal
    };
    return this.http.post<any>(`${urlApi}/Actividad/buscar`, params);
  }

  actualizar(empresa: string, fechaInicial: string, fechaFinal: string): Observable<any> {
    const params = {
      empresa: empresa,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal
    };
    return this.http.post<any>(`${urlApi}/Actividad/actualizar`, params);
  }

  eliminar(empresa: string, fechaInicial: string, fechaFinal: string): Observable<any> {
    const params = {
      empresa: empresa,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal
    };
    return this.http.post<any>(`${urlApi}/Actividad/eliminar`, params);
  }
}
