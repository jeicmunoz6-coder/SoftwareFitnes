import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class Profile implements OnInit {

  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  mensaje = '';
  error = '';

  editando = false;

  profileForm = this.fb.group({

    nombre: [{ value: '', disabled: true }],

    apellido: [{ value: '', disabled: true }],

    correo: [{ value: '', disabled: true }],

    telefono: [{ value: '', disabled: true }],

    estado: [{ value: '', disabled: true }],

    fecha_nacimiento: ['', Validators.required],

    sexo: ['', Validators.required],

    peso: ['', Validators.required],

    altura: ['', Validators.required],

    objetivo: ['', Validators.required],

    nivel_actividad: ['', Validators.required]

  });

  passwordForm = this.fb.group({

  password_actual: ['', Validators.required],

  password: ['', [
    Validators.required,
    Validators.minLength(8)
  ]],

  password_confirmation: ['', Validators.required]

});

  ngOnInit(): void {

    this.cargarPerfil();

  }

  cargarPerfil(): void {

    this.clienteService.obtenerPerfil().subscribe({

      next: (respuesta: any) => {

        const cliente = respuesta.cliente;

        this.profileForm.patchValue({

          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          telefono: cliente.telefono,
          estado: cliente.estado,

          fecha_nacimiento: cliente.perfil.fecha_nacimiento,
          sexo: cliente.perfil.sexo,
          peso: cliente.perfil.peso,
          altura: cliente.perfil.altura,
          objetivo: cliente.perfil.objetivo,
          nivel_actividad: cliente.perfil.nivel_actividad

        });

      },

      error: () => {

        this.error = 'No fue posible cargar el perfil.';

      }

    });

  }

  editar(): void {

    this.editando = true;

  }

  guardar(): void {

    if (this.profileForm.invalid) {

      this.profileForm.markAllAsTouched();

      return;

    }

    this.clienteService
      .actualizarPerfil(this.profileForm.getRawValue())
      .subscribe({

        next: (respuesta: any) => {

          this.mensaje = respuesta.message;

          this.editando = false;

        },

        error: () => {

          this.error = 'No fue posible actualizar el perfil.';

        }

      });

  }

  cerrarSesion(): void {

  this.clienteService.logout().subscribe({

    next: () => {

      localStorage.removeItem('cliente_token');
      localStorage.removeItem('cliente');

      this.router.navigate(['/cliente/login']);

    },

    error: () => {

      localStorage.removeItem('cliente_token');
      localStorage.removeItem('cliente');

      this.router.navigate(['/cliente/login']);

    }

  });

}

cambiarPassword(): void {

  console.log('Entró a cambiarPassword');

  this.mensaje = '';
  this.error = '';



  if (this.passwordForm.invalid) {

    this.passwordForm.markAllAsTouched();

    return;

  }

  if (
    this.passwordForm.value.password !==
    this.passwordForm.value.password_confirmation
  ) {

    this.error = 'Las contraseñas no coinciden.';

    return;

  }

  this.clienteService
  .changePassword(this.passwordForm.getRawValue())
  .subscribe({

    next: (respuesta: any) => {

      console.log('RESPUESTA:', respuesta);

      this.mensaje = respuesta.message;

      this.passwordForm.reset();

    },

    error: (error: any) => {

      console.log('ERROR:', error);

      this.error =
        error.error?.message ??
        'No fue posible cambiar la contraseña.';

    }

  });

}

}