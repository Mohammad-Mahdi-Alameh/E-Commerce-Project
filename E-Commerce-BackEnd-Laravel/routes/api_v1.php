<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\User\UserController;


    Route::group(['prefix' => 'user'] , function(){

        Route::post('/signup',[UserController::class, 'signUp'])->name("signUp");
        
        Route::post('/login',[UserController::class, 'login'])->name("login");
    });
