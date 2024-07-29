<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// SIGN-UP ROUTE
Route::post('/signup', [AuthController::class, 'signup']);

// LOGIN ROUTE
Route::post('/login', [AuthController::class, 'login']);



Route::middleware('auth:sanctum')->group(function(){
    Route::get('/users', [UserController::class, 'index']); #index method
    Route::post('/users', [UserController::class, 'store']); #store method
    Route::get('/users/{user}', [UserController::class, 'show']); #show method
    Route::put('/users/{user}', [UserController::class, 'update']); #update method
    Route::delete('/users/{user}', [UserController::class, 'destroy']); #delete method

    // Route::apiResource('/users', [UserController::class]);
    Route::post('/logout', [AuthController::class, 'logout']); #LOGOUT ROUTE
});
