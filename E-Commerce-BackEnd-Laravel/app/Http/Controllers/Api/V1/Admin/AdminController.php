<?php

namespace App\Http\Controllers\Api\V1\Admin;

use Illuminate\Http\Request;

use App\Models\Category;
use App\Models\Item;

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


  
    public function addItem(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|min:2|max:100|unique:items',
            'price' => 'required|string|min:2|max:100',
            'trade_mark' => 'required|string|max:100|',
            'model' => 'string|min:2',
            'image' => 'required|string|min:2', 
            'description' => 'string|min:2',
            'usage' => 'required|string|',
            'category_name' => 'int',

        ]);

      
        $item = new item;

        // $category_id = fgetIdByName() here a function to check if user entered valid category
        $record = Category::where("name","=",$request->category_name)->get();
        $category_id = json_decode($record,true)[0]["id"];

        $item->name = $request->name;
        $item->price = $request->price;
        $item->trade_mark = $request->trade_mark;
        $item->model = $request->model;
        $item->image = $request->image;
        $item->description = $request->description;
        $item->usage = $request->usage;
        $item->category_id = $category_id;

        $item->save();

        // if ($this->token) {
        //     return $this->login($request);
        // }


        return response()->json([
            'message' => 'Item added successfully',
            'item' => $item,
            'category' => $item -> category_id,
        ], Response::HTTP_OK);
    }
  
}