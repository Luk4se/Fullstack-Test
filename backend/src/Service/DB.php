<?php

declare(strict_types=1);

namespace App\Service;

use Dotenv\Dotenv;
use PDO;
use PDOException;

class DB
{
    private static ?DB $instance = null;

    private PDO $connection;

    private function __construct()
    {
        // Load environment variables only once
        $dotenv = Dotenv::createImmutable(__DIR__ . '/../../');
        $dotenv->load();

        $host = $_ENV['DB_HOST'];
        $db = $_ENV['DB_NAME'];
        $user = $_ENV['DB_USER'];
        $pass = $_ENV['DB_PASS'];

        try {
            $this->connection = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('DB connection failed: ' . $e->getMessage());
        }
    }

    public static function getInstance(): DB
    {
        if (self::$instance === null) {
            self::$instance = new DB();
        }

        return self::$instance;
    }

    public function getConnection(): PDO
    {
        return $this->connection;
    }
}
