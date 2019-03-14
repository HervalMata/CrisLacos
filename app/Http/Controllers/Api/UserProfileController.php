<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Resources\UserResource;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;
use CrisLacos\Firebase\Auth as FirebaseAuth;

class UserProfileController extends Controller
{

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return UserResource
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        if ($request->has('token')) {
            $token = $request->token;
            $data['phone_number'] = $this->getPhoneNumber($token);
        }

        if ($request->has('remove_photo')) {
            $data['photo'] =  null;
        }


        $user = \Auth::guard('api')->user();
        $user->updateWithProfile($data);

        $resource = new UserResource($user);

        return [
            'user' => $resource->toArray($request),
            'token' => \Auth::guard('api')->user()
        ];
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

}
