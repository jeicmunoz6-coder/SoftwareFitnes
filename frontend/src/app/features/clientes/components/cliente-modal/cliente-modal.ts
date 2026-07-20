import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-modal.html',
  styleUrl: './cliente-modal.css'
})
export class ClienteModal {

  abierto = input(false);

  titulo = input('Cliente');

  cerrar = output<void>();

}