<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Requests\CustomerRequest;
use CrisLacos\Http\Requests\PhoneNumberToUpdateRequest;
use CrisLacos\Mail\PhoneNumberChangeMail;
use CrisLacos\Models\User;
use CrisLacos\Models\UserProfile;
use CrisLacos\Rules\PhoneNumberUnique;
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

    /**
     * @param PhoneNumberToUpdateRequest $request
     */
    public function requestPhoneNumberUpdate(PhoneNumberToUpdateRequest $request)
    {
        $user = User::whereEmail($request->email)->first();
        $phoneNumber = $this->getPhoneNumber($request->token);
        $token = UserProfile::createTokenToChangePhoneNumber($user->profile, $phoneNumber);

        \Mail::to($user)->send(new PhoneNumberChangeMail($user, $token));

        return response()->json([], 204);
    }

    /**
     * @param $token
     * @return string
     */
    private function getPhoneNumber($token)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        return $firebaseAuth->phoneNumber($token);
    }

    /**
     * @param $token
     * @return \Illuminate\Http\JsonResponse
     */
    public function updatePhoneNumber($token)
    {
        UserProfile::updatePhoneNumber($token);
        return response()->json([], 204);
    }

}
