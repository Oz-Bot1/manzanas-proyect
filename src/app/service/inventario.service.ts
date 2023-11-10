import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http: HttpClient) { }

  lista(): Observable<any> {
    const params = {};
    return this.http.post<any>(`${urlApi}/Dashboard/listaManzanas`, params);
  }

  listaDerivados(): Observable<any> {
    const params = {};
    return this.http.post<any>(`${urlApi}/Dashboard/listaDerivadosManzana`, params);
  }

  buscar(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Dashboard/buscarManzana`, params);
  }

  buscarDerivado(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Dashboard/buscarDerivadoManzana`, params);
  }

  actualizar(id: number, nombre: string, precioKilo: string, descripcion: string, foto: string, stock: string, nivel:string, estatus: string, precioCaja: string, precioTonelada: string, categoria: number): Observable<any> {
    const params = {
      id: id,
      nombre: nombre,
      precioKilo: precioKilo,
      descripcion: descripcion,
      foto: foto,
      stock: stock,
      nivelMadurez: nivel,
      estatus: estatus,
      precioCaja: precioCaja,
      precioTonelada: precioTonelada,
      categoria: categoria,
    };
    return this.http.post<any>(`${urlApi}/Manzana/actualizar`, params);
  }

  actualizarDerivado(id: number, nombre: string, descripcion: string, foto: string): Observable<any> {
    const params = {
      id: id,
      nombre: nombre,
      descripcion: descripcion,
      foto: foto
    };
    return this.http.post<any>(`${urlApi}/DerivadosManzana/actualizar`, params);
  }

  eliminar(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Manzana/eliminar`, params);
  }

  eliminarDerivado(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/DerivadosManzana/eliminar`, params);
  }

}
