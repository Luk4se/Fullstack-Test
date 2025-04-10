<?php

namespace App\GraphQL\Mutation;

use GraphQL\Type\Definition\Type;
use App\Repository\OrderRepository;
use App\GraphQL\Type\AttributeInputType;

class OrderMutation
{
    public static function get(): array
    {
        return [
            'createOrder' => [
                'type' => Type::string(),
                'args' => [
                    'product_id' => Type::nonNull(Type::string()),
                    'product_name' => Type::nonNull(Type::string()),
                    'selected_attributes' => Type::nonNull(Type::listOf(new AttributeInputType())),
                    'unit_price' => Type::nonNull(Type::float()),
                    'quantity' => Type::nonNull(Type::int()),
                    'total_price' => Type::nonNull(Type::float()),
                ],
                'resolve' => function ($root, $args) {
                    $orderRepo = new OrderRepository();
                    $orderRepo->createOrdersTableIfNotExists();
                    $orderRepo->insertOrder([
                        'product_id' => $args['product_id'],
                        'product_name' => $args['product_name'],
                        'selected_attributes' => $args['selected_attributes'],
                        'unit_price' => $args['unit_price'],
                        'quantity' => $args['quantity'],
                        'total_price' => $args['total_price'],
                    ]);

                    return 'Order placed successfully!';
                }
            ]
        ];
    }
}
