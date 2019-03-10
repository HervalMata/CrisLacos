<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Filters\ProductInputFilter;
use CrisLacos\Http\Resources\ProductInputResource;
use CrisLacos\Models\ProductInput;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;
use CrisLacos\Models\Product;

class ProductInputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $filter = app(ProductInputFilter::class);
        $filterQuery = ProductInput::with('prroduct')->filtered($filter);
        $inputs = $filterQuery->paginate();
        return ProductInputResource::collection($inputs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Product $product)
    {
        $input = ProductInput::create($request->all());
        return ProductInput::create($input);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param ProductInput $input
     * @return ProductInputResource
     */
    public function update(Request $request, ProductInput $input)
    {
        return new ProductInputResource($input);
    }

    /**
     * Show the specified resource from storage.
     *
     * @param ProductInput $input
     * @return ProductInputResource
     */
    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }
}
