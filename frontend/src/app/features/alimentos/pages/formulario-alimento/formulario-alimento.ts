import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

import { AlimentoService } from '../../services/alimento';

@Component({
  selector: 'app-formulario-alimento',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './formulario-alimento.html',
  styleUrl: './formulario-alimento.css'
})
export class FormularioAlimento implements OnInit {

  private readonly alimentoService = inject(AlimentoService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);

  modoEdicion = false;
  idAlimento = 0;
  guardando = false;

  form = this.fb.nonNullable.group({

    nombre: ['', Validators.required],

    descripcion: [''],

    calorias: [0, [Validators.required, Validators.min(0)]],

    proteinas: [0, [Validators.required, Validators.min(0)]],

    carbohidratos: [0, [Validators.required, Validators.min(0)]],

    grasas: [0, [Validators.required, Validators.min(0)]],

    porcion: ['', Validators.required],

    imagen: [''],

    estado: ['activo']

  });

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {

      this.modoEdicion = true;
      this.idAlimento = Number(id);

      this.cargarAlimento();

    }

  }

  cargarAlimento(): void {

    this.alimentoService.obtenerAlimento(this.idAlimento).subscribe({

      next: (alimento) => {

        this.form.patchValue({

          nombre: alimento.nombre,
          descripcion: alimento.descripcion ?? '',
          calorias: Number(alimento.calorias),
          proteinas: Number(alimento.proteinas),
          carbohidratos: Number(alimento.carbohidratos),
          grasas: Number(alimento.grasas),
          porcion: alimento.porcion,
          imagen: alimento.imagen ?? '',
          estado: alimento.estado

        });

      },

      error: () => {

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No fue posible cargar la información del alimento.'
        });

        this.router.navigate(['/alimentos']);

      }

    });

  }

  guardar(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Completa todos los campos obligatorios.'
      });

      return;

    }

    this.guardando = true;

    const alimento = this.form.getRawValue();

    const peticion = this.modoEdicion
      ? this.alimentoService.actualizarAlimento(this.idAlimento, alimento)
      : this.alimentoService.crearAlimento(alimento);

    peticion
      .pipe(
        finalize(() => this.guardando = false)
      )
      .subscribe({

        next: () => {

          Swal.fire({
            icon: 'success',
            title: this.modoEdicion
              ? 'Alimento actualizado'
              : 'Alimento registrado',
            text: this.modoEdicion
              ? 'Los cambios se guardaron correctamente.'
              : 'El alimento fue registrado correctamente.',
            timer: 1800,
            showConfirmButton: false
          });

          this.router.navigate(['/alimentos']);

        },

        error: () => {

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: this.modoEdicion
              ? 'No fue posible actualizar el alimento.'
              : 'No fue posible registrar el alimento.'
          });

        }

      });

  }

  cancelar(): void {

    this.router.navigate(['/alimentos']);

  }

  get nombre() {
    return this.form.controls.nombre;
  }

  get descripcion() {
    return this.form.controls.descripcion;
  }

  get calorias() {
    return this.form.controls.calorias;
  }

  get proteinas() {
    return this.form.controls.proteinas;
  }

  get carbohidratos() {
    return this.form.controls.carbohidratos;
  }

  get grasas() {
    return this.form.controls.grasas;
  }

  get porcion() {
    return this.form.controls.porcion;
  }

  get imagen() {
    return this.form.controls.imagen;
  }

  get estado() {
    return this.form.controls.estado;
  }

}