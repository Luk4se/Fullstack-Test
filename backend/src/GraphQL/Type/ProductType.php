<?php

namespace App\GraphQL\Type;

use App\Repository\AttributeRepository;
use App\Repository\ProductGalleryRepository;
use App\Repository\PriceRepository;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{
    public function __construct()
    {
        $attributeRepo = new AttributeRepository();
        $galleryRepo = new ProductGalleryRepository();
        $priceRepo = new PriceRepository();

        parent::__construct([
            'name' => 'Product',
            'fields' => function () use ($attributeRepo, $galleryRepo, $priceRepo) {
                return [
                    'id' => Type::string(),
                    'name' => Type::string(),
                    'description' => Type::string(),
                    'inStock' => Type::boolean(),
                    'category' => Type::string(),
                    'brand' => Type::string(),
                    '__typename' => Type::string(),

                    'attributes' => [
                        'type' => Type::listOf(new AttributeSetType()),
                        'resolve' => fn($product) => $attributeRepo->findByProductId($product['id']) ?? []
                    ],

                    'gallery' => [
                        'type' => Type::listOf(Type::string()),
                        'resolve' => fn($product) => $galleryRepo->findByProductId($product['id']) ?? []
                    ],

                    'prices' => [
                        'type' => Type::listOf(new PriceType()),
                        'resolve' => fn($product) => $priceRepo->findByProductId($product['id']) ?? []
                    ]
                ];
            }
        ]);
    }
}
