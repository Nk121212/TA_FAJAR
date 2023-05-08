<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/**
 * route "/register"
 * @method "POST"
 */

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
    Route::get('/api_pendapatan', [App\Http\Controllers\Api\ApiLaporanController::class, 'index'])->name('api_pendapatan');
    Route::get('/api_portlet', [App\Http\Controllers\Api\ApiPortletController::class, 'data'])->name('api_portlet');
    Route::post('/api_logout', App\Http\Controllers\Api\LogoutController::class)->name('api_logout');
    Route::post('/api_update_profile', [App\Http\Controllers\Api\ApiUserController::class, 'updateProfil'])->name('api_update_profile');
    Route::post('/api_register', App\Http\Controllers\Api\RegisterController::class)->name('api_register');
    Route::get('/api_pengeluaran', [App\Http\Controllers\Api\ApiPengeluaranController::class, 'data'])->name('api_pengeluaran');
    Route::get('/api_pengeluaran_by_date', [App\Http\Controllers\Api\ApiPengeluaranController::class, 'data_by_date'])->name('api_pengeluaran_by_date');
    Route::get('/api_pengeluaran_store', [App\Http\Controllers\Api\ApiPengeluaranController::class, 'store'])->name('api_pengeluaran_store');
    Route::get('/api_pengeluaran_get/{id}', [App\Http\Controllers\Api\ApiPengeluaranController::class, 'show'])->name('api_pengeluaran_get');
    Route::get('/api_pengeluaran_update/{id}', [App\Http\Controllers\Api\ApiPengeluaranController::class, 'update'])->name('api_pengeluaran_update');
    Route::get('/api_pengeluaran_delete/{id}', [App\Http\Controllers\Api\ApiPengeluaranController::class, 'destroy'])->name('api_pengeluaran_delete');
    // Route::group(['middleware' => 'level:1'], function () {
        
    // });
});

/**
 * route "/logout"
 * @method "POST"
 */
