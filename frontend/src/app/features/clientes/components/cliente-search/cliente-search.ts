import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cliente-search.html',
  styleUrl: './cliente-search.css'
})
export class ClienteSearch {

  buscar = signal('');

  estado = signal('');

  buscarChange = output<string>();

  estadoChange = output<string>();

  onBuscar(value: string){

    this.buscar.set(value);

    this.buscarChange.emit(value);

  }

  onEstado(value: string){

    this.estado.set(value);

    this.estadoChange.emit(value);

  }

}