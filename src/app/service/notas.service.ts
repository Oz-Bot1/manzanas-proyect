import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class NotasService {

  constructor(private http: HttpClient) { }

  crear(idManzana: string, idMensaje: string, cantidad: number, usuario: string): Observable<any> {
    const params = { 
      manzana: idManzana,
      tipo: idMensaje,
      cantidad: cantidad,
      usuario: usuario
    };
    return this.http.post<any>(`${urlApi}/Nota/crear`, params);
  }

  listaTipoNotas(): Observable<any> {
    const params = { };
    return this.http.post<any>(`${urlApi}/Nota/listaTipoNotasSencilla`, params);
  }

  listaManzanas(): Observable<any> {
    const params = { };
    return this.http.post<any>(`${urlApi}/Manzana/listaSencilla`, params);
  }

  listaNotas(): Observable<any> {
    const params = { };
    return this.http.post<any>(`${urlApi}/Nota/listaNotas`, params);
  }

  aceptarNota(id : string): Observable<any> {
    const params = {
      nota: id
     };
    return this.http.post<any>(`${urlApi}/Nota/aceptar`, params);
  }

  rechazarNota(id: number): Observable<any> {
    const params = {
      nota: id
     };
    return this.http.post<any>(`${urlApi}/Nota/rechazar`, params);
  }
}
