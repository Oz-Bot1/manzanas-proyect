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

  buscar(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Dashboard/buscarManzana`, params);
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

  eliminar(id: number): Observable<any> {
    const params = {
      id: id
    };
    return this.http.post<any>(`${urlApi}/Manzana/eliminar`, params);
  }

}
