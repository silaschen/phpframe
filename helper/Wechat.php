<?php 
namespace helper;
/**
* wechat,
*include many static function you may often use when developing
*/

class Wechat
{
	
	public $accesstoken;
	public $appid;
	public $secret;
	public function __construct(){
		$this->appid = \config\Config::$wechat['APPID'];
		$this->secret = \config\Config::$wechat['APPSECRET'];
	}


	public function getAccessToken(){
		$url = sprintf("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",$this->appid,$this->secret);
		$info = Assit::CallServer($url);

		return $info;

	}

	


	







	
}
