<?php

namespace App\Http\Controllers\Api\V1\Admin;

use Illuminate\Http\Request;

use App\Models\Category;

use App\Http\Controllers\Controller;
use JWTAuth;
use Validator;
use Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
 

class AdminController extends Controller
{
   public function Test(){
    echo"Test!";
   }

   public function addCategory(Request $request)
    {

        
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100|unique:categories',            
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }

     
        $category = new Category;

        $category->name = $request->name;
        
        $category->save();

        return response()->json([
            'message' => 'Category added successfully',
            'category' => $category
        ], Response::HTTP_OK);
    }
  
}