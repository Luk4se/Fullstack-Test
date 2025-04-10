<?php

namespace App\Repository;

class OrderRepository extends AbstractRepository
{
    public function createOrdersTableIfNotExists(): void
{
    $this->pdo->exec("
        CREATE TABLE IF NOT EXISTS orders (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id VARCHAR(100),
            product_name VARCHAR(100),
            unit_price DECIMAL(10,2),
            quantity INT,
            total_price DECIMAL(10,2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    ");

    $this->pdo->exec("
        CREATE TABLE IF NOT EXISTS order_attributes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT,
            attribute_name VARCHAR(100),
            attribute_value VARCHAR(100),
            FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
        );
    ");
}

public function insertOrder(array $data): void
{
    $this->pdo->beginTransaction();

    try {
        // Insert into `orders` table
        $stmt = $this->pdo->prepare("
            INSERT INTO orders (product_id, product_name, unit_price, quantity, total_price)
            VALUES (:product_id, :product_name, :unit_price, :quantity, :total_price)
        ");

        $stmt->execute([
            'product_id' => $data['product_id'],
            'product_name' => $data['product_name'],
            'unit_price' => $data['unit_price'],
            'quantity' => $data['quantity'],
            'total_price' => $data['total_price']
        ]);

        $orderId = $this->pdo->lastInsertId();

        // Insert each attribute into `order_attributes`
        $attrStmt = $this->pdo->prepare("
            INSERT INTO order_attributes (order_id, attribute_name, attribute_value)
            VALUES (:order_id, :attribute_name, :attribute_value)
        ");

        foreach ($data['selected_attributes'] as $attr) {
            $attrStmt->execute([
                'order_id' => $orderId,
                'attribute_name' => $attr['attributeName'],
                'attribute_value' => $attr['attributeValue']
            ]);
        }

        $this->pdo->commit();
    } catch (\Throwable $e) {
        $this->pdo->rollBack();
        throw $e;
    }
}

}
