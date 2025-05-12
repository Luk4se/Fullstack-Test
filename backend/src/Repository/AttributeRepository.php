<?php

declare(strict_types=1);

namespace App\Repository;

use App\Model\Attribute\AbstractAttribute;
use App\Model\Attribute\ColorAttribute;
use App\Model\Attribute\TextAttribute;
use PDO;

class AttributeRepository extends AbstractRepository
{
    public function findByProductId(string $productId): array
    {
        $attributes = $this->fetchAttributes($productId);

        if (empty($attributes)) {
            return [];
        }

        $result = [];

        foreach ($attributes as $attr) {
            $items = $this->fetchItems((int) $attr['id']);
            $attribute = $this->createAttributeInstance($attr, $items);
            $result[] = $attribute->toArray();
        }

        return $result;
    }

    private function fetchAttributes(string $productId): array
    {
        $query = 'SELECT * FROM attributes WHERE product_id = :productId';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute(['productId' => $productId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function fetchItems(int $attributeId): array
    {
        $query = 'SELECT * FROM attribute_items WHERE attribute_id = :attributeId';
        $stmt = $this->pdo->prepare($query);
        $stmt->execute(['attributeId' => $attributeId]);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    private function createAttributeInstance(array $attr, array $items): AbstractAttribute
    {
        return match (strtolower($attr['type'])) {
            'swatch' => new ColorAttribute($attr, $items),
            default  => new TextAttribute($attr, $items),
        };
    }
}
