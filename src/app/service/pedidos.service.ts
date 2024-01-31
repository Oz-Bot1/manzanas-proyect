import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  listaPuntos(): Observable<any>{
    const params = {
    };
    return this.http.post<any>(`${urlApi}/Dashboard/listaPuntosVenta`, params);
  }

  lista(): Observable<any> {
    const params = {};
    return this.http.post<any>(`https://pokeapi.co/api/v2/pokemon/ditto`, params);
  }

  pedido(nombre: string, estado: string, ciudad: string, correo: string, telefono: string, manzanas: any[]): Observable<any>{
    const params = {
      nombreCliente: nombre,
      estadoCliente: estado,
      ciudadCliente: ciudad,
      correoCliente: correo,
      telefonoCliente: telefono,
      manzanas: manzanas
    };
    return this.http.post<any>(`${urlApi}/Dashboard/realizarPedido`, params);
  }
}
