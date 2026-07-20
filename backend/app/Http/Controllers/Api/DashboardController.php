<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\Alimento;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    /**
     * Obtener estadísticas del dashboard.
     */
    public function index(): JsonResponse
    {
        return response()->json([

            'clientes' => Cliente::count(),

            'clientes_activos' => Cliente::where('estado', 'activo')->count(),

            'alimentos' => Alimento::count(),

            'alimentos_activos' => Alimento::where('estado', 'activo')->count()

        ]);
    }
}