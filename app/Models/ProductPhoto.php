<?php

declare(strict_types = 1);
namespace CrisLacos\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Collection;

class ProductPhoto extends Model
{
    const BASE_PATH = 'app/public';
    const DIR_PRODUCTS = 'products';
    const PRODUCTS_PATH = self::BASE_PATH . '/' . self::DIR_PRODUCTS;

    protected $fillable = ['file_name', 'product_id'];

    public static function photosPath($productId)
    {
        $path = self::PRODUCTS_PATH;
        return storage_path("{$path}/{$productId}");
    }

    /**
     * @param $productId
     * @param array $files
     */
    public static function uploadFiles($productId, array $files)
    {
        $dir = self::photoDir($productId);
        /** @var UploadedFile $file */
        foreach ($files as $file) {
            $file->store($dir, ['disk' => 'public']);
        }
    }

    private static function photoDir($productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    public static function createWithPhotosFiles(int $productId, array $files) : Collection
    {
        self::uploadFiles($productId, $files);
        $photos = self::createPhotosModels($productId, $files);

        return new Collection($photos);
    }

    private static function createPhotosModels(int $productId, array $files) : array
    {
        $photos = [];
        foreach ($files as $file) {
            $photos[] = self::create([
                'file_name' => $file->hasName(),
                'product_id' => $productId
            ]);

            return $photos;
        }
    }

    public function getPhotoUrlAttribute()
    {
        $path = self::photoDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
