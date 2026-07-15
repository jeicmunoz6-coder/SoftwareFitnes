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
    Schema::create('perfil_clientes', function (Blueprint $table) {

        $table->id();

        $table->foreignId('cliente_id')
              ->constrained('clientes')
              ->onDelete('cascade');

        $table->date('fecha_nacimiento')->nullable();

        $table->enum('sexo', [
            'Masculino',
            'Femenino',
            'Otro'
        ])->nullable();

        $table->decimal('peso',5,2)->nullable();

        $table->decimal('altura',3,2)->nullable();

        $table->string('objetivo')->nullable();

        $table->enum('nivel_actividad',[
            'Sedentario',
            'Ligero',
            'Moderado',
            'Intenso',
            'Muy intenso'
        ])->nullable();

        $table->timestamps();

    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('perfil_clientes');
    }
};
