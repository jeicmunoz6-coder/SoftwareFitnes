export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  password: string;
  password_confirmation: string;
  estado?: string;
}