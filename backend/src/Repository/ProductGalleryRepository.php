<?php

declare(strict_types=1);

namespace App\Repository;

use PDO;

class ProductGalleryRepository extends AbstractRepository
{
    public function findByProductId(string $productId): array
    {
        $stmt = $this->pdo->prepare('SELECT image_url FROM product_gallery WHERE product_id = :productId');
        $stmt->execute(['productId' => $productId]);

        return array_column($stmt->fetchAll(PDO::FETCH_ASSOC), 'image_url');
    }
}
