<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V2\Auth\JWTAuthController;
use App\Http\Controllers\Api\V2\Admin\AdminController;

Route::group(['prefix' => 'admin'] , function(){
    
    Route::group(['middleware' => 'auth.jwt'], function($router) {
        
        Route::group(['middleware' => 'admin.check'], function($router) {
                        
            Route::post('/add_item',[AdminController::class, 'addItem'])->name("addtem");
       
        });
    });
});