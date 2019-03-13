<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 12/03/2019
 * Time: 22:01
 */

namespace CrisLacos\Firebase;

use Firebase\Auth\UserRecord;
use Kreait\Firebase;

class Auth
{

    private $firebase;

    /**
     * Auth constructor.
     * @param Firebase $firebase
     */
    public function __construct(Firebase $firebase)
    {
        $this->firebase = $firebase;
    }

    /**
     * @param $token
     * @return UserRecord
     */
    public function user($token) : UserRecord
    {
        $verifieldIdToken = $this->firebase->getAuth()->verifyIdToken($token);
        $uid = $verifieldIdToken->getClaim('sub');
        return $this->firebase->getAuth()->getUser($uid);
    }

    /**
     * @param $token
     * @return string
     */
    public function phoneNumber($token) : string
    {
        $user = $this->user($token);
        return $user->phoneNumber;
    }
}