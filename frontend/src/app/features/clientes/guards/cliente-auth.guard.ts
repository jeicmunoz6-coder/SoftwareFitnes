import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const clienteAuthGuard: CanActivateFn = () => {

  const router = inject(Router);

  const token = localStorage.getItem('cliente_token');

  if (token) {

    return true;

  }

  router.navigate(['/cliente/login']);

  return false;

};