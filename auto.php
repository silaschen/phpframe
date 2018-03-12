<?php 
spl_autoload_register(function($class){

	$param = explode("\\",$class);
	$classname = end($param).".php";
	$path = __DIR__;
	array_pop($param);
	foreach ($param	 as $value) {
			$path .= "/".$value;
	}
	$classpath = $path."/".$classname;
	// echo $classpath;
	include_once $classpath;
});
