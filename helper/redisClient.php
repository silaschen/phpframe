<?php 
namespace helper;
/**
* redisclient
*author:silaschen
*
*/
class redisClient
{
	public static $client;
	private $redis;
	private function __clone(){} 
	private function __construct()
	{
		$rediscfg = \config\Config::$redis;
		$this->redis = new \Redis();
		$this->redis->connect($rediscfg['host'],$rediscfg['port']);
		if(isset($rediscfg['db'])){
			$this->redis->select($rediscfg['db']);
		}
	}


	public static function client(){
		if(!self::$client){
			self::$client = new self();
		}
		return self::$redis;
	}

}