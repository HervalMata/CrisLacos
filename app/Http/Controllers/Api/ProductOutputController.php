<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Requests\ProductOutputRequest;
use CrisLacos\Http\Resources\ProductOutputResource;
use CrisLacos\Models\ProductOutput;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;

class ProductOutputController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $ouputs = ProductOutputt::with('product')->paginate();
        return ProductOutputResource::collection($ouputs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return ProductOutputResource
     */
    public function store(ProductOutputRequest $request)
    {
        $output = ProductOutput::create($request->all());
        return new ProductOutputResource($output);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return ProductOutputResource
     */
    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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
