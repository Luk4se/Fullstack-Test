<?php
namespace App\Repository;

use App\Service\DB;
use PDO;

abstract class AbstractRepository {
    protected PDO $pdo;

    public function __construct() {
        $this->pdo = DB::getInstance()->getConnection();
    }
}
