<?php

$host = "localhost";
$user = "650627_1_1";
$password = "Z=dtOC8L1lUp";
$dbname = "650627_1_1";

$pdo = new PDO('mysql:host='. $host . '; dbname=' . $dbname . ';charset=utf8', $user, $password);
$pdo->exec("set names utf8");