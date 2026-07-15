<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class ClienteAuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'correo' => 'required|email|unique:clientes,correo',
            'telefono' => 'required|string|max:20',
            'password' => 'required|min:8|confirmed',
        ]);

        $cliente = Cliente::create([
            'nombre' => $validated['nombre'],
            'apellido' => $validated['apellido'],
            'correo' => $validated['correo'],
            'telefono' => $validated['telefono'],
            'password' => $validated['password'], // Se encripta automáticamente gracias al cast 'hashed'
            'estado' => 'Pendiente',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Registro exitoso. Tu cuenta está pendiente de activación.',
            'cliente' => [
                'id' => $cliente->id,
                'nombre' => $cliente->nombre,
                'apellido' => $cliente->apellido,
                'correo' => $cliente->correo,
                'estado' => $cliente->estado,
            ]
        ], 201);
    }

    public function login(Request $request)
{
    $request->validate([
        'correo' => 'required|email',
        'password' => 'required',
    ]);

    $cliente = Cliente::where('correo', $request->correo)->first();

    if (!$cliente || !Hash::check($request->password, $cliente->password)) {
        return response()->json([
            'success' => false,
            'message' => 'Correo o contraseña incorrectos.'
        ], 401);
    }

    // Verificar estado
    //if ($cliente->estado !== 'Activo') {
       // return response()->json([
         //   'success' => false,
           // 'message' => 'Tu cuenta aún no ha sido activada.
   // }//
   // La validación del estado se implementará más adelante,
// cuando se controle el acceso a los módulos según el plan adquirido.

$cliente->load('perfil');

$perfilCompleto = $cliente->perfil !== null;

    // Eliminar tokens anteriores (opcional pero recomendado)
    $cliente->tokens()->delete();

    $token = $cliente->createToken('cliente-token')->plainTextToken;
    $cliente->load('perfil');

$perfilCompleto = $cliente->perfil !== null;
    return response()->json([
    'success' => true,
    'message' => 'Inicio de sesión exitoso.',
    'token' => $token,
    'cliente' => $cliente,
    'perfil_completo' => $perfilCompleto,
    'estado' => $cliente->estado
]);
}

public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'success' => true,
        'message' => 'Sesión cerrada correctamente.'
    ]);
}
}