<?php 
include_once __DIR__."/config/smarty.php";
spl_autoload_register(function($class){
	 echo $class."-----";
	$param = explode("\\",$class);
	$classname = end($param).".php";
	$path = __DIR__;
	array_pop($param);
	$path = array(__DIR__.'/extend',__DIR__);
	for ($i=0; $i < count($path); $i++) { 
			
			foreach ($param	 as $value) {
				$path[$i] .= "/".$value;
			}
			$classpath = $path[$i]."/".$classname;
			// echo $classpath.'*****';
			if(file_exists($classpath)){
				include_once $classpath;
				return true;
			}


	}
	
	return false;
});
