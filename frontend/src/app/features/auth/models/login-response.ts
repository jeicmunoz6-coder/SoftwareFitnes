import { Administrador } from './administrador';

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  administrador: Administrador;
}