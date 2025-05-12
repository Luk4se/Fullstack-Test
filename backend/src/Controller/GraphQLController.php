<?php

declare(strict_types=1);

namespace App\Controller;

use App\GraphQL\Mutation\OrderMutation;
use App\GraphQL\Type\MutationType;
use App\GraphQL\Type\QueryType;
use App\Repository\{
    AttributeRepository,
    CategoryRepository,
    OrderRepository,
    PriceRepository,
    ProductGalleryRepository,
    ProductRepository
};
use App\Service\DB;
use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use Throwable;

class GraphQLController
{
    public static function handle(): string
    {
        try {
            $pdo = DB::getInstance()->getConnection();

            $categoryRepo = new CategoryRepository($pdo);
            $productRepo = new ProductRepository($pdo);
            $orderRepo = new OrderRepository($pdo);
            $attributeRepo = new AttributeRepository($pdo);
            $priceRepo = new PriceRepository($pdo);
            $galleryRepo = new ProductGalleryRepository($pdo);

            $queryType = new QueryType($categoryRepo, $productRepo, $attributeRepo, $priceRepo, $galleryRepo);

            $orderMutation = new OrderMutation($orderRepo);
            $mutationType = new MutationType($orderMutation);

            $schema = new Schema([
                'query'    => $queryType,
                'mutation' => $mutationType,
            ]);

            $rawInput = file_get_contents('php://input');
            $input = json_decode($rawInput, true);
            $query = $input['query'] ?? '';
            $variables = $input['variables'] ?? [];

            $result = GraphQL::executeQuery($schema, $query, null, null, $variables);

            return json_encode($result->toArray());

        } catch (Throwable $e) {
            return json_encode([
                'error' => [
                    'message' => $e->getMessage(),
                ],
            ]);
        }
    }
}
