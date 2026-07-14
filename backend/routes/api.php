<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminProfileController;

Route::post('/login', [AuthController::class, 'login']);

Route::post('/prueba', function () {
    return response()->json([
        'mensaje' => 'API funcionando'
    ]);
});

Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/me', function (Request $request) {
        return $request->user();
    });

    Route::put('/profile', [AuthController::class, 'updateProfile']);

    Route::get('/admin/profile', [AdminProfileController::class, 'show']);

    Route::put('/admin/profile', [AdminProfileController::class, 'update']);

    Route::put('/admin/change-password', [AdminProfileController::class, 'changePassword']);
});