import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class LiberarService {

  constructor(private http: HttpClient) { }

  actualizar(id: number, nombre: string, estado: string, ciudad: string, correo: string, telefono: string, manzanas: any[]): Observable<any>{
    const params = {
      idPedido: id,
      nombreCliente: nombre,
      estadoCliente: estado,
      ciudadCliente: ciudad,
      correoCliente: correo,
      telefonoCliente: telefono,
      manzanas: manzanas,
    };
    return this.http.post<any>(`${urlApi}/Pedidos/actualizar`, params);
  }

  liberar(id: number): Observable<any>{
    const params = {
      idPedido: id
    };
    return this.http.post<any>(`${urlApi}/Pedidos/liberar`, params);
  }
}
