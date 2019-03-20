<?php

declare(strict_types=1);
namespace CrisLacos\Models;

use CrisLacos\Firebase\FirebaseSync;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class UserProfile extends Model
{
    use FirebaseSync;

    const BASE_PATH   = 'app/public';
    const DIR_USERS   = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS . '/photos';
    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = [
        'phone_number', 'photo'
    ];

    /**
     * @return string
     */
    public static function photosPath()
    {
        $path = self::USER_PHOTO_PATH;
        return storage_path($path);
    }

    /**
     * @return string
     */
    public static function photoDir()
    {
        $dir = self::DIR_USERS;
        return $dir;
    }

    /**
     * @param UploadedFile|null $photo
     */
    public static function uploadPhoto(UploadedFile $photo = null)
    {
        if (!$photo) {
            return;
        }

        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    /**
     * @param UploadedFile|null $photo
     * @return null|string
     */
    private static function getPhotoHasName(UploadedFile $photo = null)
    {
        return $photo ? $photo->hashName() : null;
    }

    /**
     * @param $profile
     * @param string $phoneNumber
     * @return string
     */
    public static function createTokenToChangePhoneNumber($profile, string $phoneNumber)
    {
        $token = base64_encode($phoneNumber);
        $profile->phone_number_token_to_change = $token;
        $profile->save();

        return $token;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @param User $user
     * @param array $data
     * @return UserProfile
     */
    public static function saveProfile(User $user, array $data) : UserProfile
    {
        if (array_key_exists('photo', $data)) {
            self::deletePhoto();
            $data['photo'] = UserProfile::getPhotoHasName($data['photo']);
        }
        $user->profile()->fill($data)->save();

        return $user->profile;
    }

    private static function deletePhoto(UserProfile $profile)
    {
        if (!$photo) {
            return;
        }

        $dir = self::photoDir();
        \Storage::disk('public')->delete("{$dir}/{$profile->photo}");
    }

    /**
     * @param UploadedFile|null $photo
     */
    public static function deleteFile(UploadedFile $photo = null)
    {
        if (!$photo) {
            return;
        }

        $dir = self::photosPath();
        $filePath = "{$path}/{$photo->hashName()}";

        if (file_exists($filePath)) {
            \File::delete($filePath);
        }
    }

    /**
     * @return string
     */
    public function getPhotoUrlAttribute()
    {
        return $this->photo ? asset("storage/{$path}/{$this->$photo_url_base}") : 'https://gravatar.com/avatar/nouser.jpg';
    }

    public function getPhotoUrlBaseAttribute()
    {
        $path = self::photoDir();
        return $this->photo ? "{$path}/{$this->$photo}" : 'https://gravatar.com/avatar/nouser.jpg';
    }

    /**
     * @param $token
     * @return mixed
     */
    public static function updatePhoneNumber($token)
    {
        $profile = UserProfile::where('phone_number_token_to_change', $token)->firstOrFail();
        $phoneNumber = base64_decode($token);
        $profile->phone_Number = $phoneNumber;
        $profile->phone_number_token_to_change = null;
        $profile->save();

        return $profile;
    }

    protected function syncFbSet()
    {
        $this->user()->syncFbSetCustom();
    }
}
