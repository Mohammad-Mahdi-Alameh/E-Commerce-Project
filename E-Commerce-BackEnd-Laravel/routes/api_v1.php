<?php

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\V1\Auth\JWTAuthController;
use App\Http\Controllers\Api\V1\User\UserController;
use App\Http\Controllers\Api\V1\Admin\AdminController;


Route::group(['prefix' => 'user'] , function(){

    Route::post('/login',[JWTAuthController::class, 'login'])->name("login");
    
    Route::post('/signup',[JWTAuthController::class, 'register'])->name("register");

    Route::get('/get_categories',[AdminController::class, 'getCategories'])->name("getCategories");
    
    Route::group(['middleware' => 'auth.jwt'], function($router) {
        
        Route::post('/logout',[JWTAuthController::class, 'logout'])->name("logout");
        
        Route::get('/get_logged_user',[JWTAuthController::class, 'getLoggedInUser'])->name("getLoggedInUser");
        
        // Route::get('/test',[UserController::class, 'Test'])->name("test");
    });
});

Route::group(['prefix' => 'admin'] , function(){
    
    Route::group(['middleware' => 'auth.jwt'], function($router) {
        
        Route::group(['middleware' => 'admin.check'], function($router) {
            
            // Route::get('/test',[UserController::class, 'Test'])->name("test");
            Route::post('/add_category',[AdminController::class, 'addCategory'])->name("addCategory");
            
            Route::post('/add_item',[AdminController::class, 'addItem'])->name("addtem");
           
            Route::get('/get_categories',[AdminController::class, 'getCategories'])->name("getCategories");
            
            Route::get('/get_items/{category_name?}',[AdminController::class, 'getItems'])->name("getItems");
            
        
        });
    });
});
