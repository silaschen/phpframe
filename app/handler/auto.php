<?php 
spl_autoload_register(function($class){

	$param = explode("\\",$class);
	$classname = end($param).".php";


});