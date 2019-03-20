<?php

namespace CrisLacos\Http\Resources;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Pagination\AbstractPaginator;

class ChatGroupUserResource extends JsonResource
{
    private $users;

    public function __construct($resource, $users = null)
    {
        parent::__construct($resource);
        $this->users = $users;
    }

    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return $this->makeArray($request);
    }

    private function makeArray($request)
    {
        $chatGroup = $this->getChatGroup();
        $array = [
            'data' => [
                'chat_group' => new ChatGroupUserResource($resource)
            ]
        ];

        $userResponse = $this->getUsersResponse($request);

        if ($userResponse instanceof JsonResponse) {
            $data = $userResponse->getData();
            $array['data']['user'] = $data->data;
            $array['links']        = $data->links;
            $array['meta']         = $data->meta;
        } else {
            $array['data']['user'] = $userResponse;
        }

        return $array;

    }

    private function getChatGroup()
    {
        $chat_group = $this->resource;
        $chat_group->users_count = $this->resource->users()->count();

        return $chat_group;
    }

    private function getUsersResponse($request)
    {
        $users = $this->users ? $this->users : $this->resource->users()->paginate(2);

        return $users instanceof AbstractPaginator ?
            UserResource::collection($users)->toResponse($request) :
            UserResource::collection($users);
    }
}
