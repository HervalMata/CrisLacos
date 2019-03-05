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

    /**
     * @param $productId
     * @return string
     */
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

    /**
     * @param $productId
     * @return string
     */
    private static function photoDir($productId)
    {
        $dir = self::DIR_PRODUCTS;
        return "{$dir}/{$productId}";
    }

    /**
     * @param int $productId
     * @param array $files
     * @return Collection
     * @throws \Exception
     */
    public static function createWithPhotosFiles(int $productId, array $files) : Collection
    {
        self::uploadFiles($productId, $files);
        $photos = self::createPhotosModels($productId, $files);

        try {
            self::uploadFiles($productId, $files);
            \DB::beginTransaction();
            $photos = self::createPhotosModels($productId, $files);
            \DB::commit();

            return new Collection($photos);
        } catch (\Exception $e) {
            self::deleteFiles($productId, $files);
            \DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param UploadedFile $file
     * @return ProductPhoto
     * @throws \Exception
     */
    public function updateWithPhoto(UploadedFile $file) : ProductPhoto
    {

        try {
            self::uploadFiles($this->product_id, [$file]);
            \DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $this->file_name = $file->hashName();
            $this->save();
            \DB::commit();

            return $this;
        } catch (\Exception $e) {
            self::deleteFiles($this->product_id, [$file]);
            \DB::rollBack();
            throw $e;
        }
    }

    /**
     * @param int $productId
     * @param array $files
     * @return array
     */
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

    /**
     * @return string
     */
    public function getPhotoUrlAttribute()
    {
        $path = self::photoDir($this->product_id);
        return asset("storage/{$path}/{$this->file_name}");
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class)->withTrashed();
    }

    /**
     * @param $fileName
     */
    private function deletePhoto($fileName)
    {
        $dir = self::photoDir($this->product_id);
        \Storage::disk('public')->delete("{$dir}/{$fileName}");
    }

    /**
     * @param int $productId
     * @param array $files
     */
    private static function deleteFiles(int $productId, array $files)
    {
        foreach ($files as $file) {
            $path =self::photosPath($productId);
            $photoPath = "{$path}/{$file->hashName()}";
            if (file_exists($photoPath)) {
                \File::delete($photoPath);
            }
        }
    }

    /**
     * @return bool
     * @throws \Exception
     */
    public function deleteWithPhoto() : bool
    {
        try {
            \DB::beginTransaction();
            $this->deletePhoto($this->file_name);
            $result = $this->delete();
            \DB::commit();

            return $result;
        } catch (\Exception $e) {
            \DB::rollBack();
            throw $e;
        }
    }
}
