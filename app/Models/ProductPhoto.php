<?php

namespace CrisLacos\Models;

use Illuminate\Database\Eloquent\Model;

class ProductPhoto extends Model
{
    protected $fillable = ['file_name', 'product_id'];
}
