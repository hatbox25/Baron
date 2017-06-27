<?php
	require 'phpmailer/PHPMailerAutoload.php';

	$response = array();

	if ($_POST) {
		$name = $_POST['name'];
        $email = $_POST['email'];
		$contact = $_POST['contact'];
        $message = $_POST['message'];

		$headers = 'MIME-Version: 1.0' . "\r\n";
		$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
		$headers .= 'From:' . $email. "\r\n"; // Sender's Email
		// $headers .= 'Cc:' . $email. "\r\n"; // Carbon copy to Sender if needed
		$template = '<div style="padding:50px; color:white;">Hello Admin Baron,<br/>'
		. '<br/>There is a message from client.<br/><br/>'
		. 'Name          : ' . $name . '<br/>'
		. 'Email         : ' . $email . '<br/>'
		. 'Contact Number: ' . $contact . '<br/>'
		. 'Message       : ' . $message . '<br/><br/>'
		. '<br/>'
		. 'Please response as soon as possible .</div>';
		$sendmessage = "<div style=\"background-color:#7E7E7E; color:white;\">" . $template . "</div>";
		// Message lines should not exceed 70 characters (PHP rule), so wrap it.
		$sendmessage = wordwrap($sendmessage, 70);

		//This should be done in your php.ini, but this is how to do it if you don't have access to that
		date_default_timezone_set('Etc/UTC');
		$mail = new PHPMailer;

		$mail->isSMTP();
		//Enable SMTP debugging
		// 0 = off (for production use)
		// 1 = client messages
		// 2 = client and server messages
		$mail->SMTPDebug = 0;
		//Ask for HTML-friendly debug output
		$mail->Debugoutput = 'html';

		$mail->Host = 'smtp.gmail.com';
		$mail->SMTPAuth = true;
		$mail->Username = 'barber.online2017@gmail.com';
		$mail->Password = 'baron2017';
		$mail->Port = 587;

		$mail->SMTPSecure = 'tls';

		$mail->From = 'barber.online2017@gmail.com';
		$mail->FromName = 'Admin Baron';
		$mail->addAddress('yusuf_septiananda@yahoo.co.id', 'Yusuf');

		$mail->addReplyTo('barber.online2017@gmail.com', 'Baron');

		$mail->WordWrap = 50;
		$mail->isHTML(true);

		$mail->Subject = 'Feedback Baron';
		$mail->Body    = $sendmessage;

		if($mail->send()) {
			$response['status'] = 'success';
			$response['message'] = '<span class="glyphicon glyphicon-ok"></span> &nbsp; We Will contact You as soon as possible';
			$response['log'] = $mail->ErrorInfo;
		}
		else {
			$response['status'] = 'error'; // could not register
			$response['message'] = '<span class="glyphicon glyphicon-info-sign"></span> &nbsp; We have encountered a problem, please try again :)';
			$response['log'] = $mail->ErrorInfo;
		}
	}
	echo json_encode($response);
?>
