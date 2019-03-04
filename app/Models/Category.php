<?php

namespace CrisLacos\Models;

use CrisLacos\Http\Controllers\Api\ProductController;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use Sluggable;

    protected $fillable = ['name', 'active'];

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

    public function products()
    {
        return $this->belongsToMany(Product::class);
    }
}
