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

  actualizar(id: string, nombre: string, precio: string, descripcion: string, foto: string, stock: string, nivel:string, estatus: string): Observable<any> {
    const params = {
      id: id,
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      foto: foto,
      stock: stock,
      nivelMadurez: nivel,
      estatus: estatus
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
