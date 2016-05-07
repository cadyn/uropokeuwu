<?php

$username = $_GET['username'];
$password = $_GET['password'];

$link = mysql_connect('', '', '');
if (!$link) {
    die('接続失敗です。'.mysql_error());
}

$db_selected = mysql_select_db('ouroporos_uropokeforum', $link);
if (!$db_selected){
    die('データベース選択失敗です。'.mysql_error());
}

$result = mysql_query("SELECT user_id,username,user_password FROM phpbb_users WHERE username = '".$username."'");
if (!$result) {
    die('クエリーが失敗しました。'.mysql_error());
}

while ($row = mysql_fetch_assoc($result)) {
	$user_id = $row['user_id'];
    $user = $row['username'];
    $pass = $row['user_password'];
	$data[$user] = $pass;
}

$result = mysql_query("SELECT user_id FROM phpbb_user_group WHERE group_id = 4 AND user_id = '".$user_id."'");
if (!$result) {
    die('クエリーが失敗しました。'.mysql_error());
}
$sendData['group'] = "normal";
while ($row = mysql_fetch_assoc($result)) {
	$sendData['group'] = "global_mod";
}

mysql_close($link);




define('IN_PHPBB', true);
$phpbb_root_path = dirname(__FILE__) . '/./';
$phpEx = substr(strrchr(__FILE__, '.'), 1);
include("common.php");

$hash = $data[$username];


header("Access-Control-Allow-Origin: *");
header('Content-Type: text/javascript; charset=utf-8');
if(phpbb_check_hash($password, $hash)){
	$sendData['flag'] = "CORRECT";
} else{
	$sendData['flag'] = "WRONG".$username.":".$password;
}
echo sprintf("callback(%s)",json_encode($sendData));

?>