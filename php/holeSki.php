<?php

require("config.php");
require("autorisieren.php");

$sql = "

SELECT SKI.ID, SKI.titel, SKI.bild, SKI.adresse, SKI.beschreibung, U.name, U.email, SKI.status, SKI.timestamp, SKI.zeitraum_anfang, SKI.zeitraum_ende
FROM ski SKI
INNER JOIN user U
ON SKI.user = U.ID
ORDER BY SKI.timestamp DESC;

";
 
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute();

if ($erfolg) {

    $array = $stmt->fetchAll();

    $jsonArray = json_encode($array);

    print_r($jsonArray);
}

