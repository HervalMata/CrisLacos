<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Resources\ProductPhotoCollection;
use CrisLacos\Http\Resources\ProductPhotoResource;
use CrisLacos\Models\Product;
use CrisLacos\Models\ProductPhoto;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return ProductPhotoCollection
     */
    public function index(Product $product)
    {
        return new ProductPhotoCollection($product->photos(), $product);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param Product $product
     * @return void
     */
    public function store(Request $request, Product $product)
    {
        ProductPhoto::createWithPhotosFiles($product->id, $request->photos);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return ProductPhotoResource
     */
    public function show(Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($photo, $product);

        return new ProductPhotoResource($photo);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return ProductPhotoResource
     */
    public function update(Request $request, Product $product, ProductPhoto $photo)
    {
        $this->assertProductPhoto($photo, $product);
        $photo = $photo->updateWithPhoto($request->photo);
        return new ProductPhotoResource($photo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    private function assertProductPhoto(ProductPhoto $photo, Product $product)
    {
        if ($photo->product_id != $product->id) {
            abort(404);
        }
    }
}
