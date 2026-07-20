import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Dashboard } from '../interfaces/dashboard';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly http = inject(HttpClient);

  private readonly api = 'http://127.0.0.1:8000/api/dashboard';

  obtenerEstadisticas(): Observable<Dashboard> {

    return this.http.get<Dashboard>(this.api);

  }

}