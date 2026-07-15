import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  mensaje = '';
  error = '';

  registerForm = this.fb.group({

    nombre: ['', Validators.required],

    apellido: ['', Validators.required],

    correo: ['', [Validators.required, Validators.email]],

    telefono: ['', Validators.required],

    password: ['', [Validators.required, Validators.minLength(8)]],

    password_confirmation: ['', Validators.required]

  });

  passwordsCoinciden(): boolean {

    return this.registerForm.value.password ===
           this.registerForm.value.password_confirmation;

  }

  registrar(): void {

    this.mensaje = '';
    this.error = '';

    if (this.registerForm.invalid) {

      this.registerForm.markAllAsTouched();

      return;

    }

    if (!this.passwordsCoinciden()) {

      this.error = 'Las contraseñas no coinciden.';

      return;

    }

    this.clienteService
      .register(this.registerForm.getRawValue() as Cliente)
      .subscribe({

        next: (respuesta: any) => {

          this.mensaje = respuesta.message;

          // Limpiar formulario
          this.registerForm.reset();

          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            this.router.navigate(['/cliente/login']);
          }, 2000);

        },

        error: (error: any) => {

          if (error.error?.errors) {

            this.error = Object.values(error.error.errors)
              .flat()
              .join(' ');

          } else {

            this.error = error.error?.message || 'Ocurrió un error inesperado.';

          }

        }

      });

  }

}