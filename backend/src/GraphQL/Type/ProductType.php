<?php

declare(strict_types=1);

namespace App\GraphQL\Type;

use App\Repository\AttributeRepository;
use App\Repository\PriceRepository;
use App\Repository\ProductGalleryRepository;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{
    private AttributeRepository $attributeRepo;

    private PriceRepository $priceRepo;

    private ProductGalleryRepository $galleryRepo;

    public function __construct(
        AttributeRepository $attributeRepo,
        PriceRepository $priceRepo,
        ProductGalleryRepository $galleryRepo
    ) {
        // Inject the repositories
        $this->attributeRepo = $attributeRepo;
        $this->priceRepo = $priceRepo;
        $this->galleryRepo = $galleryRepo;

        parent::__construct([
            'name'   => 'Product',
            'fields' => [
                'id'          => Type::string(),
                'name'        => Type::string(),
                'description' => Type::string(),
                'inStock'     => Type::boolean(),
                'category'    => Type::string(),
                'brand'       => Type::string(),
                '__typename'  => Type::string(),

                'attributes' => [
                    'type'    => Type::listOf(new AttributeSetType()),
                    'resolve' => function ($product) {
                        return $this->attributeRepo->findByProductId($product['id']);
                    },
                ],

                'prices' => [
                    'type'    => Type::listOf(new PriceType()),
                    'resolve' => function ($product) {
                        return $this->priceRepo->findByProductId($product['id']);
                    },
                ],

                'gallery' => [
                    'type'    => Type::listOf(Type::string()),
                    'resolve' => function ($product) {
                        return $this->galleryRepo->findByProductId($product['id']);
                    },
                ],
            ],
        ]);
    }
}
