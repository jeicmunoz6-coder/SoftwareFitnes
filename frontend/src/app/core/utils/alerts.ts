import Swal from 'sweetalert2';

export function alertaExito(titulo: string, texto = '') {

  Swal.fire({
    icon: 'success',
    title: titulo,
    text: texto,
    confirmButtonColor: '#2563eb'
  });

}

export function alertaError(titulo: string, texto = '') {

  Swal.fire({
    icon: 'error',
    title: titulo,
    text: texto,
    confirmButtonColor: '#dc2626'
  });

}

export function confirmar(texto: string) {

  return Swal.fire({

    title: '¿Está seguro?',

    text: texto,

    icon: 'warning',

    showCancelButton: true,

    confirmButtonText: 'Sí',

    cancelButtonText: 'Cancelar',

    confirmButtonColor: '#2563eb',

    cancelButtonColor: '#ef4444'

  });

}