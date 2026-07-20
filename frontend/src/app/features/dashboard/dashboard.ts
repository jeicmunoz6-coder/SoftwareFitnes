import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { AuthService } from '../auth/services/auth.service';
import { DashboardService } from './services/dashboard';
import { Dashboard as DashboardStats } from './interfaces/dashboard';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  sidebarColapsado = false;

  private readonly authService = inject(AuthService);
  private readonly dashboardService = inject(DashboardService);
  private readonly router = inject(Router);

  readonly estadisticas = signal<DashboardStats | null>(null);
  readonly administrador = signal<any>(null);

  readonly loading = signal(false);
  readonly errorMessage = signal('');

  ngOnInit(): void {

    this.cargarAdministrador();

    this.cargarEstadisticas();

  }

  private cargarAdministrador(): void {

    const almacenado = localStorage.getItem('administrador');

    if (almacenado) {
      this.administrador.set(JSON.parse(almacenado));
    }

    this.authService.me().subscribe({

      next: (respuesta) => {

        this.administrador.set(respuesta);

        localStorage.setItem(
          'administrador',
          JSON.stringify(respuesta)
        );

      },

      error: (error) => {

        console.error(error);

      }

    });

  }

  private cargarEstadisticas(): void {

    this.loading.set(true);

    this.errorMessage.set('');

    this.dashboardService.obtenerEstadisticas()
      .pipe(
        finalize(() => this.loading.set(false))
      )
      .subscribe({

        next: (data) => {

          console.log('Dashboard:', data);

          this.estadisticas.set(data);

        },

        error: (error) => {

          console.error(error);

          this.errorMessage.set(
            'No fue posible cargar las estadísticas.'
          );

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

        localStorage.removeItem('token');
        localStorage.removeItem('administrador');

        this.router.navigate(['/']);

      }

    });

  }

}