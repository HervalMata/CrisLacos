<?php
/**
 * Created by PhpStorm.
 * User: Herval
 * Date: 18/03/2019
 * Time: 22:36
 */
use Faker\Generator as faker;
use CrisLacos\Models\ChatGroup;

$factory->define(ChatGroup::class, function (Faker $faker) {
    return [
        'name' => $faker->country
    ];
});