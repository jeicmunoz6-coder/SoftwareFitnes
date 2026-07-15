import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteAuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api/clientes';

  login(datos: { correo: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, datos);
  }

  register(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, datos);
  }

  logout(): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
        }
      }
    );
  }
}