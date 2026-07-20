<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAlimentoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'nombre' => 'required|string|max:100',
            'descripcion' => 'nullable|string',
            'calorias' => 'required|numeric|min:0',
            'proteinas' => 'required|numeric|min:0',
            'carbohidratos' => 'required|numeric|min:0',
            'grasas' => 'required|numeric|min:0',
            'porcion' => 'required|string|max:50',
            'imagen' => 'nullable|string|max:255',
            'estado' => 'required|in:activo,inactivo',
        ];
    }
}