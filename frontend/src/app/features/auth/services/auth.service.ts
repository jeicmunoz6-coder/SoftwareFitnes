import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api';

  login(data: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, data);
  }

  me() {
    return this.http.get(`${this.apiUrl}/me`);
  }

  logout() {
  return this.http.post(`${this.apiUrl}/logout`, {});
}

updateProfile(data: any) {
  return this.http.put(`${this.apiUrl}/profile`, data);
}

}