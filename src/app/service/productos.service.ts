import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  lista(): Observable<any> {
    const params = {};
    return this.http.post<any>(`${urlApi}/Dashboard/listaManzanas`, params);
  }

  listaDerivados(): Observable<any> {
    const params = {};
    return this.http.post<any>(`${urlApi}/Dashboard/listaDerivadosManzana`, params);
  }

  buscar(empresa: string, fechaInicial: string, fechaFinal: string): Observable<any> {
    const params = {
      empresa: empresa,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal
    };
    return this.http.post<any>(`${urlApi}/Manzana/buscar`, params);
  }

  actualizar(empresa: string, fechaInicial: string, fechaFinal: string): Observable<any> {
    const params = {
      empresa: empresa,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal
    };
    return this.http.post<any>(`${urlApi}/Manzana/actualizar`, params);
  }

  eliminar(empresa: string, fechaInicial: string, fechaFinal: string): Observable<any> {
    const params = {
      empresa: empresa,
      fechaInicial: fechaInicial,
      fechaFinal: fechaFinal
    };
    return this.http.post<any>(`${urlApi}/Manzana/eliminar`, params);
  }

  carrito(id: string): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Carrito/agregarCarrito`, params);
  }

}
