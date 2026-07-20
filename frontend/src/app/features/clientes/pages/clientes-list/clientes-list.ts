import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteService } from '../../services/cliente.service';
import { ClienteSearch } from '../../components/cliente-search/cliente-search';
import { ClienteModal } from '../../components/cliente-modal/cliente-modal';
import { ClienteForm } from '../../components/cliente-form/cliente-form';

import {
  alertaExito,
  alertaError,
  confirmar
} from '../../../../core/utils/alerts';

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [
    CommonModule,
    ClienteSearch,
    ClienteModal,
    ClienteForm
  ],
  templateUrl: './clientes-list.html',
  styleUrl: './clientes-list.css'
})
export class ClientesList implements OnInit {

  private readonly clienteService = inject(ClienteService);

  readonly modo = signal<'ver' | 'editar'>('editar');

  readonly clienteSeleccionado = signal<any | null>(null);

  readonly clientes = signal<any[]>([]);
  readonly buscar = signal('');
  readonly estado = signal('');
  readonly cargando = signal(false);
  readonly error = signal('');

  readonly modalAbierto = signal(false);
  readonly tituloModal = signal('Cliente');

  ngOnInit(): void {
    this.cargarClientes();
  }

  // ===========================
  // Cargar clientes
  // ===========================

  cargarClientes(): void {

    this.cargando.set(true);
    this.error.set('');

    this.clienteService
      .listarClientes(
        this.buscar(),
        this.estado()
      )
      .subscribe({

        next: (resp) => {

          this.clientes.set(resp.clientes.data ?? []);

          this.cargando.set(false);

        },

        error: (err) => {

          console.error(err);

          this.error.set('No fue posible cargar los clientes.');

          this.cargando.set(false);

          alertaError(
            'Error',
            'No fue posible cargar los clientes.'
          );

        }

      });

  }

  // ===========================
  // Cambiar estado
  // ===========================

  async cambiarEstado(id: number): Promise<void> {

    const resultado = await confirmar(
      'Se cambiará el estado del cliente.'
    );

    if (!resultado.isConfirmed) return;

    this.clienteService
      .cambiarEstado(id)
      .subscribe({

        next: (resp) => {

          alertaExito(
            'Estado actualizado',
            resp.message
          );

          this.cargarClientes();

        },

        error: (err) => {

          console.error(err);

          alertaError(
            'Error',
            'No fue posible actualizar el estado.'
          );

        }

      });

  }

  // ===========================
  // Buscar
  // ===========================

  actualizarBusqueda(texto: string): void {

    this.buscar.set(texto);

    this.cargarClientes();

  }

  // ===========================
  // Estado
  // ===========================

  actualizarEstado(valor: string): void {

    this.estado.set(valor);

    this.cargarClientes();

  }

  // ===========================
  // Modal
  // ===========================

  abrirModal(titulo = 'Cliente'): void {

    this.tituloModal.set(titulo);

    this.modalAbierto.set(true);

  }

  cerrarModal(): void {

    this.modalAbierto.set(false);

    this.clienteSeleccionado.set(null);

  }

  // ===========================
  // Ver cliente
  // ===========================

  verCliente(id: number): void {

    this.modo.set('ver');

    this.clienteService.obtenerCliente(id).subscribe({

      next: (resp) => {

        this.clienteSeleccionado.set(resp.cliente);

        this.tituloModal.set('Información del Cliente');

        this.modalAbierto.set(true);

      },

      error: (err) => {

        console.error(err);

        alertaError(
          'Error',
          'No fue posible obtener el cliente.'
        );

      }

    });

  }

  // ===========================
  // Editar cliente
  // ===========================

  editarCliente(id: number): void {

    this.modo.set('editar');

    this.clienteService.obtenerCliente(id).subscribe({

      next: (resp) => {

        this.clienteSeleccionado.set(resp.cliente);

        this.tituloModal.set('Editar Cliente');

        this.modalAbierto.set(true);

      },

      error: (err) => {

        console.error(err);

        alertaError(
          'Error',
          'No fue posible obtener el cliente.'
        );

      }

    });

  }

  // ===========================
  // Guardar edición
  // ===========================

  guardarCliente(datos: any): void {

    const cliente = this.clienteSeleccionado();

    if (!cliente) return;

    this.clienteService
      .actualizarCliente(cliente.id, datos)
      .subscribe({

        next: (resp) => {

          alertaExito(
            'Cliente actualizado',
            resp.message
          );

          this.modalAbierto.set(false);

          this.cargarClientes();

        },

        error: (err) => {

          console.error(err);

          alertaError(
            'Error',
            'No fue posible actualizar el cliente.'
          );

        }

      });

  }

}