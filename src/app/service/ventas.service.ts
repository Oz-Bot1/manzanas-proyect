import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  listaPedidos(): Observable<any> {
    const params = { };
    return this.http.post<any>(`${urlApi}/Pedidos/lista`, params);
  }

  listaVentas(): Observable<any> {
    const params = { };
    return this.http.post<any>(`${urlApi}/Ventas/lista`, params);
  }

  buscarPedido(id: number): Observable<any> {
    const params = { 
      idPedido: id
    };
    return this.http.post<any>(`${urlApi}/Pedidos/litarId`, params);
  }
}
