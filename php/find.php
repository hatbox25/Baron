<?php
	require_once 'config.php';
	
	$response = array();
	
	
	if (isset($_POST['cari'])){
		$key = $_POST['key'];
				
		$sql = "SELECT * FROM tb_users WHERE email='$key' AND akses='user'";
		$result = mysqli_query($db,$sql);
		$num_row = mysqli_num_rows($result);
        while($row=mysqli_fetch_object($result)){
            $response[]=$row;
        }
        
        if($num_row > 0)
        {
            echo json_encode($response);
        }
        else
        {
            echo 0;
        }
	}
?>