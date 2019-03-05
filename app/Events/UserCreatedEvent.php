<?php

declare(strict_types = 1);
namespace CrisLacos\Events;

use CrisLacos\Models\User;

class UserCreatedEvent
{
    private $user;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return User
     */
    public function getUser() : User
    {
        return $this->user;
    }
}
