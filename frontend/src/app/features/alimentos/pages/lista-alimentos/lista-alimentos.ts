import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { AlimentoService } from '../../services/alimento';
import { Alimento } from '../../interfaces/alimento';

@Component({
  selector: 'app-lista-alimentos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-alimentos.html',
  styleUrl: './lista-alimentos.css'
})
export class ListaAlimentos implements OnInit {

  private readonly alimentoService = inject(AlimentoService);
  private readonly router = inject(Router);

  // ====== SIGNALS ======
  readonly alimentos = signal<Alimento[]>([]);
  readonly cargando = signal(false);
  readonly error = signal('');
  readonly busqueda = signal('');

  // ====== BUSCADOR ======
  readonly alimentosFiltrados = computed(() => {

    const texto = this.busqueda().trim().toLowerCase();

    if (!texto) {
      return this.alimentos();
    }

    return this.alimentos().filter(alimento =>
      alimento.nombre.toLowerCase().includes(texto) ||
      alimento.porcion.toLowerCase().includes(texto) ||
      alimento.estado.toLowerCase().includes(texto)
    );

  });

  ngOnInit(): void {
    this.listarAlimentos();
  }

  // ====== LISTAR ======
  listarAlimentos(): void {

    this.cargando.set(true);
    this.error.set('');

    this.alimentoService.obtenerAlimentos()
      .pipe(
        finalize(() => this.cargando.set(false))
      )
      .subscribe({

        next: (respuesta) => {

          this.alimentos.set(
            Array.isArray(respuesta) ? respuesta : []
          );

        },

        error: () => {

          this.error.set(
            'No se pudieron cargar los alimentos. Verifica que el servidor esté activo.'
          );

        }

      });

  }

  // ====== NUEVO ======
  nuevoAlimento(): void {
    this.router.navigate(['/alimentos/nuevo']);
  }

  // ====== EDITAR ======
  editarAlimento(id: number): void {
    this.router.navigate(['/alimentos/editar', id]);
  }

  // ====== ELIMINAR ======
  eliminarAlimento(id: number): void {

    Swal.fire({
      title: '¿Eliminar alimento?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(result => {

      if (!result.isConfirmed) {
        return;
      }

      this.alimentoService.eliminarAlimento(id).subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: '¡Eliminado!',
            text: 'El alimento fue eliminado correctamente.',
            timer: 1800,
            showConfirmButton: false
          });

          this.listarAlimentos();

        },

        error: () => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No fue posible eliminar el alimento.'
          });

        }

      });

    });

  }
  limpiarBusqueda(): void {
  this.busqueda.set('');
}

}