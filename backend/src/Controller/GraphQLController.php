<?php
namespace App\Controller;

use App\Service\DB;
use App\GraphQL\Type\QueryType;
use App\GraphQL\Type\MutationType;
use GraphQL\GraphQL;
use GraphQL\Type\Schema;
use Throwable;

class GraphQLController {
    public static function handle(): string {
        try {
            $schema = new Schema([
                'query' => new QueryType(),
                'mutation' => new MutationType()
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
                    'message' => $e->getMessage()
                ]
            ]);
            
        }
    }
}
