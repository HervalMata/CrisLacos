<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 03/03/2019
 * Time: 11:44
 */

use Faker\Generator as Faker;

$factory->define(CrisLacos\Models\Category::class, function (Faker $faker) {
    return [
        'name' => $faker->colorName
    ];
});