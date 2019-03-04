<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Models\Category;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;
use CrisLacos\Models\Product;
use CrisLacos\Http\Requests\ProductCategoryRequest;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function index(Product $product)
    {
        return $product->categories;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request\ProductCategoryRequest $request
     * @param Product $product
     * @return \Illuminate\Http\Response
     */
    public function store(ProductCategoryRequest $request, Product $product)
    {
        $changed = $product->categories()->sync($request->categories);
        $categoriesAttachedId = $changed['attached'];
        $categories = Category::whereIn('id', $categoriesAttachedId)->get();

        return $categories->count() ? response()->json($categories, 201) : [];
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
}
