<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
{
    Schema::create('clientes', function (Blueprint $table) {

        $table->id();

        $table->string('nombre', 100);
        $table->string('apellido', 100);

        $table->string('correo')->unique();
        $table->string('telefono', 20);

        $table->string('password');

        $table->enum('estado', [
            'Pendiente',
            'Activo',
            'Inactivo',
            'Suspendido'
        ])->default('Pendiente');

        $table->rememberToken();

        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clientes');
    }
};

