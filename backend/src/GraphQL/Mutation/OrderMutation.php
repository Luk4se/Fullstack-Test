<?php

declare(strict_types=1);

namespace App\GraphQL\Mutation;

use App\GraphQL\Type\AttributeInputType;
use App\Repository\OrderRepository;
use GraphQL\Type\Definition\Type;

class OrderMutation
{
    private OrderRepository $orderRepo;

    public function __construct(OrderRepository $orderRepo)
    {
        $this->orderRepo = $orderRepo;
    }

    public function get(): array
    {
        return [
            'createOrder' => [
                'type'    => Type::string(),
                'args'    => $this->getArguments(),
                'resolve' => fn ($root, $args) => $this->handleCreateOrder($args),
            ],
        ];
    }

    private function getArguments(): array
    {
        return [
            'product_id'          => Type::nonNull(Type::string()),
            'product_name'        => Type::nonNull(Type::string()),
            'selected_attributes' => Type::nonNull(Type::listOf(new AttributeInputType())),
            'unit_price'          => Type::nonNull(Type::float()),
            'quantity'            => Type::nonNull(Type::int()),
            'total_price'         => Type::nonNull(Type::float()),
        ];
    }

    private function handleCreateOrder(array $args): string
    {
        $this->orderRepo->insertOrder([
            'product_id'          => $args['product_id'],
            'product_name'        => $args['product_name'],
            'selected_attributes' => $args['selected_attributes'],
            'unit_price'          => $args['unit_price'],
            'quantity'            => $args['quantity'],
            'total_price'         => $args['total_price'],
        ]);

        return 'Order placed successfully!';
    }
}
