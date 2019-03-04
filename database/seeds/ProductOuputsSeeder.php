<?php

use Illuminate\Database\Seeder;
use CrisLacos\Models\ProductOutput;
use CrisLacos\Models\Product;

class ProductOutputsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = Product::all();
        factory(ProductOutput::class, 200)
            ->make()
            ->each(function ($ouput) use ($products) {
                $product = $products->random();
                $ouput->product_id = $products->random()->id;
                $ouput->save();
                //$product->save();
            });
    }
}
