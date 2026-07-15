import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './features/auth/guards/auth.guard';
import { Profile as AdminProfile } from './features/profile/profile';


// Clientes
import { Register } from './features/clientes/pages/register/register';
import { Login as ClienteLogin } from './features/clientes/pages/login/login';
import { ClientesList } from './features/clientes/pages/clientes-list/clientes-list';
import { Profile as ClienteProfile } from './features/clientes/pages/profile/profile';
import { CompletarPerfil } from './features/clientes/pages/completar-perfil/completar-perfil';

import { clienteAuthGuard } from './features/clientes/guards/cliente-auth.guard';

export const routes: Routes = [

  // Administrador
  { path: '', component: Login },

  { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

  { path: 'profile', component: AdminProfile, canActivate: [authGuard] },

  // Cliente
  { path: 'cliente/register', component: Register },

  { path: 'cliente/login', component: ClienteLogin },

  { path: 'cliente/profile', component: ClienteProfile, canActivate: [clienteAuthGuard] },

  { path: 'cliente/dashboard', redirectTo: 'cliente/profile', pathMatch: 'full' },

  { path: 'cliente/completar-perfil', component: CompletarPerfil, canActivate: [clienteAuthGuard]  },

  { path: 'clientes', component: ClientesList, canActivate: [authGuard] },

  { path: '**', redirectTo: '' }

];