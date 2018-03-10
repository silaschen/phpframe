<?php 
namespace chensw;
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

		$content = file_get_contents("a.txt");
		var_dump($content);
	}

	private function list(){
		$db = \helper\Db::client();
		$res = $db->query("select * from blog");
		var_dump($res);


	}
	



}
