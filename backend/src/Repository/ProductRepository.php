<?php

declare(strict_types=1);

namespace App\Repository;

use PDO;

class ProductRepository extends AbstractRepository
{
    public function findAll(): array
    {
        $stmt = $this->pdo->query('SELECT * FROM products ORDER BY sort ASC');

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
