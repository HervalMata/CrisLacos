<?php

namespace CrisLacos\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChatGroupCreateRequest extends FormRequest
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
        $rules = parent::rules();
        $this->removeRulesRequiredFromPhoto($rules);

        return $rules;
    }

    private function removeRulesRequiredFromPhoto($rules)
    {
        $rules['photo'] = str_replace('required|', '', $rules['photo']);
    }
}
