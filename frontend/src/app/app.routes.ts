import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { authGuard } from './features/auth/guards/auth.guard';
import { Profile as AdminProfile } from './features/profile/profile';

import { ListaAlimentos } from './features/alimentos/pages/lista-alimentos/lista-alimentos';
import { FormularioAlimento } from './features/alimentos/pages/formulario-alimento/formulario-alimento';

import { AdminLayout } from './shared/layouts/admin-layout/admin-layout';
// Clientes
import { Register } from './features/clientes/pages/register/register';
import { Login as ClienteLogin } from './features/clientes/pages/login/login';
import { ClientesList } from './features/clientes/pages/clientes-list/clientes-list';
import { Profile as ClienteProfile } from './features/clientes/pages/profile/profile';
import { CompletarPerfil } from './features/clientes/pages/completar-perfil/completar-perfil';

import { clienteAuthGuard } from './features/clientes/guards/cliente-auth.guard';

export const routes: Routes = [

  // Login
  { path: '', component: Login },

  // Layout del administrador
  {
    path: '', component: AdminLayout, canActivate: [authGuard],children: 
    [

      { path: 'dashboard', component: Dashboard },

      { path: 'profile', component: AdminProfile },

      { path: 'clientes', component: ClientesList },

      { path: 'alimentos', component: ListaAlimentos },

      { path: 'alimentos/nuevo', component: FormularioAlimento },

      { path: 'alimentos/editar/:id', component: FormularioAlimento }

    ]
  },

  // Cliente
  { path: 'cliente/register', component: Register },

  { path: 'cliente/login', component: ClienteLogin },

  { path: 'cliente/profile', component: ClienteProfile, canActivate: [clienteAuthGuard] },

  { path: 'cliente/dashboard', redirectTo: 'cliente/profile', pathMatch: 'full' },

  { path: 'cliente/completar-perfil', component: CompletarPerfil, canActivate: [clienteAuthGuard] },

  { path: '**', redirectTo: '' }

];