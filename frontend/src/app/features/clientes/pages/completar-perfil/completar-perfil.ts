import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-completar-perfil',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './completar-perfil.html',
  styleUrls: ['./completar-perfil.css']
})
export class CompletarPerfil {

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  mensaje = '';
  error = '';

  perfilForm = this.fb.group({

    fecha_nacimiento: ['', Validators.required],

    sexo: ['', Validators.required],

    peso: ['', [Validators.required, Validators.min(20)]],

    altura: ['', [Validators.required, Validators.min(0.8)]],

    objetivo: ['', Validators.required],

    nivel_actividad: ['', Validators.required]

  });

  guardarPerfil(): void {

    this.mensaje = '';
    this.error = '';

    if (this.perfilForm.invalid) {

      this.perfilForm.markAllAsTouched();

      return;

    }

    this.clienteService
      .guardarPerfil(this.perfilForm.getRawValue())
      .subscribe({

        next: (respuesta: any) => {

          this.mensaje = respuesta.message;

          setTimeout(() => {

            this.router.navigate(['/cliente/profile']);

          },1500);

        },

        error: (error: any) => {

          this.error =
            error.error?.message ||
            'Ocurrió un error al guardar el perfil.';

        }

      });

  }

}