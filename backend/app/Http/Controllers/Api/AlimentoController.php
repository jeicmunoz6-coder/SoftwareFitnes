<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreAlimentoRequest;
use App\Http\Requests\UpdateAlimentoRequest;
use App\Models\Alimento;
use Illuminate\Http\JsonResponse;

class AlimentoController extends Controller
{
    /**
     * Listar todos los alimentos.
     */
    public function index(): JsonResponse
    {
        $alimentos = Alimento::orderBy('nombre')->get();

        return response()->json($alimentos, 200);
    }

    /**
     * Crear un nuevo alimento.
     */
    public function store(StoreAlimentoRequest $request): JsonResponse
    {
        $alimento = Alimento::create($request->validated());

        return response()->json([
            'message' => 'Alimento creado correctamente.',
            'data' => $alimento
        ], 201);
    }

    /**
     * Mostrar un alimento por ID.
     */
    public function show(int $id): JsonResponse
    {
        $alimento = Alimento::find($id);

        if (!$alimento) {
            return response()->json([
                'message' => 'Alimento no encontrado.'
            ], 404);
        }

        return response()->json($alimento, 200);
    }

    /**
     * Actualizar un alimento.
     */
    public function update(UpdateAlimentoRequest $request, int $id): JsonResponse
    {
        $alimento = Alimento::find($id);

        if (!$alimento) {
            return response()->json([
                'message' => 'Alimento no encontrado.'
            ], 404);
        }

        $alimento->update($request->validated());

        return response()->json([
            'message' => 'Alimento actualizado correctamente.',
            'data' => $alimento
        ], 200);
    }

    /**
     * Eliminar un alimento.
     */
    public function destroy(int $id): JsonResponse
    {
        $alimento = Alimento::find($id);

        if (!$alimento) {
            return response()->json([
                'message' => 'Alimento no encontrado.'
            ], 404);
        }

        $alimento->delete();

        return response()->json([
            'message' => 'Alimento eliminado correctamente.'
        ], 200);
    }
}