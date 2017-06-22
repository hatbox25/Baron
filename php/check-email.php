<?php
	require_once 'config.php';

	if (isset($_REQUEST['email']) && !empty($_REQUEST['email'])) {
		
		$email = trim($_REQUEST['email']);
		$email = strip_tags($email);
		
		$query = "SELECT email FROM tb_users WHERE email='$email'";
		$result = mysqli_query($db,$query);
		
        $row = mysqli_num_rows($result);
		if ($row == 1) {
			echo 'false';
		} else {
			echo 'true'; 
		}
	}