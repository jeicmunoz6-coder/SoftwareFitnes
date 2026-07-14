import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api';


  getProfile(){

    return this.http.get(`${this.apiUrl}/admin/profile`);

  }

  updateProfile(data: any) {
  return this.http.put<any>(`${this.apiUrl}/admin/profile`, data);
}

  changePassword(data: any) {
  return this.http.put<any>(`${this.apiUrl}/admin/change-password`, data);
}



}