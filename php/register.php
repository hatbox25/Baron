<?php
	require_once 'config.php';

	$response = array();

	if ($_POST) {
		$fullName = $_POST['name'];
        $userEmail = $_POST['email'];
        $userPassword = md5($_POST['password']);

        $query = "INSERT INTO tb_users(username,email,password,akses) VALUES('$fullName', '$userEmail', '$userPassword', 'user')";
        $result = mysqli_query($db,$query);
		// check for successfull registration
        if ($result) {
			$response['status'] = 'success';
			$response['message'] = '<span class="glyphicon glyphicon-ok"></span> &nbsp; OK! registered sucessfully, you may login now';
        } else {
            $response['status'] = 'error'; // could not register
			$response['message'] = '<span class="glyphicon glyphicon-info-sign"></span> &nbsp; Not OK! registered not sucessfully, please try again :)';

        }
	}
	echo json_encode($response);
?>
