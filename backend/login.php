<?php
require_once('config.php');
require_once(JWT_PATH . '/Parsing/Encoder.php');
require_once(JWT_PATH . '/Claim.php');
require_once(JWT_PATH . '/Claim/Basic.php');
require_once(JWT_PATH . '/Claim/Validatable.php');
require_once(JWT_PATH . '/Claim/LesserOrEqualsTo.php');
require_once(JWT_PATH . '/Claim/GreaterOrEqualsTo.php');
require_once(JWT_PATH . '/Claim/EqualsTo.php');
require_once(JWT_PATH . '/Claim/Factory.php');
require_once(JWT_PATH . '/Token.php');
require_once(JWT_PATH . '/Builder.php');
require_once(JWT_PATH . '/Signature.php');
require_once(JWT_PATH . '/Signer.php');
require_once(JWT_PATH . '/Signer/Key.php');
require_once(JWT_PATH . '/Signer/BaseSigner.php');
require_once(JWT_PATH . '/Signer/Hmac.php');
require_once(JWT_PATH . '/Signer/Hmac/Sha256.php');
require_once(JWT_PATH . '/ValidationData.php');

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\ValidationData;

header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Origin: ' . AUDIENCE);
header('Content-Type: text/plain');

$postdata = file_get_contents("php://input");
if(!isset($postdata)) {echo 'E No data.'; return;}
$request = json_decode($postdata);
if(!isset($request) || !isset($request->email) || !isset($request->pass)) {echo 'E No data.'; return;}
$email = $request->email;
$pass = $request->pass;

if(!isset($email) || !isset($pass) || $email=='' || $pass=='') {echo 'E No data.'; return;}

$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (mysqli_connect_errno()) {
    printf("E Connect failed: %s\n", mysqli_connect_error());
    exit();
}

$hashDB = "";
$id = 0;
$success = false;

if($stmt = $mysqli->prepare("SELECT user_id, password FROM user WHERE email=?")){
	$stmt->bind_param("s", $email);
	$stmt->execute();
	$stmt->bind_result($id, $hashDB);
	if($stmt->fetch()) $success = true;
	$stmt->close();
} else{echo 'E '.$mysqli->error;}

$mysqli->close();

if(!$success) {echo "E Wrong email!"; return;}

if(!password_verify($pass, $hashDB)) { echo "E Wrong password!"; return;}

$signer = new Sha256();

$token = (new Builder())->setIssuer(HOST_NAME)
                        ->setAudience(AUDIENCE)
                        ->setIssuedAt(time())
                        ->setNotBefore(time())
                        ->setExpiration(time() + 60*60*24*30*12)
                        ->set('email', $email)
                        ->set('user_id', $id)
                        ->sign($signer, TOKEN_SECRET_STRING)
                        ->getToken();

echo 'S '.$token;