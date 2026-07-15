<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PerfilCliente;
use Illuminate\Support\Facades\Hash;

class ClienteProfileController extends Controller
{
    public function store(Request $request)
{
    $cliente = $request->user();

    if ($cliente->perfil) {

        return response()->json([
            'success' => false,
            'message' => 'El perfil ya existe.'
        ],409);

    }

    $validated = $request->validate([

        'fecha_nacimiento'=>'required|date',

        'sexo'=>'required|in:Masculino,Femenino,Otro',

        'peso'=>'required|numeric|min:20|max:400',

        'altura'=>'required|numeric|min:0.80|max:2.50',

        'objetivo'=>'required|string|max:100',

        'nivel_actividad'=>'required|in:Sedentario,Ligero,Moderado,Intenso,Muy intenso'

    ]);

    $perfil = PerfilCliente::create([

        'cliente_id'=>$cliente->id,

        ...$validated

    ]);

    return response()->json([

        'success'=>true,

        'message'=>'Perfil registrado correctamente.',

        'perfil'=>$perfil

    ],201);

}

public function show(Request $request)
{
    $cliente = $request->user()->load('perfil');

    return response()->json([
        'success' => true,
        'cliente' => [
            'id' => $cliente->id,
            'nombre' => $cliente->nombre,
            'apellido' => $cliente->apellido,
            'correo' => $cliente->correo,
            'telefono' => $cliente->telefono,
            'estado' => $cliente->estado,
            'perfil' => $cliente->perfil
        ]
    ]);
}
public function update(Request $request)
{
    $perfil=$request->user()->perfil;

    if(!$perfil){

        return response()->json([
            'success'=>false,
            'message'=>'El cliente aún no tiene perfil.'
        ],404);

    }

    $validated=$request->validate([

        'fecha_nacimiento'=>'required|date',

        'sexo'=>'required|in:Masculino,Femenino,Otro',

        'peso'=>'required|numeric|min:20|max:400',

        'altura'=>'required|numeric|min:0.80|max:2.50',

        'objetivo'=>'required|string|max:100',

        'nivel_actividad'=>'required|in:Sedentario,Ligero,Moderado,Intenso,Muy intenso'

    ]);

    $perfil->update($validated);

    return response()->json([

        'success'=>true,

        'message'=>'Perfil actualizado correctamente.',

        'perfil'=>$perfil

    ]);

}

public function changePassword(Request $request)
{
    $cliente = $request->user();

    $request->validate([
        'password_actual' => 'required',
        'password' => 'required|min:8|confirmed',
    ]);

    if (!Hash::check($request->password_actual, $cliente->password)) {

        return response()->json([
            'success' => false,
            'message' => 'La contraseña actual es incorrecta.'
        ], 422);

    }

    $cliente->update([
        'password' => Hash::make($request->password)
    ]);

    return response()->json([
        'success' => true,
        'message' => 'Contraseña actualizada correctamente.'
    ]);
}

}
