<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 13/03/2019
 * Time: 12:10
 */

namespace CrisLacos\Rules;

use CrisLacos\Firebase\Auth as FirebaseAuth;

class FirebaseTokenVerification
{

    /**
     * FirebaseTokenVerification constructor.
     */
    public function __construct()
    {
    }

    /**
     * @param $attribute
     * @param $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        $firebaseAuth = app(FirebaseAuth::class);
        try {
            $firebaseAuth->user($value);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * @return string
     */
    public function message()
    {
        return 'Firebase token is invalid.';
    }
}