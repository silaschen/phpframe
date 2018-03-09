<?php 
ini_set("display_errors", "On");
error_reporting(E_ALL);    // 除了E_NOTICE之外，报告所有的错误
// error_reporting(1);       // 只报告致命错误
class Db
{
	private $conn;//数据库连接标识
	private static $client;//类的实例
	//私有构造函数，禁止外界new
	private function __construct()
	{
		$dsn="mysql:host=127.0.0.1;dbname=test";
		$user = "root";
		$pass = "root";
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
$sql = sprintf("select id,title from blog");
$res = Db::client()->query($sql);
var_dump($res);