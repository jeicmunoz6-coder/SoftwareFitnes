import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  mensaje = '';
  error = '';

  loginForm = this.fb.group({

    correo: ['', [Validators.required, Validators.email]],

    password: ['', Validators.required]

  });

  iniciarSesion(): void {

    this.mensaje = '';
    this.error = '';

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();

      return;

    }

    this.clienteService
      .login(this.loginForm.getRawValue() as any)
      .subscribe({

        next: (respuesta: any) => {

  localStorage.setItem('cliente_token', respuesta.token);

  console.log(respuesta);
console.log(localStorage.getItem('cliente_token'));

  localStorage.setItem(
    'cliente',
    JSON.stringify(respuesta.cliente)
  );

  this.mensaje = respuesta.message;

  if (!respuesta.perfil_completo) {

    this.router.navigate(['/cliente/completar-perfil']);

  } else {

    this.router.navigate(['/cliente/profile']);

  }

},

        error: (error: any) => {

          this.error =
            error.error?.message ||
            'Correo o contraseña incorrectos.';

        }

      });

  }

}