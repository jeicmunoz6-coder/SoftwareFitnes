import {
  Component,
  effect,
  inject,
  input,
  output
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css'
})
export class ClienteForm {

  private fb = inject(FormBuilder);

  cliente = input<any | null>(null);
  modo = input<'ver' | 'editar'>('editar');

  guardar = output<any>();

  formulario = this.fb.group({
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    telefono: ['', Validators.required],
    estado: ['Pendiente']
  });

  constructor() {

  effect(() => {

    const datos = this.cliente();

    if (datos) {

      this.formulario.reset();

      this.formulario.patchValue({
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        telefono: datos.telefono,
        estado: datos.estado
      });

    }

    if (this.modo() === 'ver') {

      this.formulario.disable();

    } else {

      this.formulario.enable();

    }

  });

}

  enviar() {

    if (this.formulario.invalid) {

      this.formulario.markAllAsTouched();

      return;

    }

    this.guardar.emit(this.formulario.getRawValue());

  }

}