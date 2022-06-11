<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;

class CheckAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */

   

    public function handle(Request $request, Closure $next)
    {
        $user = Auth::user();
        $is_admin = json_decode($user,true)["is_admin"];
        if($is_admin){
            return $next($request);
        }else{
            dd("Dear User Please Go To Your Page !");
            
        }

    }
}
