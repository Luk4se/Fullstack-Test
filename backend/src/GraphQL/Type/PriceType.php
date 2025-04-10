<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class PriceType extends ObjectType
{
    public function __construct()
    {
        parent::__construct([
            'name' => 'Price',
            'fields' => [
                'amount' => Type::float(),
                'currency' => [
                    'type' => new CurrencyType(),
                    'resolve' => fn($price) => [
                        'label' => $price['currency_label'],
                        'symbol' => $price['currency_symbol'],
                        '__typename' => 'Currency'
                    ]
                ],
                '__typename' => Type::string()
            ]
        ]);
    }
}
