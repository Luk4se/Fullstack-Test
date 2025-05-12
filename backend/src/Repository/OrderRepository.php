<?php

declare(strict_types=1);

namespace App\Repository;

use Throwable;

class OrderRepository extends AbstractRepository
{
    public function insertOrder(array $data): void
    {
        $this->pdo->beginTransaction();

        try {
            $stmt = $this->pdo->prepare('
                INSERT INTO orders (product_id, product_name, unit_price, quantity, total_price)
                VALUES (:product_id, :product_name, :unit_price, :quantity, :total_price)
            ');

            $stmt->execute([
                'product_id'   => $data['product_id'],
                'product_name' => $data['product_name'],
                'unit_price'   => $data['unit_price'],
                'quantity'     => $data['quantity'],
                'total_price'  => $data['total_price'],
            ]);

            $orderId = $this->pdo->lastInsertId();

            $attrStmt = $this->pdo->prepare('
                INSERT INTO order_attributes (order_id, attribute_name, attribute_value)
                VALUES (:order_id, :attribute_name, :attribute_value)
            ');

            foreach ($data['selected_attributes'] as $attr) {
                $attrStmt->execute([
                    'order_id'        => $orderId,
                    'attribute_name'  => $attr['attributeName'],
                    'attribute_value' => $attr['attributeValue'],
                ]);
            }

            $this->pdo->commit();
        } catch (Throwable $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}
