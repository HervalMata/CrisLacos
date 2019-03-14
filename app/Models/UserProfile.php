<?php

declare(strict_types=1);
namespace CrisLacos\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;

class UserProfile extends Model
{
    const BASE_PATH   = 'app/public';
    const DIR_USERS   = 'users';
    const DIR_USER_PHOTO = self::DIR_USERS . '/photos';
    const USER_PHOTO_PATH = self::BASE_PATH . '/' . self::DIR_USER_PHOTO;

    protected $fillable = [
        'phone_number', 'photo'
    ];

    public static function photosPath()
    {
        $path = self::USER_PHOTO_PATH;
        return storage_path($path);
    }

    public static function photoDir()
    {
        $dir = self::DIR_USERS;
        return $dir;
    }

    public static function uploaPhoto(UploadedFile $photo = null)
    {
        if (!$photo) {
            return;
        }

        $dir = self::photoDir();
        $photo->store($dir, ['disk' => 'public']);
    }

    private static function getPhotoHasName(UploadedFile $photo = null)
    {
        return $photo ? $photo->hashName() : null;
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function saveProfile(User $user, array $data) : UserProfile
    {
        $data['photo'] = UserProfile::getPhotoHasName($data['photo']);
        $user->profile()->fill($data)->save();

        return $user->profile;
    }

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
}
