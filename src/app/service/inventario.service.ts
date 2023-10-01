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

}
