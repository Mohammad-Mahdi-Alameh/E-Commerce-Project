<?php

namespace App\Http\Controllers\Api\V1\User;

use Illuminate\Http\Request;

use App\Models\User;

use App\Http\Controllers\Controller;

class UserController extends Controller{
    
    public function signUp(Request $request){

        $user = new User;

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->username = $request->username;
        $user->password = hash("sha256", $request->password);
        $user->dob = $request->dob;
        $user->country = $request->country;
        $user->city = $request->city;
        $user->phone = $request->phone;
        $user->gender = $request->gender;
        $user->is_admin = 0;

        $user->save();

        return response()->json([
            "status" => "Success",
        ], 200);

    }

}
