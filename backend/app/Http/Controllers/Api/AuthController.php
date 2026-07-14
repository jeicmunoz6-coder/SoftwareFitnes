<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Models\Administrador;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $administrador = Administrador::where('correo', $request->correo)->first();

        if (!$administrador) {
            return response()->json([
                'success' => false,
                'message' => 'Correo o contraseña incorrectos.'
            ], 401);
        }

        if (!Hash::check($request->password, $administrador->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Correo o contraseña incorrectos.'
            ], 401);
        }

        if ($administrador->estado !== 'Activo') {
            return response()->json([
                'success' => false,
                'message' => 'La cuenta está inactiva.'
            ], 403);
        }

        $token = $administrador->createToken('token_admin')->plainTextToken;

        $administrador->update([
            'ultimo_acceso' => now()
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Inicio de sesión exitoso.',
            'token' => $token,
            'administrador' => $administrador
        ]);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user && $user->currentAccessToken()) {
            $user->currentAccessToken()->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'Sesión cerrada correctamente.'
        ]);
    }

    public function updateProfile(Request $request)
{
    $request->validate([
        'nombre' => 'required|string|max:100',
        'apellido' => 'required|string|max:100',
        'correo' => 'required|email|unique:administradores,correo,' . $request->user()->id,
        'telefono' => 'nullable|string|max:20',
    ]);

    $administrador = $request->user();

    $administrador->update([
        'nombre' => $request->nombre,
        'apellido' => $request->apellido,
        'correo' => $request->correo,
        'telefono' => $request->telefono,
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Perfil actualizado correctamente.',
        'administrador' => $administrador
    ]);
}

}