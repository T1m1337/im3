<?php

require_once('config.php');
require_once('autorisieren.php');

$userID = $_POST["userID"];
$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$beschreibung = $_POST["beschreibung"];
$status = $_POST["status"];
$zeitraum_ende = $_POST["zeitraum_ende"];
$zeitraum_anfang = $_POST["zeitraum_anfang"];

$bild = $_POST["bild"];

$skiID = $_POST["skiID"];


$sql = "UPDATE ski SET titel=?, bild=?, adresse=?, beschreibung=?, zeitraum_anfang=?, zeitraum_ende=?, status=? WHERE user=?";
$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute([$titel, $bild, $adresse, $beschreibung, $zeitraum_anfang, $zeitraum_ende, $status, $userID]);

// falls erfolg true bzw. 1 ist
if ($erfolg) {

    print_r("Ausrüstung wurde aktualisiert.");

} else {

    print_r($erfolg);

};

