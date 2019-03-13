<?php

namespace CrisLacos\Models;

use Illuminate\Database\Eloquent\Model;

class UserProfile extends Model
{
    protected $fillable = [
        'phone_number', 'photo'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
