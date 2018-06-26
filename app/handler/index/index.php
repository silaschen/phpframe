<?php 
namespace app\handler\index;
include_once "auto.php";
use helper\redisClient;
use helper\Assist;
use read\AipSpeech;
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
	const APP_ID = '8409679';
	const API_KEY = 'fGhQAXywANQholpnOwOBMZ1IciZZOWeA';
	const SECRET_KEY = 'TrWHYCNGarPfKHeiI5GTXmGcGDwVIHKC';
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

	function __get($attr){

		echo "I am moved".$attr;

	}

	function __call($fun,$param){

		echo "calling unknown method".$fun."the param is";
		var_dump($param);

	}

	function quicksort($arr){
	if(count($arr) <= 1){
		return $arr;
	}

	$left = $right = array();
	for($i=1;$i<count($arr);$i++){
		
		if($arr[$i] > $arr[0]){
			array_push($right,$arr[$i]);
		}else if($arr[$i] < $arr[0]){
			array_push($left,$arr[$i]);
			
		}

	}
	$left = $this->quicksort($left);
	$right = $this->quicksort($right);
	return array_merge($left,array($arr[0]),$right);

}


	public function index(){
		if (Assist::isGet()) {
			$header = array('CODATAPARTNER:acbad1be6d5b11e884effa163e980843','USERAGENT:dasdasdas',sprintf("IP:%s",'127'));
			$ret = Assist:: CallServer("http://data.com/partner/auth/mobiletoken",'GET',$header);
			var_dump($ret);
		}
	}

	private static function replace($pos,&$data){
		switch ($pos) {
			case 25:
				return "a";
				break;
			case 51:
				return "A";
				break;
			default:
				return $data[$pos+1];
				break;
		}
	}



}
