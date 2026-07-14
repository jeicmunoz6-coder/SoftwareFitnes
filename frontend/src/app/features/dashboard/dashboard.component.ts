import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { catchError, of, timeout } from 'rxjs';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterLink]
})

export class DashboardComponent implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);

  administrador: any = null;
  errorMessage = '';
  loading = true;

  ngOnInit(): void {
    const stored = localStorage.getItem('administrador');
    if (stored) {
      this.administrador = JSON.parse(stored);
    }

    this.authService.me()
      .pipe(
        timeout(10000),
        catchError((error) => {
          console.error('Error al obtener /me:', error);
          this.errorMessage = 'No se pudieron cargar los datos desde el servidor.';

          const storedAdmin = localStorage.getItem('administrador');
          if (storedAdmin) {
            this.administrador = JSON.parse(storedAdmin);
          }
          this.loading = false;
          return of(null);
        })
      )
      .subscribe({
        next: (respuesta) => {
          if (respuesta) {
            this.administrador = respuesta;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
        }
      });
      
  }

  cerrarSesion(): void {

  this.authService.logout().subscribe({

    next: () => {

      localStorage.removeItem('token');
      localStorage.removeItem('administrador');

      this.router.navigate(['/']);

    },

    error: () => {

      // Aunque falle el servidor, cerramos la sesión local
      localStorage.removeItem('token');
      localStorage.removeItem('administrador');

      this.router.navigate(['/']);

    }

  });

}

}