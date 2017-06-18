<?php
	require_once 'config.php';

	if (isset($_REQUEST['email']) && !empty($_REQUEST['email'])) {
		
		$email = trim($_REQUEST['email']);
		$email = strip_tags($email);
		
		$query = "SELECT userEmail FROM tb_users WHERE userEmail='$email'";
		$result = mysqli_query($db,$query);
		
        $row = mysqli_num_rows($result);
		if ($row == 1) {
			echo 'false';
		} else {
			echo 'true'; 
		}
	}