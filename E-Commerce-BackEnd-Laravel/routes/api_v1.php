<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\Auth\JWTAuthController;
use App\Http\Controllers\Api\V1\User\UserController;


Route::group(['prefix' => 'user'] , function(){

    Route::post('/login',[JWTAuthController::class, 'login'])->name("login");
    
    Route::post('/signup',[JWTAuthController::class, 'register'])->name("register");
    
    
    Route::group(['middleware' => 'auth.jwt'], function($router) {
        
        Route::post('/logout',[JWTAuthController::class, 'logout'])->name("logout");
        
        // Route::get('/test',[UserController::class, 'Test'])->name("test");
    });
});

