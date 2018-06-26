<?php 
namespace config;
/**
* config infomation
*author:silaschen
*wechat:18811174687
*/
class Config
{
	const UPLOADPATH = '/var/www';
	const ALLOW_UPLOAD_FILE = array(
		'jpg','png','pdf'
	);
	public static $webroot="http://sw.com";
	public static $db=array(
		'dsn' => "mysql:host=127.0.0.1;dbname=film",
		'user' => 'root',
		'password' => 'root'
	);

	public static $redis=array(
		'host' => '127.0.0.1',
		'password' => '',
		'port'=>6379,
		'db'=>3
	);

	public static $mailcfg = array(
		'host'=>'smtp.qq.com',
		'mailname'=>'434684326@qq.com',
		'password'=>'tcgvwzmwmqbdcaii',
		'from'=>'男宠天气提醒',
		'port'=>465
	);


}
