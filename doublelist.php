<?php 
/**
* php 双向链表
* 
*/
ini_set("display_errors", "On");
error_reporting(E_ALL ^ E_NOTICE);    // 除了E_NOTICE之外，报告所有的错误
error_reporting(E_ERROR);       // 只报告致命错误
class doublelinklist
{
	public static $data = array();

	//头入队
	public function addFirst($item){
		return array_unshift(self::$data, $item);
	}

	//头出队
	public function removeFirst(){
		return array_shift(self::$data);
	}

	//尾入队
	public function push($item){
		return array_push(self::$data,$item);
	}

	//尾出队
	public function pop(){
		return array_pop(self::$data);
	}


	//打印队列
	public function getData(){
		return self::$data;
	}


}
$que = new doublelinklist();
$que->addFirst(1);
$que->addFirst(2);
$que->push(3);
$que->push(4);

$que2 = new doublelinklist();
$que2->addFirst(1);
$que2->addFirst(2);
$que2->push(2);
$que2->push(4);



var_dump($que2->getData());


