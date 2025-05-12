<?php

declare(strict_types=1);

namespace App\GraphQL\Type;

use App\Repository\AttributeRepository;
use App\Repository\CategoryRepository;
use App\Repository\PriceRepository;
use App\Repository\ProductGalleryRepository;
use App\Repository\ProductRepository;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class QueryType extends ObjectType
{
    public function __construct(
        CategoryRepository $categoryRepo,
        ProductRepository $productRepo,
        AttributeRepository $attributeRepo,
        PriceRepository $priceRepo,
        ProductGalleryRepository $galleryRepo
    ) {
        $productType = new ProductType($attributeRepo, $priceRepo, $galleryRepo);
        $categoryType = new CategoryType();

        parent::__construct([
            'name'   => 'Query',
            'fields' => [
                'categories' => [
                    'type'    => Type::listOf($categoryType),
                    'resolve' => fn () => $categoryRepo->findAll(),
                ],
                'products' => [
                    'type'    => Type::listOf($productType),
                    'resolve' => fn () => $productRepo->findAll(),
                ],
            ],
        ]);
    }
}
