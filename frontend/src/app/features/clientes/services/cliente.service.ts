import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http = inject(HttpClient);

  private api = 'http://127.0.0.1:8000/api';

  register(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.api}/clientes/register`, cliente);
  }
  login(datos: { correo: string; password: string }): Observable<any> {
  return this.http.post(`${this.api}/clientes/login`, datos);
}
guardarPerfil(datos: any): Observable<any> {

  return this.http.post(
    `${this.api}/clientes/profile`,
    datos,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
      }
    }
  );

}

obtenerPerfil(): Observable<any> {

  return this.http.get(
    `${this.api}/clientes/profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
      }
    }
  );

}

actualizarPerfil(datos: any): Observable<any> {

  return this.http.put(
    `${this.api}/clientes/profile`,
    datos,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
      }
    }
  );

}

logout(): Observable<any> {

  return this.http.post(
    `${this.api}/clientes/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
      }
    }
  );

}

changePassword(datos: any): Observable<any> {

  return this.http.put(
    `${this.api}/clientes/change-password`,
    datos,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
      }
    }
  );

}

listarClientes(buscar: string = '', estado: string = '', page: number = 1): Observable<any> {
  return this.http.get(
    `${this.api}/clientes?buscar=${buscar}&estado=${estado}&page=${page}`
  );
}

obtenerCliente(id: number): Observable<any> {
  return this.http.get(
    `${this.api}/clientes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
      }
    }
  );
}

actualizarCliente(id: number, datos: any): Observable<any> {
  return this.http.put(
    `${this.api}/clientes/${id}`,
    datos,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
      }
    }
  );
}

cambiarEstado(id: number): Observable<any> {
  return this.http.put(
    `${this.api}/clientes/${id}/estado`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('cliente_token')}`
      }
    }
  );
}

}