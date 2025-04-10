<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\ObjectType;
use App\GraphQL\Mutation\OrderMutation;

class MutationType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Mutation',
            'fields' => array_merge(
                OrderMutation::get()
            )
        ]);
    }
}
