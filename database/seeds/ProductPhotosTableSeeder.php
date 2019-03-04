<?php

use Illuminate\Database\Seeder;
use CrisLacos\Models\Product;
use CrisLacos\Models\ProductPhoto;
use Illuminate\Support\Collection;
use Illuminate\Http\UploadedFile;

class ProductPhotosTableSeeder extends Seeder
{
    private $allFakerPhotos;
    private $fakerPhotosPath = 'app/faker/product_photos';
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $this->allFakerPhotos = $this->getFakerPhotos();
        $products = Product::all();
        $this->deleteAllPhotosProductsPath();
        $self = $this;
        $products->each(function ($product) use ($self) {
            $self->createPhotoDir($product);
            $self->createPhotosModels($product);
        });
    }

    private function getFakerPhotos() : Collection
    {
        $path = storage_path($this->fakerPhotosPath);
        return collect(\File::allFiles($path));
    }

    private function deleteAllPhotosProductsPath()
    {
        $path = ProductPhoto::PRODUCTS_PATH;
        \File::deleteDirectory(storage_path($path), true);
    }

    private function createPhotoDir(Product $product)
    {
        $path = ProductPhoto::photosPath($product->id);
        \File::makeDirectory($path, 0777, true);
    }

    private function createPhotosModels(Product $product)
    {
        foreach (range(1, 5) as $v) {
            $this->createPhotosModel($product);
        }
    }

    private function createPhotosModel(Product $product)
    {
        $photo = ProductPhoto::create([
            'product_id' => $product->id,
            'file_name' => 'imagem.jpg',
        ]);

        $this->generatePhoto($photo);
    }

    private function generatePhoto(ProductPhoto $photo)
    {
        $photo->file_name = $this->uploadPhoto($photo->product_id);
        $photo->save();
    }

    private function uploadPhoto($product_id) : string
    {
        $photoFile = $this->allFakerPhotos->random();
        $uploadFile = new UploadedFile($photoFile->getRealPath(), str_random(16) , ',' . $photoFile->getExtension());

        return $uploadFile->hashName();
    }


}
