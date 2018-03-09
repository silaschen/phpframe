<?php 
namespace chensw;
include_once "E:/jiajia/local/auto.php";
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
			case 'list':
				$this->list();
				break;
			default:
				$this->index();
				break;
		}
	}

	private function index(){

		echo "this is index/index";
	}

	private function list(){
		$db = \helper\Db::client();
		$res = $db->query("select * from blog");
		var_dump($res);

	}
	



}