<?php
	require_once 'config.php';
	
	$response = array();
	
	
	if (isset($_POST['cari'])){
		$key = $_POST['key'];
        $id = $_POST['id'];
				
		$sql = "UPDATE tb_users SET akses = 'barber' WHERE email='$key'";
        
        $sql1 = "INSERT INTO tb_barber(id_user) VALUES('$id')";
        
		$result = mysqli_query($db,$sql);
        $result1 = mysqli_query($db,$sql1);
		if ($result && $result1) {
			$response['status'] = 'success';
			$response['message'] = 'Barber registered sucessfully';
        } else {
            $response['status'] = 'error'; // could not register
        }	
	}
	
	echo json_encode($response);
?>