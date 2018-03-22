<?php 
namespace helper;
/**
* Assit is a common class,
*include many static function you may often use when developing
*/
class Assist
{
	public static function join($path){
		if(empty($path)){
			return NULL;
		}
		$retpath='';
		for ($i=0; $i < count($path); $i++) { 
			$retpath .= $path[$i];
		}
		return $retpath;
	}




	
}