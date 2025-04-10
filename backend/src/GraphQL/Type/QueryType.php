<?php

namespace App\GraphQL\Type;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use App\Repository\CategoryRepository;
use App\Repository\ProductRepository;
use App\GraphQL\Type\CategoryType;
use App\GraphQL\Type\ProductType;

class QueryType extends ObjectType {
    public function __construct() {
        $productType = new ProductType();
        $categoryType = new CategoryType();

        
        parent::__construct([
            'name' => 'Query',
            //Get All categories
            'fields' => [
               'categories' => [
                'type' => Type::listOf($categoryType),
                'resolve' => fn () => (new CategoryRepository())->findAll()
                ],

            //Get All Products
                'products' => [
                    'type' => Type::listOf($productType),
                    'resolve' => fn () => (new ProductRepository())->findAll()
                ]
            ]
        ]);
    }
}
