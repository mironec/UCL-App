<?php
require_once('config.php');

header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Origin: ' . AUDIENCE);
header('Content-Type: text/plain');

$postdata = file_get_contents("php://input");
if(!isset($postdata)) {echo 'E No data.'; return;}
$request = json_decode($postdata);
if(!isset($request) || !isset($request->email) || !isset($request->pass) || !isset($request->name) || !isset($request->country)) {echo 'E No data.'; return;}
$email = $request->email;
$pass = $request->pass;
$name = $request->name;
$country = $request->country;

if(!isset($email) || !isset($pass) || !isset($name) || !isset($country) || $email=='' || $pass=='' || $name=='' || $country=='') {echo 'E No data.'; return;}

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (mysqli_connect_errno()) {
    printf("E Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$hash = '';
$success = false;

if($stmt = $mysqli->prepare("INSERT INTO user (name, password, email, country) VALUES (?, ?, ?, ?)")){
	$stmt->bind_param("ssss", $name, $hash, $email, $country);
	$hash = password_hash($pass, PASSWORD_DEFAULT);
	$stmt->execute();
	if($stmt->affected_rows == 1) $success = true;
	$stmt->close();
} else{echo 'E '.$mysqli->error;}

$mysqli->close();

if(!$success){ echo 'E Could not add new account.'; return; }

echo 'S Account created.';