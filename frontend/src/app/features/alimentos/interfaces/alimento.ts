export interface Alimento {
  id?: number;
  nombre: string;
  descripcion?: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  porcion: string;
  imagen?: string;
  estado: string;
}