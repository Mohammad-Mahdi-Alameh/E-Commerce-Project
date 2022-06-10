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
   public function Test(){
    echo"Test!";
   }
  
}
