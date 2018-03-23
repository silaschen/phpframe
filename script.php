<?php
include_once "auto.php";
use helper\Assist;
	function index(){
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			  	$host = "http://jisutqybmf.market.alicloudapi.com/weather/query";
			    $appcode = "cc85d5c6c51f4165b8eaee7ad3c0f721";
			    $headers = array();
			    array_push($headers, "Authorization:APPCODE cc85d5c6c51f4165b8eaee7ad3c0f721");
			    $querys = "city=焦作";
			    $url = $host. "?" . $querys;
				$c = Assist::CallServer($url,'GET',$headers,array());
				$resu = json_decode($c['content'],true)['result']['index'];
				$mail = '';
				for ($i=0; $i < count($resu); $i++) { 
					$param = array_values($resu[$i]);
					 // array_push($mail,end($param));
					$mail .= end($param)."<br>";
				}
				Assist::sendmail("chensiwei1@outlook.com",'就宠你',$mail);
		}
	
	}

index();