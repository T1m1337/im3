<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$skiID = $_POST["skiID"];

$sql = "DELETE FROM ski WHERE user = ? AND ID = ?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$userID, $skiID]);

if ($erfolg) {

    echo "Ski wurde gelöscht!";

} else {

    print_r($erfolg);
};


