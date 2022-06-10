<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\User\UserController;


    Route::group(['prefix' => 'user'] , function(){

        Route::post('/signup',[UserController::class, 'register'])->name("register");
        
        Route::post('/login',[UserController::class, 'login'])->name("login");
        
        Route::post('/logout',[UserController::class, 'logout'])->name("logout");
    });