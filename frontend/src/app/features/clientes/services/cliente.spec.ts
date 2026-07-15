import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api';

  register(data: Cliente): Observable<any> {
    return this.http.post(`${this.apiUrl}/clientes/register`, data);
  }

}