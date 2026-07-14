import { Component, inject, OnInit } from '@angular/core';
import { ProfileService } from './services/profile.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  private profileService = inject(ProfileService);

  private fb = inject(FormBuilder);

form = this.fb.group({

  nombre: ['', Validators.required],

  apellido: ['', Validators.required],

  correo: ['', [Validators.required, Validators.email]],

  telefono: ['']

});

passwordForm = this.fb.group({

  password_actual: ['', Validators.required],

  password: ['', [Validators.required, Validators.minLength(8)]],

  password_confirmation: ['', Validators.required]

});

  administrador: any = null;


  ngOnInit(): void {

    this.profileService.getProfile().subscribe({

      next: (respuesta: any) => {

        console.log('Perfil administrador:', respuesta);

        this.administrador = respuesta.administrador;
        this.form.patchValue({

  nombre: respuesta.administrador.nombre,

  apellido: respuesta.administrador.apellido,

  correo: respuesta.administrador.correo,

  telefono: respuesta.administrador.telefono

});

      },

      error: (error) => {

        console.error('Error cargando perfil:', error);

      }

    });

  }

  guardarPerfil() {

  if (this.form.invalid) {

    this.form.markAllAsTouched();

    return;

  }

  this.profileService.updateProfile(this.form.value).subscribe({

    next: (respuesta: any) => {

      alert(respuesta.message);

      this.administrador = respuesta.administrador;

    },

    error: (error: any) => {

      console.error(error);

      alert('No fue posible actualizar el perfil.');

    }

  });

}

cambiarPassword() {

    console.log('Botón actualizar contraseña presionado');

  if (this.passwordForm.invalid) {

    console.log(this.passwordForm.value);
    console.log(this.passwordForm.errors);

    this.passwordForm.markAllAsTouched();

    return;

  }

  this.profileService.changePassword(this.passwordForm.value).subscribe({

    next: (respuesta: any) => {

      alert(respuesta.message);

      this.passwordForm.reset();

    },

    error: (error: any) => {

      console.error(error);

      alert(error.error.message);

    }

  });

}



}