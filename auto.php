<?php 
include __DIR__."/config/smarty.php";
spl_autoload_register(function($class){
	$param = explode("\\",$class);
	$classname = end($param).".php";
	$path = __DIR__;
	array_pop($param);
	var_dump($class);
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
