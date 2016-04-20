<?php
require_once('config.php');
require_once(JWT_PATH . '/Parsing/Decoder.php');
require_once(JWT_PATH . '/Parser.php');
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

use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;

header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Origin: ' . AUDIENCE);
header('Content-Type: text/html');

$type = $_SERVER['REQUEST_METHOD'];

$service_id;

if($type == 'POST'){
	$validationData = validateAccess();
	if(!is_array($validationData)) { http_response_code(403); return; }
	if(!isset($validationData['user_id'])) { http_response_code(403); return; }
	$user_id = intval($validationData['user_id']);
	if(!isset($user_id) || $user_id === 0) { http_response_code(403); return;}

	$postdata = file_get_contents("php://input");
	if(!isset($postdata)) {echo 'E No data.'; return;}
	$request = json_decode($postdata);
	if(!isset($request) || !isset($request->rating) || !isset($request->comment) || !isset($request->service_id) ) {echo 'E No data.'; return;}
	$rating = intval($request->rating);
	$comment = $request->comment; $comment = htmlentities($comment);
	$service_id = intval($request->service_id);
	if($comment === '' || !is_string($comment)) {echo 'E Empty comment.'; return;}
	if($rating < 1 || $rating > 5) {echo 'E No rating.'; return;}

	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if (mysqli_connect_errno()) {
	    printf("E Connect failed: %s\n", mysqli_connect_error());
	    exit();
	}

	$success = false;

	if($stmt = $mysqli->prepare("INSERT INTO rating (service_id, user_id, rating, comment) VALUES (?, ?, ?, ?)")){
		$stmt->bind_param("iiss", $service_id, $user_id, $rating, $comment);
		$stmt->execute();
		if($stmt->affected_rows === 1) $success = true;
		$stmt->close();
	} else{echo 'E Database error.';}

	if(!$success) { echo 'E Could not add rating.'; return; }
	echo '<!--S Successfully added rating.-->';
}

if(!isset($mysqli)){
	$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
	if (mysqli_connect_errno()) {
	    printf("E Connect failed: %s\n", mysqli_connect_error());
	    exit();
	}
}
if(!isset($service_id)) {
	if(!isset($_GET['service_id'])) {echo 'E No data.'; return;}
	$service_id = intval($_GET['service_id']);
}
if(!isset($service_id) || $service_id === 0) { echo 'E No data.'; return; }
$success = false;

if($stmt = $mysqli->prepare("SELECT user.name, rating.rating, rating.comment FROM rating INNER JOIN user ON rating.user_id=user.user_id WHERE service_id=? ORDER BY rating.datetime_added DESC LIMIT 10")){
	$stmt->bind_param("i", $service_id);
	$stmt->execute();
	$stmt->bind_result($userName, $rating, $comment);
	while($stmt->fetch()){
		echo '<service-rating name="'.$userName.'" rating="'.$rating.'" comment="'.$comment.'"></service-rating>';
	}
	$stmt->close();
} else{echo 'E Database error.';}

$mysqli->close();

function validateAccess(){
	$validationData = array();

	$authorization = '';
	foreach(getallheaders() as $name => $value){
		if($name=='Authorization') $authorization = $value;
	}

	if($authorization === '') {
		$postdata = file_get_contents("php://input");
		if(!isset($postdata)) { http_response_code(403); return; }
		$request = json_decode($postdata);
		if(!isset($request) || !isset($request->auth)) { http_response_code(403); return; }
		$authorization = $request->auth;
	}

	if($authorization === '') { http_response_code(403); return; }
	if(substr($authorization,0,4) !== 'JWT ') { http_response_code(403); return; }
	$token = (new Parser())->parse(substr($authorization,4));

	$signer = new Sha256();
	$data = new ValidationData();
	$data->setIssuer(HOST_NAME);
	$data->setAudience(AUDIENCE);

	if(!$token->validate($data) || !$token->verify($signer, TOKEN_SECRET_STRING)){ http_response_code(403); return; }
	$token->getHeaders();
	$token->getClaims();

	$validationData['user_id'] = $token->getClaim('user_id');

	return $validationData;
}