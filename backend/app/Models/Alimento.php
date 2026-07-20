<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alimento extends Model
{
    protected $table = 'alimentos';

    protected $fillable = [
        'nombre',
        'descripcion',
        'calorias',
        'proteinas',
        'carbohidratos',
        'grasas',
        'porcion',
        'imagen',
        'estado'
    ];
}