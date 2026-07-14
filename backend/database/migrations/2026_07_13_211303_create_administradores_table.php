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
        Schema::create('administradores', function (Blueprint $table) {

            $table->id();

            $table->string('nombre',100);
            $table->string('apellido',100);

            $table->string('correo',150)->unique();
            $table->string('password');

            $table->string('telefono',20)->nullable();

            $table->string('foto')->nullable();

            $table->enum('estado',['Activo','Inactivo'])->default('Activo');

            $table->timestamp('ultimo_acceso')->nullable();

            $table->rememberToken();

            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('administradores');
    }
};