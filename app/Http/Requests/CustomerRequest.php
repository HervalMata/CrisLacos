<?php

namespace CrisLacos\Http\Requests;

use CrisLacos\Rules\FirebaseTokenVerification;
use CrisLacos\Rules\PhoneNumberUnique;
use Illuminate\Foundation\Http\FormRequest;

class CustomerRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|max:255',
            'email' => 'required|max:255|email|unique:users,email',
            'name' => 'required|min:4|max:16',
            'photo' => 'image|max:' . (3 * 1024),
            'token' => [
                'required',
                new FirebaseTokenVerification(),
                new PhoneNumberUnique()
            ]
        ];
    }
}
