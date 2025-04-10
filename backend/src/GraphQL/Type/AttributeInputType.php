<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class AttributeInputType extends InputObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'AttributeInput',
            'fields' => [
                'attributeName' => Type::nonNull(Type::string()),
                'attributeValue' => Type::nonNull(Type::string()),
            ],
        ]);
    }
}
