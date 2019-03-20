<?php

namespace CrisLacos\Http\Controllers\Api;

use CrisLacos\Http\Requests\ChatGroupCreateRequest;
use CrisLacos\Http\Requests\ChatGroupUpdateRequest;
use CrisLacos\Http\Resources\ChatGroupResource;
use Illuminate\Http\Request;
use CrisLacos\Http\Controllers\Controller;
use CrisLacos\Models\ChatGroup;

class ChatGroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $chatGroups = ChatGroup::withCount('users')->paginate();
        return ChatGroupResource::collection($chatGroups);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return void
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param ChatGroupCreateRequest $request
     * @return ChatGroupResource
     * @throws \Exception
     */
    public function store(ChatGroupCreateRequest $request)
    {
        $chatGroup = ChatGroup::createWithPhoto($request->all());
        return new ChatGroupResource($chatGroup);
    }

    /**
     * Display the specified resource.
     *
     * @param ChatGroup $chatGroup
     * @return ChatGroupResource
     */
    public function show(ChatGroup $chatGroup)
    {
        return new ChatGroupResource($chatGroup);
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
     * @param ChatGroupUpdateRequest $request
     * @param ChatGroup $chatGroup
     * @return ChatGroupResource
     * @throws \Exception
     */
    public function update(ChatGroupUpdateRequest $request, ChatGroup $chatGroup)
    {
        $chatGroup->updateWithPhoto($request->all());
        return new ChatGroupResource($chatGroup);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ChatGroup $chatGroup
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(ChatGroup $chatGroup)
    {
        $chatGroup->delete();
        return response()->json([], 204);
    }
}
