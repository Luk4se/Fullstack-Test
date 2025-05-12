<?php

declare(strict_types=1);

namespace App\GraphQL\Type;

use App\GraphQL\Mutation\OrderMutation;
use GraphQL\Type\Definition\ObjectType;

class MutationType extends ObjectType
{
    public function __construct(OrderMutation $orderMutation)
    {
        parent::__construct([
            'name'   => 'Mutation',
            'fields' => fn () => $orderMutation->get(),
        ]);
    }
}
