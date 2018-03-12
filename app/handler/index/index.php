<?php 
namespace app\handler\index;
use helper\Db;
include_once "auto.php";
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

	public function index(){
		global $smarty;
		$smarty->display('index.tpl');
	}

	private function list(){
		$db = Db::client();
		$res = $db->query("select * from blog");
		var_dump($res);
	}
	



}
