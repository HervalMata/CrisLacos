<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 03/03/2019
 * Time: 11:44
 */

use Faker\Generator as Faker;

$factory->define(CrisLacos\Models\ProductOutput::class, function (Faker $faker) {
    return [
        'amount' => $faker->randomBetween(1, 2)
    ];
});