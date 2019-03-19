<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(CategoriesTableSeeder::class);
        $this->call(ProductTableSeeder::class);
        $this->call(ProductInputsSeeder::class);
        $this->call(ProductOutputsSeeder::class);
        $this->call(ProductPhotosTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(ChatGroupsTableSeeder::class);
    }
}
