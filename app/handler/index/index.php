<?php 
namespace app\handler\index;
include_once "auto.php";
use helper\Assist;
function executeRequest(){
	$handler = new IndexHandler();
	$handler->run();
}
/**
* index
* author chensw
*/
class IndexHandler
{
	public function run(){
		$action = filter_input(INPUT_GET, 'action');
		switch ($action) {
			case 'index':
				$this->index();
				break;
			default:
				$this->index();
				break;
		}
	}


	public function index(){
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			// global $smarty;
			// $smarty->display('index.tpl');
			// var_dump(\helper\Assist::sendmail('chensiwei1@outlook.com','love','dsa'));
			// var_dump($this->findnum([2,3,4,5,6,7],0,5,40));
			  	$host = "http://jisutqybmf.market.alicloudapi.com/weather/query";
			    $appcode = "cc85d5c6c51f4165b8eaee7ad3c0f721";
			    $headers = array();
			    array_push($headers, "Authorization:cc85d5c6c51f4165b8eaee7ad3c0f721");
			    $querys = "city='北京'";
			    $url = $host. "?" . $querys;
			$c = Assist::CallServer($url,'GET',$headers,array());
			var_dump($c);
		}
	
	}


	function findnum($arr,$low=0,$high,$target){
		if($low >= $high){
			return 'no target';
		}
		$mid = floor(($low+$high)/2);
		if($arr[$mid] === $target){
			return $mid;
		}
		if($arr[$mid] > $target){
			$high = $mid-1;
		}else{
			$low = $mid+1;
		}
		return $this->findnum($arr,$low,$high,$target);
	}







}
