import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Alimento } from '../interfaces/alimento';

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {

  private http = inject(HttpClient);

  private api = 'http://127.0.0.1:8000/api/alimentos';

  obtenerAlimentos(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(this.api);
  }

  obtenerAlimento(id: number): Observable<Alimento> {
    return this.http.get<Alimento>(`${this.api}/${id}`);
  }

  crearAlimento(alimento: Alimento): Observable<any> {
    return this.http.post(this.api, alimento);
  }

  actualizarAlimento(id: number, alimento: Alimento): Observable<any> {
    return this.http.put(`${this.api}/${id}`, alimento);
  }

  eliminarAlimento(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}