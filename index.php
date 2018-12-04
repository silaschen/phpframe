<?php
include 'auto.php';
$module = filter_input(INPUT_GET, 'module')?filter_input(INPUT_GET, 'module'):'index';
$page = filter_input(INPUT_GET, 'page')?filter_input(INPUT_GET, 'page') : 'index';
define("DEFAULT_MODULE",'index');
$module = filter_input(INPUT_GET, 'module')?filter_input(INPUT_GET,'module'):DEFAULT_MODULE;
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
include_once $path;
$spa = "\\app\\handler\\$module\\executeRequest";
$spa();
