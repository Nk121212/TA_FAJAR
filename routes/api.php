<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * route "/register"
 * @method "POST"
 */
Route::post('/api_register', App\Http\Controllers\Api\RegisterController::class)->name('api_register');

/**
 * route "/login"
 * @method "POST"
 */
Route::post('/api_login', App\Http\Controllers\Api\LoginController::class)->name('api_login');

/**
 * route "/user"
 * @method "GET"
 */
Route::middleware('auth:api')->get('/api_user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['auth:api']], function() {
    Route::get('/api_dashboard', [App\Http\Controllers\Api\ApiDashboardController::class, 'index'])->name('api_dashboard');
    Route::post('/api_update_profile', [App\Http\Controllers\Api\ApiUserController::class, 'updateProfil'])->name('api_update_profile');
});

/**
 * route "/logout"
 * @method "POST"
 */
Route::post('/api_logout', App\Http\Controllers\Api\LogoutController::class)->name('api_logout');