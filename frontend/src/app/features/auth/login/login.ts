import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  loginForm = this.fb.group({
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

 iniciarSesion(): void {

  console.log('Botón presionado');

  if (this.loginForm.invalid) {
    console.log('Formulario inválido');
    this.loginForm.markAllAsTouched();
    return;
  }

  console.log(this.loginForm.value);

  this.authService.login(this.loginForm.getRawValue() as any).subscribe({
    next: (respuesta) => {

  localStorage.setItem('token', respuesta.token);

  localStorage.setItem(
    'administrador',
    JSON.stringify(respuesta.administrador)
  );
  this.router.navigate(['/dashboard']);

  console.log('Login exitoso');

  console.log(respuesta);

}
  });

}

}