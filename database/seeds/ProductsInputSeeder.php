<?php

use Illuminate\Database\Seeder;
use CrisLacos\Models\ProductInput;

class ProductsInputSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(ProductInput::class, 5)->create();
    }
}
