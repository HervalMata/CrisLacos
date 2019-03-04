<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 03/03/2019
 * Time: 11:44
 */

use Faker\Generator as Faker;

$factory->define(CrisLacos\Models\Product::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'price' => $faker->randomFloat(2, 100, 1000),
        'description' => $faker->text(400),
    ];
});