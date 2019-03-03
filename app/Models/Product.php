<?php

namespace CrisLacos\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use Sluggable;

    protected $fillable = ['name', 'active', 'slug', 'description', 'price', 'stock'];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [ 'slug' => [
            'source' => 'name'
        ]];
    }
}
