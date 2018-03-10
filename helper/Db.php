<?php
namespace helper;
include_once __DIR__."/../config/config.php";
class Db
{
	private $conn;//数据库连接标识
	private static $client;//类的实例
	//私有构造函数，禁止外界new
	private function __construct()
	{	$dbconfig = \config\Config::get('db');
		$dsn= $dbconfig['dsn'];
		$user = $dbconfig['user'];
		$pass = $dbconfig['password'];
		try {
			$this->conn = new \PDO($dsn,$user,$pass);
		} catch (\Exception $e) {
			exit($e->getMessage());	
		}
	}

	//静态方法，提供类的实例
	public static function client(){
		if(!self::$client){
			self::$client = new self();
		}
		return self::$client;
	}

	//查询
	public function query($sql){
		$data = array();
		$res = $this->conn->query($sql);
		foreach ($res as $row) {
			$data[] = $row;
		}
		return $data;
	}

	//插入，更新
	public function execute($sql){
		return $this->conn->execute($sql);
	}

}
