<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;

class Administrador extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $table = 'administradores';

    protected $fillable = [
        'nombre',
        'apellido',
        'correo',
        'password',
        'telefono',
        'foto',
        'estado',
        'ultimo_acceso'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
            'ultimo_acceso' => 'datetime',
        ];
    }
}