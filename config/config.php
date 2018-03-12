<?php 
namespace config;
/**
* config infomation
*author:silaschen
*wechat:18811174687
*/
class Config
{
	public static $db=array(
		'dsn' => "mysql:host=127.0.0.1;dbname=film",
		'user' => 'root',
		'password' => 'root'
	);

	public static $redis=array(
		'host' => '127.0.0.1',
		'password' => '',
		'db'=>1
	);


}