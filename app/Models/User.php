<?php

declare(strict_types=1);
namespace CrisLacos\Models;

use CrisLacos\Firebase\FirebaseSync;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Mnabialek\LaravelEloquentFilter\Traits\Filterable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable, SoftDeletes, Filterable, FirebaseSync;

    const ROLE_SELLER = 1;
    const ROLE_CUSTOMER = 2;

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * @param array $attributes
     * @return Authenticatable
     */
    public function fill(array $attributes)
    {
        !isset($attributes['password']) ? : $attributes['password'] = bcrypt($attributes['password']);
        return parent::fill($attributes);
    }

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->id;
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [
            'email' => $this->email,
            'name' => $this->name,
            'profile' => [
                'has_photo' => $this->profile->photo ? true : false,
                'photo_url' => $this->profile->photo_url,
                'phone_number' => $this->profile->phone_number
            ]
        ];
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function profile()
    {
        return $this->hasOne(UserProfile::class)->withDefault();
    }

    /**
     * @param array $data
     * @return User
     * @throws \Exception
     */
    public static function createCustomer(array $data) : User
    {
        try {
            UserProfile::uploaPhoto($data['photo']);
            \DB::beginTransaction();

            $user = self::createCustomeUser($data);
            UserProfile::saveProfile($user, $data);
            \DB::commit();
        } catch (\Exception $e) {
            UserProfile::deleteFile($data['photo']);
            \DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param $data
     * @return User
     */
    public static function createCustomeUser($data) : User
    {
        $data['password'] = bcrypt(str_random(16));
        $user = User::create($data);
        $user->role = User::ROLE_CUSTOMER;
        $user->save();

        return $user;
    }

    /**
     * @param array $data
     * @return User
     * @throws \Exception
     */
    public function updateWhitProfile(array $data) : User
    {
        try {
            if (isset($data['photo'])) {
                UserProfile::uploadPhoto($data['photo']);
            }
            \DB::beginTransaction();
            $this->fill($data);
            $this->save();
            UserProfile::saveProfile($this, $data);
            \DB::commit();
        } catch (\Exception $e) {
            if (isset($data['photo'])) {
                UserProfile::deleteFile($data['photo']);
            }

            \DB::rollBack();
            throw $e;
        }

        return $this;
    }

    protected function syncFbCreate()
    {
        $this->syncFbSetCustom();
    }

    protected function syncFbUpdate()
    {
        $this->syncFbSetCustom();
    }

    protected function syncFbRemove()
    {
        $this->syncFbSetCustom();
    }

    public function syncFbSetCustom()
    {
        $this->profile()->refresh();

        if ($this->profile->firebase_uid) {
            $database = $this->getFirebaseDatabase();
            $path = 'users/' . $this->profile->firebase_uid;
            $reference = $database->getReference($path);
            $reference->set([
                'name' => $this->name,
                'photo_url' => $this->profile->photo_url_base,
                'deleted_at' => $this->deleted_at
            ]);
        }
    }
}
