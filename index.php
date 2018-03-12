<?php
$module = filter_input(INPUT_GET, 'module');
$page = filter_input(INPUT_GET, 'page');
ini_set("display_errors", "On");
error_reporting(E_ALL);    //报告所有的错误
define("DEFAULT_PAGE", realpath(__DIR__."/app/handler/index/index.php"));
function handurl(){
	if(empty($module) || empty($page)){
		return $path = DEFAULT_PAGE;
	}
	$path = realpath(__DIR__. "/app/handler/".$module."/".$page.".php");
	if(file_exists($path)){
		return $path;
	}else{
		return realpath(__DIR__. "/app/handler/index/index.php");
	}
}

$path = handurl();
// print $path;
include_once $path;
\app\handler\index\executeRequest();

