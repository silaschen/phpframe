<?php 
namespace helper;
/**
* Assit is a common class,
*include many static function you may often use when developing
*/
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
class Assist
{
	public static function join($path){
		if(empty($path)){
			return NULL;
		}
		$retpath='';
		for ($i=0; $i < count($path); $i++) { 
			$retpath .= $path[$i];
		}
		return $retpath;
	}

	/**
	*send mail
	*/
	public static function sendmail($user,$subject,$body){
		$mailcfg = \config\Config::$mailcfg;
		$mail = new PHPMailer(true);                  
		try {
		    //Server settings
		    $mail->SMTPDebug = false;                              // Enable verbose debug output
		    $mail->isSMTP();                                      // Set mailer to use SMTP
		    $mail->Host = $mailcfg['host'];  // Specify main and backup SMTP servers
		    $mail->SMTPAuth = true;                               // Enable SMTP authentication
		    $mail->Username = $mailcfg['mailname'];                 // SMTP username
		    $mail->Password = $mailcfg['password'];                           // SMTP password
		    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		    $mail->Port = $mailcfg['port'];                               // TCP port to connect to
		    //Recipients
		    $mail->setFrom($mailcfg['mailname'], $mailcfg['from']);
		    $mail->addAddress($user);     // Add a recipient
		    // $mail->addAddress('ellen@example.com');               // Name is optional
		    // $mail->addReplyTo('info@example.com', 'Information');
		    // $mail->addCC('cc@example.com');
		    // $mail->addBCC('bcc@example.com');
		    // $mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		    // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
		    //Content
		    $mail->isHTML(true);                                  // Set email format to HTML
		    $mail->Subject = $subject;
		    $mail->Body    = $body;
		    $mail->AltBody = $body;
		    $mail->send();
		    return true;
		} catch (Exception $e) {
		    return ['msg'=>$mail->ErrorInfo];
		}
	}







	
}