<?php 
/**
* swoole_websocket server 
* @author silaschen
*/
namespace helper;
class Swoole_websocket
{
	const HOST='127.0.0.1';
	const PORT=9302;
	private $server;
	function __construct($host,$port)
	{	
		$this->server = new \swoole_websocket_server(self::HOST,self::PORT);
		if($this->server){
			print_r("server is running!");
		}
		$this->server->on('open',array($this,'OnOpen');
		$this->server->on('message',array($this,'OnMessage'));
		$this->server->on('close',array($this,'OnClose'));
		$this->server->start();
	}

	private function OnOpen($server,$req){
		echo "server:handshake success with client---".$feq->fd;
		$server->push($req->fd,"u have connected to the server");
	}

	private function OnMessage($server,$frame){
		echo "Recieve message from".$frame->fd.":".$frame->data;
	}

	private function OnClose($server,$fd){
		echo "client{$fd} closed";
	}

}