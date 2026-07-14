import { Routes } from '@angular/router';

import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { authGuard } from './features/auth/guards/auth.guard';
import { Profile } from './features/profile/profile';
export const routes: Routes = [

  { path: '', component: LoginComponent},

  { path: 'dashboard',component: DashboardComponent,canActivate: [authGuard]},

  

  { path: 'profile',component: Profile, canActivate: [authGuard]},

  {path: '**', redirectTo: '' }


];