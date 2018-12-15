<?php 
namespace config;
/**
* config infomation
*author:silaschen
*wechat:18811174687
*/
class Config
{
	const UPLOADPATH = '/var/www/uploadfile';
	const ALLOW_UPLOAD_FILE = array(
		'jpg','png','pdf'
	);
	public static $webroot="http://local.com";
	public static $db=array(
		'dsn' => "mysql:host=127.0.0.1;dbname=test",
		'user' => 'root',
		'password' => 'chen1210'
	);

	public static $redis=array(
		'host' => '127.0.0.1',
		'password' => '',
		'port'=>6379,
		'db'=>5
	);

	public static $mailcfg = array(
		'host'=>'smtp.qq.com',
		'mailname'=>'434684326@qq.com',
		'password'=>'tcgvwzmwmqbdcaii',
		'from'=>'redphp',
		'port'=>465
	);
	public static $SITE_NAME='Blog';
	public static $wechat = array(
		'APPID'=>"wx8482a902f90eb22d",
		"SECRET"=>"f01ba4f4e758363a1d128fd12c79f67a"

	);

}
