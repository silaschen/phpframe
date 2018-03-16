<?php 
include_once "config/smarty.php";
spl_autoload_register(function($class){
	//echo $class;
	$param = explode("\\",$class);
	$classname = end($param).".php";
	$path = __DIR__;
	array_pop($param);
	foreach ($param	 as $value) {
			$path .= "/".$value;
	}
	$classpath = $path."/".$classname;
	if(file_exists($classpath)){
		include_once $classpath;
		return true;
	}
	
	return false;
});
