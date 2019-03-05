<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Resources\UserResource;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function login(Request $request)
    {
        $this->validateLogin($request);

        $credentials = $this->credentials($request);

        $token = \JWTAuth::attempt($credentials);

        return $token ?
            ['token' => $token] :
            response()->json([
                'error' => \Lang::get('auth.failed')
            ], 400);
    }

    public function logout(Request $request)
    {
        \Auth::guard('api')->logout();
        return response()->json([], 404);
    }

    public function me()
    {
        $usuario = \Auth::guard('api')->user();
        return new UserResource($usuario);
    }
}
