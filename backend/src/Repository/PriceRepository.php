<?php

declare(strict_types=1);

namespace App\Repository;

use PDO;

class PriceRepository extends AbstractRepository
{
    public function findByProductId(string $productId): array
    {
        $stmt = $this->pdo->prepare('
            SELECT p.amount, c.label as currency_label, c.symbol as currency_symbol, p.__typename 
            FROM prices p 
            JOIN currencies c ON p.currency_label = c.label 
            WHERE p.product_id = :productId
        ');
        $stmt->execute(['productId' => $productId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
