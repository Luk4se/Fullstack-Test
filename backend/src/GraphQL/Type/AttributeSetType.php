<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeSetType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeSet',
            'fields' => [
                'id' => Type::string(),  
                'name'         => Type::string(),
                'type'         => Type::string(),
                'items'        => Type::listOf(new AttributeItemType()),
                '__typename'   => Type::string()
            ]
        ]);
    }
}
