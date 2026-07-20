<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use Illuminate\Http\Request;
class ClienteController extends Controller
{
    public function index(Request $request)
{
    $buscar = $request->buscar;
    $estado = $request->estado;

    $clientes = Cliente::query()

        ->when($buscar, function ($query) use ($buscar) {
            $query->where(function ($q) use ($buscar) {
                $q->where('nombre', 'like', "%{$buscar}%")
                  ->orWhere('apellido', 'like', "%{$buscar}%")
                  ->orWhere('correo', 'like', "%{$buscar}%")
                  ->orWhere('telefono', 'like', "%{$buscar}%");
            });
        })

        ->when($estado, function ($query) use ($estado) {
            $query->where('estado', $estado);
        })

        ->orderBy('created_at', 'desc')
        ->paginate(10);

    return response()->json([
        'success' => true,
        'clientes' => $clientes
    ]);
}

public function show($id)
{
    $cliente = Cliente::find($id);

    if (!$cliente) {
        return response()->json([
            'success' => false,
            'message' => 'Cliente no encontrado.'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'cliente' => $cliente
    ]);
}

public function update(Request $request, $id)
{
    $cliente = Cliente::find($id);

    if (!$cliente) {
        return response()->json([
            'success' => false,
            'message' => 'Cliente no encontrado.'
        ], 404);
    }

    $validated = $request->validate([
        'nombre' => 'required|string|max:100',
        'apellido' => 'required|string|max:100',
        'correo' => 'required|email|unique:clientes,correo,' . $cliente->id,
        'telefono' => 'required|string|max:20',
    ]);

    $cliente->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Cliente actualizado correctamente.',
        'cliente' => $cliente
    ]);
}

public function cambiarEstado($id)
{
    $cliente = Cliente::find($id);

    if (!$cliente) {
        return response()->json([
            'success' => false,
            'message' => 'Cliente no encontrado.'
        ], 404);
    }

    $cliente->estado = $cliente->estado === 'Activo'
        ? 'Inactivo'
        : 'Activo';

    $cliente->save();

    return response()->json([
        'success' => true,
        'message' => 'Estado actualizado correctamente.',
        'estado' => $cliente->estado
    ]);
}

}