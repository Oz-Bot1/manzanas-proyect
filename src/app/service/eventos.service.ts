import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { Observable } from 'rxjs';
const urlApi = environment.urlApi;

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) { }

  listaPuntos(): Observable<any>{
    const params = {
    };
    return this.http.post<any>(`${urlApi}/Dashboard/listaPuntosVenta`, params);
  }
}
