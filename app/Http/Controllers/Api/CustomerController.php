<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Requests\CustomerRequest;
use CrisLacos\Models\User;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;
use CrisLacos\Firebase\Auth as FirebaseAuth;

class CustomerController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CustomerRequest $request)
    {
        $data = $request->all();

        $token = $request->token;
        $data['phone_number'] = $this->getPhoneNumber($token);
        $data['photo'] = $data['photo'] ?? null;

        $user = User::createCustomer($data);

        return [
            'token' => \Auth::guard('api')->login($user)
        ];
    }

    private function getPhoneNumber($token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }

}
