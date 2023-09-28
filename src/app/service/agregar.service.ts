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

  registrar(nombre: string, precio: string, descripcion: string, foto: any, stock: string, nivel:string, estatus: string): Observable<any> {
    console.log(foto);
    const params = {
      nombre: nombre,
      precio: precio,
      descripcion: descripcion,
      foto: foto,
      stock: stock,
      nivelMadurez: nivel,
      estatus: estatus
    };
    return this.http.post<any>(`${urlApi}/Manzana/registrar`, params);
  }

  saveImage(foto: any): Observable<any> {
    const params = {
      foto: foto
    };
    console.log(params);
    return this.http.post<any>(`${urlApi}/saveImage/data`, params);
  }
}
