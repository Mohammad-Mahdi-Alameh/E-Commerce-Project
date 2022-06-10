<?php

namespace App\Http\Controllers\Api\V1\User;

use Illuminate\Http\Request;

use App\Models\User;

use App\Http\Controllers\Controller;
use JWTAuth;
use Validator;
use Auth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Symfony\Component\HttpFoundation\Response;
 

class UserController extends Controller
{
    public $token = true;

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }


    /**
     * Register user.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {

        
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|min:2|max:100',
            'last_name' => 'required|string|min:2|max:100',
            'username' => 'required|string|max:100|unique:users',
            'password' => 'required|string|min:6',
            'c_password' => 'required|same:password', 
            'dob' => 'required|string|',
            'country' => 'required|string|',
            'city' => 'required|string|',
            'phone' => 'required|string|',
            'gender' => 'required|string|',
            // 'is_admin' => 'required|string|confirmed|min:6',
        ]);

        if($validator->fails()) {
            return response()->json($validator->errors(), 401);
        }

        // $user = User::create([
        //         'first_name' => $request->first_name,
        //         'last_name' => $request->last_name,
        //         'username' => $request->username,
        //         // 'password' => Hash::make($request->password),
        //         'password' => hash("sha256", $request->password),
        //         'dob'=> $request->dob,
        //         'country' => $request->country,
        //         'city' => $request->city,
        //         'phone' => $request->phone,
        //         'gender' => $request->gender,
        //         'is_admin' => 0 ,

        //     ]);
        $user = new User;

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->username = $request->username;
        $user->password = bcrypt( $request->password);
        $user->dob = $request->dob;
        $user->country = $request->country;
        $user->city = $request->city;
        $user->phone = $request->phone;
        $user->gender = $request->gender;
        $user->is_admin = 0;

        $user->save();

        if ($this->token) {
            return $this->login($request);
        }



        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user
        ], Response::HTTP_OK);
    }

    public function login(Request $request)
    {
        $input = $request->only('username', 'password');
        $jwt_token = null;
  
        if (!$jwt_token = JWTAuth::attempt($input)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Usernname or Password',
            ], Response::HTTP_UNAUTHORIZED);
        }
  
        return response()->json([
            'success' => true,
            'token' => $jwt_token,
        ]);
    }

    public function logout() {
        Auth::guard('api')->logout();
    
        return response()->json([
            'status' => 'success',
            'message' => 'logout'
        ], 200);
    }    
   
    
  
  
}
