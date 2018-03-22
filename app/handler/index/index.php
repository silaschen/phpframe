<?php 
namespace app\handler\index;
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
			default:
				$this->index();
				break;
		}
	}


	public function index(){
		if ($_SERVER['REQUEST_METHOD'] === 'GET') {
			global $smarty;
			$smarty->display('index.tpl');
		}
	
	}




}
