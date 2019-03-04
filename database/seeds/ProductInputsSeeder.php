<?php

use Illuminate\Database\Seeder;
use CrisLacos\Models\ProductInput;
use CrisLacos\Models\Product;

class ProductInputsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();
        factory(ProductInput::class, 150)
            ->make()
            ->each(function ($input) use ($products) {
                $product = $products->random();
                $input->product_id = $products->random()->id;
                $input->save();
                $product->save();
            });
    }
}
