<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminProfileController;

use App\Http\Controllers\Api\ClienteAuthController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\ClienteProfileController;

use App\Http\Controllers\Api\AlimentoController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| Rutas públicas
|--------------------------------------------------------------------------
*/

// Administrador
Route::post('/login', [AuthController::class, 'login']);

// Cliente
Route::post('/clientes/register', [ClienteAuthController::class, 'register']);
Route::post('/clientes/login', [ClienteAuthController::class, 'login']);

// Prueba
Route::post('/prueba', function () {
    return response()->json([
        'mensaje' => 'API funcionando'
    ]);
});

/*
|--------------------------------------------------------------------------
| Rutas protegidas de Clientes
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    // Autenticación
    Route::post('/clientes/logout', [ClienteAuthController::class, 'logout']);

    // Perfil del cliente (IMPORTANTE: antes de {id})
    Route::post('/clientes/profile', [ClienteProfileController::class, 'store']);
    Route::get('/clientes/profile', [ClienteProfileController::class, 'show']);
    Route::put('/clientes/profile', [ClienteProfileController::class, 'update']);

    // Administración de clientes
    Route::get('/clientes', [ClienteController::class, 'index']);
    Route::put('/clientes/change-password', [ClienteProfileController::class, 'changePassword']);
    Route::get('/clientes/{id}', [ClienteController::class, 'show']);
    Route::put('/clientes/{id}', [ClienteController::class, 'update']);
    Route::put('/clientes/{id}/estado', [ClienteController::class, 'cambiarEstado']);

});

/*
|--------------------------------------------------------------------------
| Rutas protegidas de Administrador
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::put('/profile', [AuthController::class, 'updateProfile']);

    Route::get('/admin/profile', [AdminProfileController::class, 'show']);
    Route::put('/admin/profile', [AdminProfileController::class, 'update']);


    Route::put('/admin/change-password', [AdminProfileController::class, 'changePassword']);

    Route::apiResource('alimentos', AlimentoController::class);

    Route::middleware('auth:sanctum')->get('/dashboard', [DashboardController::class, 'index']);
});