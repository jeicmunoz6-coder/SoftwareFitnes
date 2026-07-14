<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Administrador;
use Illuminate\Support\Facades\Hash;

class AdministradorSeeder extends Seeder
{
    public function run(): void
    {
        Administrador::create([
            'nombre' => 'Administrador',
            'apellido' => 'Principal',
            'correo' => 'admin@fitness.com',
            'password' => Hash::make('12345678'),
            'telefono' => '3001234567',
            'foto' => null,
            'estado' => 'Activo',
            'ultimo_acceso' => null
        ]);
    }
}