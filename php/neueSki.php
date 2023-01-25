<?php

require('config.php');
require('autorisieren.php');


$user = $_POST["user"];

$titel = $_POST["titel"];
$adresse = $_POST["adresse"];
$bild = $_POST["bild"];
$beschreibung = $_POST["beschreibung"];
$status = $_POST["status"];
$zeitraum_anfang = $_POST["zeitraum_anfang"];
$zeitraum_ende = $_POST["zeitraum_ende"];


$sql = "INSERT INTO ski (titel, bild, adresse, beschreibung, user, status, zeitraum_anfang, zeitraum_ende) VALUES (:Titel, :Bild, :Adresse, :Beschreibung, :User, :Status, :Zeitraum_anfang, :Zeitraum_ende)";

$stmt = $pdo->prepare($sql);

$erfolg = $stmt->execute(array('Titel' => $titel, 'Bild' => $bild, 'Adresse' => $adresse, 'Beschreibung' => $beschreibung, 'User' => $user, 'Status' => $status, 'Zeitraum_anfang' => $zeitraum_anfang, 'Zeitraum_ende' => $zeitraum_ende));

if ($erfolg) {

    // print_r('WG erfolgreich erstellt!');

    $letzteID = $pdo->lastInsertId();


} else {

    print_r($erfolg);
};
