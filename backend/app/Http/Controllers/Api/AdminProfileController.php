<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
class AdminProfileController extends Controller
{
    public function show(Request $request)
    {
        return response()->json([
            'success' => true,
            'administrador' => $request->user()
        ]);
    }



    public function update(Request $request)
{
    $administrador = $request->user();

    $request->validate([
        'nombre' => 'required|string|max:100',
        'apellido' => 'required|string|max:100',
        'correo' => 'required|email|unique:administradores,correo,' . $administrador->id,
        'telefono' => 'nullable|string|max:20',
    ]);

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


    public function changePassword(Request $request)
{
    $request->validate([
        'password_actual' => 'required',
        'password' => 'required|min:8|confirmed',
    ]);

    $administrador = $request->user();

    if (!Hash::check($request->password_actual, $administrador->password)) {

        return response()->json([
            'success' => false,
            'message' => 'La contraseña actual es incorrecta.'
        ], 422);

    }

    $administrador->update([
        'password' => Hash::make($request->password)
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Contraseña actualizada correctamente.'
    ]);
}
}