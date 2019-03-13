<?php

namespace CrisLacos\Providers;

use CrisLacos\Models\ProductInput;
use CrisLacos\Models\ProductOutput;
use Illuminate\Support\ServiceProvider;
use Kreait\Firebase;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Factory;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        \Schema::defaultStringLength(191);
        ProductInput::created(function ($input) {
            $product = $input->product;
            $product->stock += $input->amount;
            $product->save();
        });

        ProductOutput::created(function ($input) {
            $product = $input->product;
            $product->stock -= $input->amount;
            if ($product->stock < 0) {
                throw new \Exception("Estoque de {$product->name} não pode ser negativo!");
            }
            $product->save();
        });
    }

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        #app(Firebase::class)
        $this->app->bind(Firebase::class, function () {
            $serviceAccount = ServiceAccount::fromJsonFile(base_path('firebase-admin.json'));
            return (new Factory())->withServiceAccount($serviceAccount)->create();
        });
    }
}
