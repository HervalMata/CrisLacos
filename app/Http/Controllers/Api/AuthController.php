<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Resources\UserResource;
use CrisLacos\Models\UserProfile;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;
use CrisLacos\Firebase\Auth as FirebaseAuth;

class AuthController extends Controller
{
    use AuthenticatesUsers;

    public function login(Request $request)
    {
        $this->validateLogin($request);

        $credentials = $this->credentials($request);

        $token = \JWTAuth::attempt($credentials);

        return $this->responseToken($token);
    }

    public function loginFirebase(Request $request)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        $user = $firebaseAuth->user($request->token);
        $user = $firebaseAuth->user($teste);
        $profile = UserProfile::where('phone_number', $user->phoneNumber)->first();
        $token = null;

        if ($profile) {
            $token = \Auth::guard('api')->login($profile->user);
        }

        return $this->responseToken($token);
    }

    public function logout(Request $request)
    {
        \Auth::guard('api')->logout();
        return response()->json([], 200);
    }

    public function me()
    {
        $usuario = \Auth::guard('api')->user();
        return new UserResource($usuario);
    }

    public function refresh()
    {
        $token = \Auth::guard('api')->refresh();
        return ['token' => $token];
    }

    private function responseToken($token)
    {
        return $token ?
            ['token' => $token] :
            response()->json([
                'error' => \Lang::get('auth.failed')
            ], 400);
    }
}
