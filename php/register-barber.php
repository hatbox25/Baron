<?php
	require_once 'config.php';
	
	$response = array();
	
	
	if (isset($_POST['cari'])){
		$key = $_POST['key'];
				
		$sql = "UPDATE tb_users SET hak_akses = 'barber' WHERE userEmail='$key'";
		$result = mysqli_query($db,$sql);
		if ($result) {
			$response['status'] = 'success';
			$response['message'] = 'Barber registered sucessfully';
        } else {
            $response['status'] = 'error'; // could not register
        }	
	}
	
	echo json_encode($response);
?>