<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PerfilCliente extends Model
{
    protected $table = 'perfil_clientes';

    protected $fillable = [
        'cliente_id',
        'fecha_nacimiento',
        'sexo',
        'peso',
        'altura',
        'objetivo',
        'nivel_actividad'
    ];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}