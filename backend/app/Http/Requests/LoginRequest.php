<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        if (! $this->has('correo') && $this->has('email')) {
            $this->merge(['correo' => $this->input('email')]);
        }
    }

    public function rules(): array
    {
        return [
            'correo' => 'required|email',
            'password' => 'required|string|min:6',
        ];
    }

    public function messages(): array
    {
        return [
            'correo.required' => 'El correo es obligatorio.',
            'correo.email' => 'El correo no es válido.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener mínimo 6 caracteres.',
        ];
    }
}