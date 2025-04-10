<?php
namespace App\Repository;

class CategoryRepository extends AbstractRepository {
    public function findAll(): array {
        $stmt = $this->pdo->query("SELECT name, __typename FROM categories");
        return $stmt->fetchAll();
    }
}
