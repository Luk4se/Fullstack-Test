<?php

namespace App\Service;

use PDO;
use PDOException;

class DB {
    private static ?DB $instance = null;
    private PDO $connection;

    private function __construct() {
        $host = 'localhost';
        $db = 'scandiweb';
        $user = 'root';
        $pass = '1234';

        try {
            $this->connection = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('DB connection failed: ' . $e->getMessage());
        }
    }

    public static function getInstance(): DB {
        if (self::$instance === null) {
            self::$instance = new DB();
        }
        return self::$instance;
    }

    public function getConnection(): PDO {
        return $this->connection;
    }
}
